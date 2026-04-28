import { useState, useMemo, useEffect, useCallback } from "react";
import { Target, Zap, Inbox } from "lucide-react";

import ProspectTable from "./ProspectTable";
import SearchFilterBar from "./SearchFilterBar";
import ActivateTab from "./ActivateTab";
import InboxTab from "./InboxTab";

import { prospects } from "../data/prospects";
import { inboxReplies } from "../data/inboxReplies";
import { activateContacts } from "../data/activateContacts";

// simple debounce hook
const useDebounce = (value, delay = 300) => {
	const [debounced, setDebounced] = useState(value);

	useEffect(() => {
		const timer = setTimeout(() => setDebounced(value), delay);
		return () => clearTimeout(timer);
	}, [value, delay]);

	return debounced;
};

export default function ProspectTabs() {
	const [activeTab, setActiveTab] = useState("Hunt");
	const [view, setView] = useState("contacts");
	const [search, setSearch] = useState("");

	const debouncedSearch = useDebounce(search, 300);

	// Tabs config
	const tabs = useMemo(
		() => [
			{
				key: "Hunt",
				icon: Target,
				count: prospects.length,
				color: "bg-indigo-100 text-indigo-700",
				activeColor: "bg-indigo-600 text-white",
			},
			{
				key: "Activate",
				icon: Zap,
				count: activateContacts.length,
				color: "bg-orange-100 text-orange-700",
				activeColor: "bg-indigo-600 text-white",
			},
			{
				key: "Inbox",
				icon: Inbox,
				count: inboxReplies.length,
				color: "bg-green-100 text-green-700",
				activeColor: "bg-indigo-600 text-white",
			},
		],
		[],
	);

	// Filtering (memoized)
	const filteredContacts = useMemo(() => {
		if (!debouncedSearch.trim()) return prospects;

		return prospects.filter((item) =>
			`${item.name} ${item.account} ${item.signal}`
				.toLowerCase()
				.includes(debouncedSearch.toLowerCase()),
		);
	}, [debouncedSearch]);

	const handleTabChange = useCallback((tab) => {
		setActiveTab(tab);
	}, []);

	const handleViewChange = useCallback((v) => {
		setView(v);
	}, []);

	return (
		<div className="px-3 sm:px-6 py-3 bg-white">
			{/* Tabs */}
			<div className="flex items-center gap-2 sm:gap-3 border-b border-gray-200 overflow-x-auto scrollbar-none">
				{tabs.map((tab) => {
					const Icon = tab.icon;
					const isActive = activeTab === tab.key;

					return (
						<button
							key={tab.key}
							onClick={() => handleTabChange(tab.key)}
							className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-t-lg text-xs sm:text-sm font-medium transition whitespace-nowrap ${
								isActive ? tab.activeColor : "text-gray-600 hover:bg-gray-100"
							}`}
						>
							<Icon size={14} />

							<span className="hidden xs:inline sm:inline">{tab.key}</span>

							<span
								className={`text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-semibold ${
									isActive ? "bg-white text-indigo-600" : tab.color
								}`}
							>
								{tab.count}
							</span>
						</button>
					);
				})}
			</div>

			{/* Content */}
			<div className="py-4 sm:py-6">
				{/* HUNT TAB */}
				{activeTab === "Hunt" && (
					<div>
						{/* Toggle */}
						<div className="flex gap-2 sm:gap-3 mb-4 overflow-x-auto scrollbar-none">
							{["contacts", "accounts"].map((type) => (
								<button
									key={type}
									onClick={() => handleViewChange(type)}
									className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium border transition whitespace-nowrap ${
										view === type
											? "bg-white shadow text-gray-900"
											: "bg-gray-100 text-gray-600"
									}`}
								>
									{type === "contacts"
										? `Contacts (${prospects.length})`
										: "Accounts (12)"}
								</button>
							))}
						</div>

						{/* Search */}
						<div className="mb-4">
							<SearchFilterBar search={search} setSearch={setSearch} />
						</div>

						{/* Table */}
						{view === "contacts" ? (
							filteredContacts.length ? (
								<div className="overflow-x-auto -mx-3 sm:mx-0">
									<div className="min-w-[640px] px-3 sm:px-0">
										<ProspectTable data={filteredContacts} />
									</div>
								</div>
							) : (
								<p className="text-center text-sm text-gray-400 py-10">
									No prospects found for "{search}"
								</p>
							)
						) : (
							<div className="text-sm text-gray-500 py-8 text-center">
								Accounts view coming soon 🚀
							</div>
						)}
					</div>
				)}

				{/* ACTIVATE */}
				{activeTab === "Activate" && <ActivateTab data={activateContacts} />}

				{/* INBOX */}
				{activeTab === "Inbox" && <InboxTab data={inboxReplies} />}
			</div>
		</div>
	);
}
