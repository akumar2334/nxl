import React, { useState, useMemo } from "react";
import { Search, BookOpen, FileText, Lightbulb } from "lucide-react";

export default function KnowledgeBase() {
  const [search, setSearch] = useState("");

  const categories = [
    {
      icon: BookOpen,
      title: "Getting Started",
      desc: "Learn basics of outbound engine setup",
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      icon: FileText,
      title: "Playbooks",
      desc: "Proven outreach strategies and workflows",
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      icon: Lightbulb,
      title: "Best Practices",
      desc: "Tips to improve conversion and reply rates",
      color: "text-yellow-600",
      bg: "bg-yellow-50",
    },
  ];

  const articles = [
    { title: "How to improve outbound reply rates", time: "5 min read" },
    { title: "Writing high-converting cold emails", time: "8 min read" },
    { title: "Understanding buyer signals in SaaS", time: "6 min read" },
    { title: "Building effective outreach sequences", time: "7 min read" },
  ];

  // Filter articles (case insensitive)
  const filteredArticles = useMemo(() => {
    if (!search.trim()) return articles;

    return articles.filter((a) =>
      a.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, articles]);

  return (
    <main className="bg-gray-50 min-h-screen px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
          Knowledge Base
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Find guides, playbooks and resources to improve your outbound engine
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search articles, guides, templates..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {categories.map((c, i) => {
          const Icon = c.icon;

          return (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-lg p-4 hover:shadow-sm hover:-translate-y-[1px] transition cursor-pointer"
            >
              <div
                className={`w-9 h-9 flex items-center justify-center rounded-lg ${c.bg}`}
              >
                <Icon className={c.color} size={18} />
              </div>

              <h3 className="text-sm font-semibold mt-3 text-gray-900">
                {c.title}
              </h3>

              <p className="text-xs text-gray-500 mt-1">
                {c.desc}
              </p>
            </div>
          );
        })}

      </div>

      {/* Articles */}
      <div className="bg-white border border-gray-100 rounded-lg p-4">

        <h2 className="text-sm font-semibold text-gray-700 mb-4">
          Articles
        </h2>

        {filteredArticles.length ? (
          <div className="space-y-3">
            {filteredArticles.map((a, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-sm hover:bg-gray-50 px-2 py-2 rounded-md cursor-pointer transition"
              >
                <span className="text-gray-700 hover:text-gray-900">
                  {a.title}
                </span>

                <span className="text-xs text-gray-400">
                  {a.time}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-sm text-gray-400 py-6">
            No articles found for "{search}"
          </p>
        )}

      </div>

    </main>
  );
}