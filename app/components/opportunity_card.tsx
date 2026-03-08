import React from "react";
import { MapPin, Clock } from "lucide-react";

const OpportunityCard = ({ opp }: { opp: any }) => {
  return (
    <div
      key={opp.id}
      className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-[#4b9b9b] hover:shadow-md transition-all flex flex-col"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="relative w-12 h-12 rounded-lg border border-gray-100 p-1 flex items-center justify-center bg-gray-50 overflow-hidden text-xs font-bold text-gray-400">
            <img
              src={`https://unavatar.io/${opp.domain}`}
              alt={opp.company}
              className="w-full h-full object-contain mix-blend-multiply relative z-10 bg-gray-50"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <span className="absolute z-0">{opp.company.charAt(0)}</span>
          </div>
          <div>
            <h3 className="font-bold text-slate-800 leading-tight flex items-center flex-wrap gap-2">
              {opp.title}
              {opp.isNew && (
                <span className="bg-[#e6f2f2] text-[#4b9b9b] text-[10px] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">
                  New
                </span>
              )}
            </h3>
            <p className="text-sm text-slate-500">{opp.company}</p>
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-5">
        <div className="flex items-center text-sm text-slate-500">
          <MapPin size={14} className="mr-2 text-slate-400" />
          {opp.location}
        </div>
        {opp.time && (
          <div className="flex items-center text-sm text-slate-500">
            <Clock size={14} className="mr-2 text-slate-400" />
            {opp.time}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-6 mt-auto">
        {opp.tags.map((tag: string) => (
          <span
            key={tag}
            className="bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-md font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      <a
        href={opp.link}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full py-2.5 border border-gray-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex justify-center mt-auto"
      >
        Apply Now
      </a>
    </div>
  );
};

export default OpportunityCard;
