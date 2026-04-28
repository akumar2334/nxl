import React, { memo, useMemo } from "react";

// Small reusable pill
const StatPill = memo(({ text, color }) => (
  <span
    className={`px-2 py-1 text-xs rounded-full font-medium whitespace-nowrap ${color}`}
  >
    {text}
  </span>
));

StatPill.displayName = "StatPill";

export const TopGreeting = ({
  name = "Lewis",
  avatar = "https://i.pravatar.cc/100?img=12",
  stats = {
    prospects: 12,
    nurture: 8,
    replies: 4,
  },
}) => {
  // Dynamic greeting based on time
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }, []);

  return (
    <div className="flex items-start sm:items-center justify-between px-3 sm:px-6 py-4 sm:py-6 bg-white border-b border-gray-100">

      {/* Left */}
      <div className="flex items-start sm:items-center gap-3 sm:gap-4">

        {/* Avatar */}
        <div className="relative shrink-0">
          <img
            src={avatar}
            alt="user avatar"
            onError={(e) => {
              e.target.src = "https://i.pravatar.cc/100";
            }}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
          />
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 border-2 border-white rounded-full" />
        </div>

        {/* Text */}
        <div className="min-w-0">

          <h2 className="text-base sm:text-lg font-semibold text-gray-900 leading-tight">
            {greeting}, {name} 👋
          </h2>

          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Here's your pipeline activity for today
          </p>

          {/* Stats */}
          <div className="flex items-center gap-1.5 sm:gap-2 mt-2 flex-wrap">

            <StatPill
              text={`${stats.prospects} Prospects to hunt`}
              color="bg-indigo-50 text-indigo-700"
            />

            <StatPill
              text={`${stats.nurture} Contacts to nurture`}
              color="bg-orange-50 text-orange-700"
            />

            <StatPill
              text={`${stats.replies} Replies waiting`}
              color="bg-green-50 text-green-700"
            />

          </div>
        </div>
      </div>
    </div>
  );
};