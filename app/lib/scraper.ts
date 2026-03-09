'use server'

export async function scrapeAttachments() {
    const companies = [
        "Ministry of ICT and the Digital Economy", "ICT Authority", "Kenya Revenue Authority",
        "Kenya Power", "Huduma Centres", "Kenya Bureau of Standards",
        "Rural Electrification and Renewable Energy Corporation", "County Government ICT Offices",
        "Safaricom PLC", "Airtel Kenya", "Telkom Kenya", "Liquid Intelligent Technologies",
        "Jamii Telecommunications", "SEACOM East Africa", "Techno Brain Kenya",
        "Andela", "Africa's Talking", "iHub Nairobi", "Hanmak Technologies", "Nokia",
        "Yashio Kenya", "Samsung Electronics East Africa", "Seven Seas Technologies", "Damu Sasa Systems",
        "Equity Bank", "KCB Group", "Co-operative Bank of Kenya", "SasaPay", "Capwell Industries Limited",
        "Mercy Corps", "Strathmore University"
    ];

    const queries = [
        `("Ministry of ICT" OR "ICT Authority" OR "Kenya Revenue Authority" OR "Kenya Power" OR "Huduma Centres" OR "KEBS") "attachment" OR "internship" Kenya 2026`,
        `("REREC" OR "Safaricom" OR "Airtel" OR "Telkom Kenya" OR "Liquid Intelligent" OR "Jamii Telecommunications") "attachment" OR "internship" Kenya 2026`,
        `("SEACOM" OR "Techno Brain" OR "Andela" OR "Africa's Talking" OR "iHub" OR "Hanmak") "attachment" OR "internship" Kenya 2026`,
        `("Nokia" OR "Yashio Kenya" OR "Samsung" OR "Seven Seas" OR "Damu Sasa") "attachment" OR "internship" Kenya 2026`,
        `("Equity Bank" OR "KCB Group" OR "Co-operative Bank" OR "SasaPay" OR "Capwell" OR "Mercy Corps" OR "Strathmore") "attachment" OR "internship" Kenya 2026`
    ];

    const results: any[] = [];

    // Use Promise.all limit concurrency or fetching sequentially
    // Doing it sequentially so it doesn't overwhelm the backend unexpectedly, but for speed Promise.all
    try {
        const fetchPromises = queries.map(q => {
            const url = `https://www.google.com/search?q=${encodeURIComponent(q)}&gl=ke&brd_json=1`;
            return fetch('https://api.brightdata.com/request', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${process.env.BRIGHTDATA_API_KEY}`,
                    'user-agent': '@brightdata/mcp/2.8.9',
                },
                body: JSON.stringify({
                    url: url,
                    zone: 'mcp_unlocker',
                    format: 'raw',
                    data_format: 'parsed_light'
                }),
                cache: 'no-store'
            });
        });

        const responses = await Promise.allSettled(fetchPromises);

        for (const res of responses) {
            if (res.status === 'fulfilled' && res.value.ok) {
                const data = await res.value.json();
                if (data && data.organic) {
                    data.organic.forEach((item: any) => {
                        results.push(item);
                    });
                }
            }
        }
    } catch (e) {
        console.error("Scrape error:", e);
    }

    // Parse and format results
    const formattedOpportunities = results.map((item: any, index: number) => {
        let matchedCompany = "Various";
        // Check if the link contains a known keyword
        const domainStr = item.link ? item.link.toLowerCase() : "";

        for (const c of companies) {
            // Create a short keyword from company name
            const keyword = c.split(' ')[0].replace(/[^a-zA-Z]/g, '').toLowerCase();
            if (keyword.length > 3 && domainStr.includes(keyword)) {
                matchedCompany = c;
                break;
            } else if (item.title && item.title.toLowerCase().includes(keyword)) {
                matchedCompany = c;
                break;
            }
        }

        // Try to extract date/time if available from description e.g "2 days ago"
        let time = "";
        const timeMatch = item.description?.match(/(\d+\s+(?:days?|hours?|mins?|weeks?|months?)\s+ago)/i);
        const dateMatch = item.description?.match(/([0-9]{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+[0-9]{4})/i);

        if (timeMatch) {
            time = timeMatch[0];
        } else if (dateMatch) {
            time = dateMatch[0];
        }

        // Extract domain from link
        let domain = "example.com";
        try {
            domain = new URL(item.link).hostname.replace('www.', '');
        } catch (e) { }

        // Clean title
        let cleanTitle = item.title;
        if (cleanTitle && cleanTitle.length > 50) {
            cleanTitle = cleanTitle.substring(0, 47) + "...";
        }

        return {
            id: index + 100, // Make unique
            title: cleanTitle || "Attachment/Internship Opportunity",
            company: matchedCompany,
            domain: domain,
            location: "Kenya",
            time: time || undefined, // keep undefined if not found so component doesn't show fake time
            tags: ["Internship"],
            isNew: true,
            link: item.link,
            source: "Google Search"
        };
    });

    // Remove duplicates strictly by identical links
    const uniqueUrls = new Set();
    const filteredOpportunities = [];
    for (const opp of formattedOpportunities) {
        if (!uniqueUrls.has(opp.link)) {
            uniqueUrls.add(opp.link);
            filteredOpportunities.push(opp);
        }
    }

    return filteredOpportunities;
}
