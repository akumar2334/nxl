import { useState } from "react";
import { Home, BarChart3, BookOpen, Calendar, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const agents = [
  {
    name: "Rocky",
    role: "Sales Coach",
    avatar: "https://i.pravatar.cc/40?img=1",
    active: false,
  },
  {
    name: "Sarah",
    role: "Outbound Engine",
    avatar: "https://i.pravatar.cc/40?img=2",
    active: true,
  },
  {
    name: "Chloe",
    role: "Content Assistant",
    avatar: "https://i.pravatar.cc/40?img=3",
    active: false,
  },
];

const resources = [
  { label: "Analytics", icon: BarChart3, path: "/analytics" },
  { label: "Knowledge Base", icon: BookOpen, path: "/knowledge-base" },
  { label: "Marketing Events", icon: Calendar, path: "/marketing-events" },
];

const SidebarContent = ({ onClose }) => {
  const location = useLocation();

  const navItemClass = (path) =>
    `flex items-center gap-3 p-2 rounded-lg transition ${
      location.pathname === path
        ? "bg-gray-100 text-gray-900"
        : "hover:bg-gray-50 text-gray-700"
    }`;

  return (
    <div className="w-64 h-full bg-white flex flex-col justify-between">

      {/* Top */}
      <div>

        {/* Logo + close button on mobile */}
        <div className="flex items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-600 text-white flex items-center justify-center rounded-lg font-bold text-sm">
              NXL
            </div>
            <span className="text-lg font-semibold">NXL</span>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="sm:hidden p-1 rounded-lg hover:bg-gray-100 text-gray-500"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Home */}
        <div className="px-3">
          <Link to="/" onClick={onClose}>
            <div className={navItemClass("/")}>
              <Home size={18} />
              <span className="text-sm font-medium">Home</span>
            </div>
          </Link>
        </div>

        {/* AI Team */}
        <div className="mt-6 px-6">
          <p className="text-xs text-gray-400 font-semibold mb-3">
            AI REVENUEOS GTM TEAM
          </p>
          <div className="space-y-2">
            {agents.map((agent) => (
              <div
                key={agent.name}
                className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition ${
                  agent.active ? "bg-gray-100" : "hover:bg-gray-50"
                }`}
              >
                <img
                  src={agent.avatar}
                  alt={agent.name}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium">{agent.name}</p>
                  <p className="text-xs text-gray-500">{agent.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className="mt-6 px-6">
          <p className="text-xs text-gray-400 font-semibold mb-3">RESOURCES</p>
          <div className="space-y-2">
            {resources.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.path} to={item.path} onClick={onClose}>
                  <div className={navItemClass(item.path)}>
                    <Icon size={18} />
                    <span className="text-sm">{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

      </div>

      {/* Bottom user */}
      <div className="px-6 py-4 border-t border-gray-200 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center font-medium">
          L
        </div>
        <span className="text-sm font-medium">Lewis</span>
      </div>

    </div>
  );
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="sm:hidden fixed top-4 left-4 z-50 p-2 bg-white border border-gray-200 rounded-lg shadow-sm text-gray-600"
      >
        <Menu size={20} />
      </button>

      {/* Desktop sidebar — always visible */}
      <div className="hidden sm:flex h-screen border-r border-gray-200 sticky top-0">
        <SidebarContent />
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="sm:hidden fixed inset-0 z-40 bg-black/40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`sm:hidden fixed top-0 left-0 h-full z-50 shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent onClose={() => setIsOpen(false)} />
      </div>
    </>
  );
};

export default Sidebar;