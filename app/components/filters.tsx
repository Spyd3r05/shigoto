import { Clock, MapPin, Code, Database } from "lucide-react";

const Filters = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 text-sm mb-16">
      <span className="text-slate-400 font-medium mr-1">Quick Filters:</span>
      <button className="flex items-center space-x-1.5 bg-white border border-gray-200 text-slate-600 px-4 py-2 rounded-full hover:bg-gray-50 transition-colors">
        <Clock size={14} />
        <span>Last 24h</span>
      </button>
      <button className="flex items-center space-x-1.5 bg-white border border-gray-200 text-slate-600 px-4 py-2 rounded-full hover:bg-gray-50 transition-colors">
        <MapPin size={14} />
        <span>Nairobi</span>
      </button>
      <button className="flex items-center space-x-1.5 bg-white border border-gray-200 text-slate-600 px-4 py-2 rounded-full hover:bg-gray-50 transition-colors">
        <Code size={14} />
        <span>Software Engineering</span>
      </button>
      <button className="flex items-center space-x-1.5 bg-white border border-gray-200 text-slate-600 px-4 py-2 rounded-full hover:bg-gray-50 transition-colors">
        <Database size={14} />
        <span>Data Science</span>
      </button>
    </div>
  );
};

export default Filters;
