import React, { useState, useMemo } from "react";
import Clock from "./components/Clock";
import Weather from "./components/Weather";
import SearchBar from "./components/SearchBar";
import CategorySection from "./components/CategorySection";
import { INITIAL_LINKS } from "./data/links";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const { categories, filteredLinks } = useMemo(() => {
    const filtered = INITIAL_LINKS.filter(
      (link) =>
        link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        link.category.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    const cats = [...new Set(INITIAL_LINKS.map((link) => link.category))];
    return { filteredLinks: filtered, categories: cats };
  }, [searchTerm]);

  return (
    <div className="relative min-h-screen bg-slate-50 overflow-hidden">
      {/* Mesh Gradient Background Decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-200/30 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-200/30 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-amber-100/40 rounded-full blur-[80px]" />

      <div className="relative z-10 p-8 md:p-16">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Widget Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Clock />
            <Weather />
          </div>

          {/* Search Bar */}
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          {/* Categories and Links */}
          <div className="space-y-12">
            {categories.map((category) => (
              <CategorySection
                key={category}
                title={category}
                links={filteredLinks.filter(
                  (link) => link.category === category,
                )}
              />
            ))}
          </div>

          {searchTerm && filteredLinks.length === 0 && (
            <div className="text-center py-12 text-slate-500 bg-white/40 backdrop-blur-md rounded-2xl border border-white/20">
              No links found for "{searchTerm}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
