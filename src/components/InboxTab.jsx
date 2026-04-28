import React, { useState, memo, useCallback, useMemo } from "react";
import { Reply, CheckCheck, ChevronDown, ChevronUp } from "lucide-react";

const FILTERS = ["All", "Unread", "Replied", "Booked"];

const STATUS_STYLES = {
  unread: "bg-indigo-50 border-l-2 border-l-indigo-400",
  replied: "",
  booked: "",
};

const STATUS_DOT = {
  unread: "bg-indigo-500",
  replied: "bg-gray-300",
  booked: "bg-green-500",
};

const STATUS_BADGE = {
  unread: "bg-indigo-100 text-indigo-700",
  replied: "bg-gray-100 text-gray-500",
  booked: "bg-green-100 text-green-700",
};

/* ---------------- FILTER PILLS ---------------- */
const FilterPills = memo(({ active, onChange, counts }) => (
  <div className="flex gap-2 mb-5 overflow-x-auto pb-1 scrollbar-hide">
    {FILTERS.map((f) => (
      <button
        key={f}
        onClick={() => onChange(f)}
        className={`flex shrink-0 items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm rounded-full border transition ${
          active === f
            ? "bg-indigo-600 text-white border-indigo-600"
            : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300"
        }`}
      >
        {f}
        <span
          className={`text-xs px-1.5 py-0.5 rounded-full ${
            active === f
              ? "bg-indigo-500 text-white"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {counts[f]}
        </span>
      </button>
    ))}
  </div>
));

FilterPills.displayName = "FilterPills";

/* ---------------- THREAD ---------------- */
const ReplyThread = memo(({ r, isExpanded, onToggle, onMarkDone }) => {
  const dotColor = STATUS_DOT[r.status] ?? STATUS_DOT.replied;
  const badgeStyle = STATUS_BADGE[r.status] ?? STATUS_BADGE.replied;
  const rowStyle = STATUS_STYLES[r.status] ?? "";

  const handleToggle = () => onToggle(r.id);

  return (
    <div
      className={`px-3 sm:px-4 py-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50/60 transition ${rowStyle}`}
      onClick={handleToggle}
    >
      <div className="flex items-start gap-3">

        {/* Avatar */}
        <div className="relative shrink-0">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-semibold"
            style={{ backgroundColor: r.avatarColor ?? "#7c3aed" }}
          >
            {r.avatar}
          </div>
          <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${dotColor}`} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">

          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-1">
            <p className="text-sm font-semibold text-gray-900 truncate max-w-[140px] sm:max-w-none">
              {r.name}
            </p>
            <span className="text-xs text-gray-400">·</span>
            <p className="text-xs text-gray-500 truncate">{r.company}</p>

            <span className={`ml-auto sm:ml-1 px-2 py-0.5 text-xs rounded-full font-medium capitalize ${badgeStyle}`}>
              {r.status}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-gray-500 break-words">
            {isExpanded ? r.message : `${r.message.slice(0, 80)}...`}
          </p>

          {isExpanded && (
            <>
              <div className="mt-3 p-3 bg-gray-50 rounded-lg border text-sm text-gray-700">
                {r.message}
              </div>

              <div
                className="flex flex-col sm:flex-row gap-2 mt-3"
                onClick={(e) => e.stopPropagation()}
              >
                <button className="flex items-center justify-center gap-1.5 text-xs bg-indigo-600 text-white px-3 py-2 rounded-lg hover:bg-indigo-700 transition">
                  <Reply size={12} />
                  Reply
                </button>

                <button
                  onClick={() => onMarkDone(r.id)}
                  className="flex items-center justify-center gap-1.5 text-xs border border-gray-200 text-gray-600 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                  <CheckCheck size={12} />
                  Mark as Done
                </button>
              </div>
            </>
          )}
        </div>

        {/* Right */}
        <div className="flex flex-col items-end gap-1 shrink-0 ml-2">
          <span className="text-xs text-gray-400 whitespace-nowrap">
            {r.time}
          </span>
          {isExpanded ? (
            <ChevronUp size={14} className="text-gray-400" />
          ) : (
            <ChevronDown size={14} className="text-gray-400" />
          )}
        </div>
      </div>
    </div>
  );
});

ReplyThread.displayName = "ReplyThread";

/* ---------------- MAIN ---------------- */
const InboxTab = ({ data = [] }) => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [expanded, setExpanded] = useState(null);
  const [threads, setThreads] = useState(data);

  // Precompute counts (BIG improvement)
  const counts = useMemo(() => {
    const map = { All: threads.length, Unread: 0, Replied: 0, Booked: 0 };

    threads.forEach((t) => {
      const key = t.status.toLowerCase();
      if (key === "unread") map.Unread++;
      if (key === "replied") map.Replied++;
      if (key === "booked") map.Booked++;
    });

    return map;
  }, [threads]);

  const filtered = useMemo(() => {
    if (activeFilter === "All") return threads;
    return threads.filter(
      (t) => t.status.toLowerCase() === activeFilter.toLowerCase()
    );
  }, [threads, activeFilter]);

  const handleToggle = useCallback((id) => {
    setExpanded((prev) => (prev === id ? null : id));
  }, []);

  const handleMarkDone = useCallback((id) => {
    setThreads((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: "replied" } : t
      )
    );
    setExpanded(null);
  }, []);

  const handleFilterChange = useCallback((f) => {
    setActiveFilter(f);
  }, []);

  const unreadCount = counts.Unread;

  return (
    <div className="px-3 sm:px-6 lg:px-8 py-4 sm:py-6">

      {/* Header */}
      <div className="mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            Inbox
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Manage and respond to prospect replies
          </p>
        </div>

        {unreadCount > 0 && (
          <span className="w-fit px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
            {unreadCount} unread
          </span>
        )}
      </div>

      {/* Filters */}
      <FilterPills
        active={activeFilter}
        onChange={handleFilterChange}
        counts={counts}
      />

      {/* Threads */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {filtered.length ? (
          filtered.map((r) => (
            <ReplyThread
              key={r.id}
              r={r}
              isExpanded={expanded === r.id}
              onToggle={handleToggle}
              onMarkDone={handleMarkDone}
            />
          ))
        ) : (
          <p className="text-center py-10 text-sm text-gray-400">
            No messages in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default InboxTab;