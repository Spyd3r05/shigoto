/**
 * app/api/cron/scrape/route.ts
 *
 * Vercel Cron Job endpoint.
 * Runs daily at 06:00 UTC (08:00 EAT) — see vercel.json.
 *
 * Vercel automatically sends the Authorization header when invoking cron routes.
 * You can also trigger it manually:
 *   curl -H "Authorization: Bearer <CRON_SECRET>" https://yourdomain.com/api/cron/scrape
 *
 * Set these environment variables in Vercel:
 *   CRON_SECRET              — any long random string, add to Vercel env vars
 *   NEXT_PUBLIC_SUPABASE_URL — your Supabase project URL
 *   SUPABASE_SERVICE_ROLE_KEY — your Supabase service role secret
 */

import { NextRequest, NextResponse } from 'next/server'
import { scrapeAttachments}       from '../../../lib/scraper'
import { supabaseAdmin }             from '../../../lib/supabase'

// Allow this function up to 5 minutes — scraping takes time.
// Requires Vercel Pro or above; remove / lower for Hobby.
export const maxDuration = 300

export async function GET(request: NextRequest) {
  // ── Auth guard ─────────────────────────────────────────────
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET

  if (!cronSecret) {
    console.error('[Cron] CRON_SECRET env var is not set.')
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 })
  }

  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // ── Scrape ─────────────────────────────────────────────────
  console.log('[Cron] Starting scrape...')
  const startTime = Date.now()

  let opportunities
  try {
    opportunities = await scrapeAttachments()
  } catch (err) {
    console.error('[Cron] Scraper threw an error:', err)
    return NextResponse.json({ error: 'Scraper failed', detail: String(err) }, { status: 500 })
  }

  if (opportunities.length === 0) {
    console.warn('[Cron] Scraper returned 0 results — skipping DB write.')
    return NextResponse.json({ inserted: 0, updated: 0, message: 'No results scraped' })
  }

  // ── Upsert to Supabase ─────────────────────────────────────
  // `onConflict: 'link'` means duplicate URLs are silently ignored,
  // so re-running the cron is always safe (idempotent).
  const rows = opportunities.map((opp) => ({
    title:      opp.title,
    company:    opp.company,
    link:       opp.link,
    location:   opp.location,
    tags:       opp.tags,
    source:     opp.source,
    scraped_at: new Date().toISOString(),
    is_active:  true,
  }))

  const { error, count } = await supabaseAdmin
    .from('opportunities')
    .upsert(rows, {
      onConflict:        'link',   // unique column in schema
      ignoreDuplicates:  true,     // skip if already exists
      count:             'exact',
    })

  if (error) {
    console.error('[Cron] Supabase upsert error:', error)
    return NextResponse.json({ error: 'DB write failed', detail: error.message }, { status: 500 })
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1)
  console.log(`[Cron] Done — ${count} rows written in ${elapsed}s`)

  return NextResponse.json({
    success:   true,
    scraped:   opportunities.length,
    inserted:  count ?? 0,
    elapsed:   `${elapsed}s`,
  })
}