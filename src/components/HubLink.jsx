import React from "react";
import { ExternalLink } from "lucide-react";

const HubLink = ({ title, url, description }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col p-4 rounded-xl bg-white/40 backdrop-blur-sm border border-white/10 shadow-sm transition-all hover:bg-white/60 hover:shadow-md hover:-translate-y-1"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors" />
      </div>
      {description && (
        <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
      )}
    </a>
  );
};

export default HubLink;
