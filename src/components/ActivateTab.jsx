import React, { memo, useState, useMemo, useCallback } from "react";
import { Play, Pause, Eye, TrendingUp, Mail, Layers, Users } from "lucide-react";

const STATUS_STYLES = {
  Active: "bg-green-100 text-green-700",
  Paused: "bg-yellow-100 text-yellow-700",
  Completed: "bg-gray-100 text-gray-500",
};

const ACTION_MAP = {
  Active: { label: "Pause", icon: Pause },
  Paused: { label: "Resume", icon: Play },
  Completed: { label: "View", icon: Eye },
};

/* ---------------- STAT CARD ---------------- */
const StatCard = memo(({ icon: Icon, label, value, color }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
    <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center ${color}`}>
      <Icon size={16} />
    </div>
    <div className="min-w-0">
      <p className="text-xs text-gray-500 truncate">{label}</p>
      <p className="text-sm sm:text-base font-semibold text-gray-900">{value}</p>
    </div>
  </div>
));

StatCard.displayName = "StatCard";

/* ---------------- ROW ---------------- */
const ContactRow = memo(({ c, onAction }) => {
  const action = ACTION_MAP[c.status] ?? ACTION_MAP.Completed;
  const ActionIcon = action.icon;

  const progress = useMemo(() => {
    if (!c.totalSteps) return 0;
    return Math.min((c.stepsCompleted / c.totalSteps) * 100, 100);
  }, [c.stepsCompleted, c.totalSteps]);

  const isDisabled = c.status === "Completed";

  return (
    <>
      {/* Desktop */}
      <div className="hidden sm:grid grid-cols-12 items-center px-4 py-4 border-b border-gray-100 hover:bg-indigo-50/20 transition text-sm">
        <div className="col-span-3 flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-semibold"
            style={{ backgroundColor: c.avatarColor ?? "#7c3aed" }}
          >
            {c.avatar}
          </div>

          <div>
            <p className="font-semibold text-gray-900">{c.name}</p>
            <p className="text-xs text-gray-500">{c.title} · {c.company}</p>
          </div>
        </div>

        <div className="col-span-2 text-gray-700">{c.sequence}</div>

        <div className="col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs text-gray-400">
              {c.stepsCompleted}/{c.totalSteps}
            </span>
          </div>
        </div>

        <div className="col-span-2 text-gray-500 text-xs">{c.lastAction}</div>
        <div className="col-span-2 text-gray-500 text-xs">{c.nextAction}</div>

        <div className="col-span-2 flex items-center gap-2 justify-end">
          <span className={`px-2 py-1 text-xs rounded-full font-medium ${STATUS_STYLES[c.status]}`}>
            {c.status}
          </span>

          <button
            disabled={isDisabled}
            onClick={() => onAction(c.id, c.status)}
            className={`flex items-center gap-1 text-xs border px-2.5 py-1 rounded-lg transition ${
              isDisabled
                ? "bg-gray-50 text-gray-400 cursor-not-allowed"
                : "border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            <ActionIcon size={12} />
            {action.label}
          </button>
        </div>
      </div>

      {/* Mobile */}
      <div className="sm:hidden px-4 py-4 border-b border-gray-100">
        <div className="flex items-start gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-semibold"
            style={{ backgroundColor: c.avatarColor ?? "#7c3aed" }}
          >
            {c.avatar}
          </div>

          <div className="flex-1">
            <div className="flex justify-between">
              <p className="text-sm font-semibold">{c.name}</p>
              <span className={`px-2 py-0.5 text-xs rounded-full ${STATUS_STYLES[c.status]}`}>
                {c.status}
              </span>
            </div>

            <p className="text-xs text-gray-500">{c.title} · {c.company}</p>

            <div className="mt-2 text-xs text-gray-600">
              Sequence: {c.sequence}
            </div>

            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs text-gray-400">
                {c.stepsCompleted}/{c.totalSteps}
              </span>
            </div>

            <div className="mt-3">
              <button
                disabled={isDisabled}
                onClick={() => onAction(c.id, c.status)}
                className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg transition ${
                  isDisabled
                    ? "bg-gray-50 text-gray-400 cursor-not-allowed"
                    : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <ActionIcon size={12} />
                {action.label}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

ContactRow.displayName = "ContactRow";

/* ---------------- TABLE HEADER ---------------- */
const TableHeader = () => (
  <div className="hidden sm:grid grid-cols-12 bg-gray-50 text-xs text-gray-400 px-4 py-3 border-b border-gray-200">
    <div className="col-span-3">Contact</div>
    <div className="col-span-2">Sequence</div>
    <div className="col-span-1">Progress</div>
    <div className="col-span-2">Last Action</div>
    <div className="col-span-2">Next Action</div>
    <div className="col-span-2 text-right">Status</div>
  </div>
);

/* ---------------- MAIN ---------------- */
const ActivateTab = ({ data = [] }) => {
  const [contacts, setContacts] = useState(data);

  const handleAction = useCallback((id, currentStatus) => {
    setContacts((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        if (currentStatus === "Active") return { ...c, status: "Paused" };
        if (currentStatus === "Paused") return { ...c, status: "Active" };
        return c;
      })
    );
  }, []);

  const activeCount = useMemo(
    () => contacts.filter((c) => c.status === "Active").length,
    [contacts]
  );

  const repliesCount = useMemo(
    () => contacts.reduce((sum, c) => sum + (c.replies ?? 0), 0),
    [contacts]
  );

  return (
    <div className="px-3 sm:px-6 lg:px-8 py-4 sm:py-6">

      {/* Header */}
      <div className="mb-5">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
          Activate
        </h2>
        <p className="text-sm text-gray-500">
          Nurture warm contacts through sequences
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <StatCard icon={Users} label="Total Contacts" value={contacts.length} color="bg-indigo-100 text-indigo-600" />
        <StatCard icon={Layers} label="Active Sequences" value={activeCount} color="bg-green-100 text-green-600" />
        <StatCard icon={TrendingUp} label="Avg Open Rate" value="32%" color="bg-orange-100 text-orange-600" />
        <StatCard icon={Mail} label="Replies" value={repliesCount} color="bg-purple-100 text-purple-600" />
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            <TableHeader />

            {contacts.length ? (
              contacts.map((c) => (
                <ContactRow key={c.id} c={c} onAction={handleAction} />
              ))
            ) : (
              <p className="text-center py-10 text-sm text-gray-400">
                No contacts to activate.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivateTab;