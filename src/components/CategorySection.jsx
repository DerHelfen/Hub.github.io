import React from "react";
import HubLink from "./HubLink";

const CategorySection = ({ title, links }) => {
  if (links.length === 0) return null;

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800 border-l-4 border-blue-400 pl-4">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {links.map((link) => (
          <HubLink key={link.id} {...link} />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
