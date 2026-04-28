import React, { useState, memo } from "react";
import { Video, Users, Building2, CheckCircle } from "lucide-react";

const upcomingEventsData = [
  {
    id: 1,
    type: "Webinar",
    icon: Video,
    iconColor: "text-indigo-600 bg-indigo-100",
    name: "AI-Powered Outbound Strategies",
    description: "Learn how AI agents are transforming modern sales workflows.",
    datetime: "28 Apr 2026, 5:00 PM",
  },
  {
    id: 2,
    type: "Workshop",
    icon: Users,
    iconColor: "text-emerald-600 bg-emerald-100",
    name: "Building High-Converting Sequences",
    description: "Hands-on workshop to build scalable outbound sequences.",
    datetime: "02 May 2026, 3:00 PM",
  },
  {
    id: 3,
    type: "Conference",
    icon: Building2,
    iconColor: "text-purple-600 bg-purple-100",
    name: "GTM Leaders Summit 2026",
    description: "Meet top revenue leaders and explore modern GTM stacks.",
    datetime: "10 May 2026, 10:00 AM",
  },
];

const completedEvents = [
  { id: 1, name: "Outbound Engine Bootcamp" },
  { id: 2, name: "AI in Sales Masterclass" },
  { id: 3, name: "RevenueOS Launch Session" },
];

// Reusable Event Card
const EventCard = memo(({ event, isRegistered, onRegister }) => {
  const Icon = event.icon;

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-sm hover:-translate-y-[1px] transition flex flex-col justify-between">
      
      <div>
        {/* Icon */}
        <div className="flex items-center gap-2 mb-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${event.iconColor}`}>
            <Icon size={16} />
          </div>
          <span className="text-xs font-medium text-gray-500">
            {event.type}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-sm font-semibold text-gray-900 mb-1">
          {event.name}
        </h2>

        {/* Description */}
        <p className="text-xs text-gray-500 mb-3">
          {event.description}
        </p>

        {/* Date */}
        <p className="text-xs text-gray-600 font-medium">
          {event.datetime}
        </p>
      </div>

      {/* CTA */}
      <button
        onClick={() => onRegister(event.id)}
        className={`mt-4 text-xs px-3 py-1.5 rounded-lg transition ${
          isRegistered
            ? "bg-gray-100 text-gray-500 cursor-not-allowed"
            : "bg-indigo-600 text-white hover:bg-indigo-700"
        }`}
      >
        {isRegistered ? "Registered" : "Register"}
      </button>
    </div>
  );
});

EventCard.displayName = "EventCard";

const MarketingEvents = () => {
  const [registered, setRegistered] = useState([]);

  const handleRegister = (id) => {
    setRegistered((prev) =>
      prev.includes(id) ? prev : [...prev, id]
    );
  };

  return (
    <main className="bg-gray-50 min-h-screen px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
          Marketing Events
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Webinars, workshops, and conferences for GTM teams
        </p>
      </div>

      {/* Upcoming */}
      <div>
        <h2 className="text-sm font-semibold text-gray-900 mb-3">
          Upcoming Events
        </h2>

        {upcomingEventsData.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingEventsData.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                isRegistered={registered.includes(event.id)}
                onRegister={handleRegister}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400">No upcoming events.</p>
        )}
      </div>

      {/* Completed */}
      <div className="bg-white border border-gray-100 rounded-xl p-4">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">
          Recently Completed
        </h2>

        {completedEvents.length ? (
          <div className="space-y-3">
            {completedEvents.map((event) => (
              <div
                key={event.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-2 border-b last:border-b-0 border-gray-100"
              >
                <span className="text-sm text-gray-700">
                  {event.name}
                </span>

                <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
                  <CheckCircle size={14} />
                  Completed
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400">No completed events.</p>
        )}
      </div>

    </main>
  );
};

export default MarketingEvents;