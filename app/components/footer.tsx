import React from "react";
import { Briefcase } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 px-6 py-10 border-t border-slate-900">
      <div className="max-w-4xl mx-auto flex flex-col text-center">
        {/* Brand & Mission Section */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2 text-[#4b9b9b]">
            <Briefcase size={28} className="fill-current" />
            <span className="text-2xl font-bold tracking-tight text-white">
              SHIGOTO
            </span>
          </div>
          <p className="text-sm leading-relaxed">
            Kenya&apos;s premier platform for tech students and graduates. We
            bridge the gap between education and industry by providing real-time
            visibility into attachment and internship opportunities across the
            country.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
