import React from "react";
import { MapPin, Clock, Briefcase } from "lucide-react";

const OpportunityCard = ({ opp }: { opp: any }) => {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:border-slate-300 hover:shadow-sm transition-all flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        {/* Icon */}
        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 text-slate-600 shrink-0">
          <Briefcase size={20} />
        </div>

        {/* Text */}
        <div className="flex flex-col gap-1">
          {/* Title row */}
          <div className="flex items-start gap-2">
            <h3 className="font-semibold text-slate-800 leading-snug">
              {opp.title}
            </h3>
          </div>

          {/* Company */}
          <p className="text-sm text-slate-500">{opp.company}</p>
        </div>
      </div>
      {/* Details */}
      <div className="space-y-2 text-sm text-slate-500 mb-4">
        <div className="flex items-center gap-2">
          <MapPin size={14} className="text-slate-400" />
          {opp.location}
        </div>

        {opp.time && (
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-slate-400" />
            {opp.time}
          </div>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        {opp.tags.map((tag: string) => (
          <span
            key={tag}
            className="bg-slate-200 text-slate-600 text-xs px-2.5 py-1 rounded-md font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* CTA */}
      <a
        href={opp.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto w-full py-2.5 rounded-lg text-sm font-semibold text-slate-700 border border-slate-300 bg-white flex justify-center transition-colors hover:bg-slate-700 hover:text-white hover:border-slate-700"
      >
        Apply Now
      </a>
    </div>
  );
};

export default OpportunityCard;
