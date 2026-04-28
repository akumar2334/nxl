import React, { memo, useState } from "react";
import {
  TrendingUp,
  Users,
  Target,
  Calendar,
  Zap,
} from "lucide-react";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

/* ---------------- DATA ---------------- */

const stats = [
  { id: 1, label: "Total Prospects", value: "1,284", icon: Users, color: "text-indigo-600 bg-indigo-100" },
  { id: 2, label: "Active Campaigns", value: "18", icon: Target, color: "text-emerald-600 bg-emerald-100" },
  { id: 3, label: "Reply Rate", value: "24.6%", icon: TrendingUp, color: "text-purple-600 bg-purple-100" },
  { id: 4, label: "Meetings Booked", value: "42", icon: Calendar, color: "text-orange-600 bg-orange-100" },
];

const chartData = [
  { name: "Mon", replies: 12, meetings: 3 },
  { name: "Tue", replies: 18, meetings: 5 },
  { name: "Wed", replies: 10, meetings: 2 },
  { name: "Thu", replies: 22, meetings: 6 },
  { name: "Fri", replies: 28, meetings: 8 },
  { name: "Sat", replies: 16, meetings: 4 },
  { name: "Sun", replies: 20, meetings: 5 },
];

const topSignals = [
  { id: 1, text: "Series B funding spike in fintech accounts", level: "High" },
  { id: 2, text: "Increased hiring in SaaS sales teams", level: "Medium" },
  { id: 3, text: "Spike in pricing page visits", level: "High" },
  { id: 4, text: "Enterprise tool comparison searches rising", level: "Low" },
];

const activityFeed = [
  { id: 1, text: "Marcus Chen opened outreach email", time: "2 min ago" },
  { id: 2, text: "Ava Rodriguez clicked pricing link", time: "12 min ago" },
  { id: 3, text: "Jordan Kim replied to sequence", time: "1 hr ago" },
  { id: 4, text: "Sophia Nguyen booked a demo", time: "3 hrs ago" },
];

/* ---------------- COMPONENTS ---------------- */

const StatCard = memo(({ icon: Icon, label, value, color }) => (
  <div className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-sm transition">
    <div className="flex items-center justify-between mb-3">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${color}`}>
        <Icon size={16} />
      </div>
    </div>
    <h2 className="text-lg font-bold text-gray-900">{value}</h2>
    <p className="text-xs text-gray-500">{label}</p>
  </div>
));

StatCard.displayName = "StatCard";

const SkeletonCard = () => (
  <div className="bg-white border border-gray-100 rounded-xl p-4 animate-pulse">
    <div className="w-8 h-8 bg-gray-200 rounded mb-3" />
    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
    <div className="h-3 bg-gray-200 rounded w-1/3" />
  </div>
);

/* ---------------- MAIN ---------------- */

const Analytics = () => {
  const [metric, setMetric] = useState("replies");
  const isLoading = false;

  return (
    <main className="bg-gray-50 min-h-screen px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
          Analytics
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Track outbound performance and revenue signals in real time
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {isLoading
          ? Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />)
          : stats.map((s) => (
              <StatCard
                key={s.id}
                icon={s.icon}
                label={s.label}
                value={s.value}
                color={s.color}
              />
            ))}
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Chart */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-xl p-4">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Zap className="text-indigo-600" size={16} />
              <h2 className="text-sm font-semibold text-gray-900">
                Performance Overview
              </h2>
            </div>

            {/* Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setMetric("replies")}
                className={`text-xs px-2 py-1 rounded-md border ${
                  metric === "replies"
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white text-gray-600 border-gray-200"
                }`}
              >
                Replies
              </button>
              <button
                onClick={() => setMetric("meetings")}
                className={`text-xs px-2 py-1 rounded-md border ${
                  metric === "meetings"
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white text-gray-600 border-gray-200"
                }`}
              >
                Meetings
              </button>
            </div>
          </div>

          {/* Chart */}
          <div className="h-56 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                    fontSize: "12px",
                  }}
                />

                <Line
                  type="monotone"
                  dataKey={metric}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Signals */}
        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">
            Top Signals
          </h2>

          <div className="space-y-3">
            {topSignals.map((s) => (
              <div
                key={s.id}
                className="p-2 rounded-lg bg-gray-50 border border-gray-100 hover:bg-gray-100 transition"
              >
                <p className="text-xs text-gray-700">{s.text}</p>
                <span className="text-[10px] text-gray-400">
                  {s.level} priority
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity */}
      <div className="bg-white border border-gray-100 rounded-xl p-4">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">
          Recent Activity
        </h2>

        <div className="space-y-3">
          {activityFeed.map((a) => (
            <div
              key={a.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 border-b last:border-b-0 border-gray-100 py-2"
            >
              <p className="text-sm text-gray-700">{a.text}</p>
              <span className="text-xs text-gray-400">{a.time}</span>
            </div>
          ))}
        </div>
      </div>

    </main>
  );
};

export default Analytics;