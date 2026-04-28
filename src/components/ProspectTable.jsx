import React, {
	memo,
	useState,
	useMemo,
	useCallback,
	useRef,
	useEffect,
} from "react";
import { ChevronDown } from "lucide-react";

/* ---------------- ROW ---------------- */
const ProspectRow = memo(({ p, checked, onToggle }) => {
	const [open, setOpen] = useState(false);

	const handleOnClick = () => {
		if (open) {
			setOpen(false);
		}
	};
	return (
		<>
			{/* Desktop */}
			<div className="hidden sm:grid grid-cols-12 items-center px-4 py-4 border-b border-gray-100 hover:bg-indigo-50/30 transition">
				<div className="col-span-1">
					<input
						type="checkbox"
						checked={checked}
						onChange={() => onToggle(p.id)}
					/>
				</div>

				<div className="col-span-3 flex items-start gap-3">
					<div
						className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-semibold ${p.avatarColor}`}
					>
						{p.initials}
					</div>

					<div>
						<div className="text-sm font-semibold text-gray-900">{p.name}</div>
						<div className="text-xs text-gray-500">{p.title}</div>

						<div className="flex items-center gap-2 mt-1">
							<div
								className={`w-4 h-4 rounded-sm flex items-center justify-center text-[10px] text-white ${p.companyColor}`}
							>
								{p.companyInitial}
							</div>
							<span className="text-xs text-gray-600">{p.company}</span>
						</div>
					</div>
				</div>

				<div className="col-span-1">
					<span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
						{p.stage}
					</span>
				</div>

				<div className="col-span-2">
					<div className="text-sm font-medium text-gray-800">{p.goal}</div>
					<div className="text-xs text-gray-400">Objective</div>
				</div>

				<div className="col-span-2">
					<div className="text-sm font-medium text-purple-700">{p.signal}</div>
					<div className="text-xs text-gray-400">{p.signalTime}</div>
				</div>

				<div className="col-span-2">
					<div className="text-sm text-gray-800">{p.recommendedAction}</div>
					<div className="text-xs text-gray-400">Suggested step</div>
				</div>

				<div className="col-span-1 flex justify-end relative">
					<button
						onClick={(e) => {
							e.stopPropagation();
							setOpen((prev) => !prev);
						}}
						className="flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-gray-600 border border-gray-200 rounded-md hover:bg-gray-50 transition"
					>
						Actions
						<ChevronDown
							size={12}
							className={`transition ${open ? "rotate-180" : ""}`}
						/>
					</button>

					{/* Dropdown */}
					{open && (
						<div className="absolute right-0 top-8 w-40 bg-white border border-gray-200 rounded-lg shadow-md z-10">
							<button
								className="w-full text-left px-3 py-2 text-xs hover:bg-gray-50"
								onClick={handleOnClick}
							>
								Review
							</button>
							<button
								className="w-full text-left px-3 py-2 text-xs hover:bg-gray-50"
								onClick={handleOnClick}
							>
								Add to Sequence
							</button>
							<button
								className="w-full text-left px-3 py-2 text-xs hover:bg-gray-50"
								onClick={handleOnClick}
							>
								Mark as Contacted
							</button>
							<button
								className="w-full text-left px-3 py-2 text-xs text-red-500 hover:bg-red-50"
								onClick={handleOnClick}
							>
								Skip
							</button>
						</div>
					)}
				</div>
			</div>

			{/* Mobile */}
			<div className="sm:hidden px-4 py-4 border-b border-gray-100">
				<div className="flex items-start gap-3">
					<input
						type="checkbox"
						checked={checked}
						onChange={() => onToggle(p.id)}
						className="mt-1"
					/>

					<div
						className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-semibold ${p.avatarColor}`}
					>
						{p.initials}
					</div>

					<div className="flex-1">
						<div className="flex justify-between">
							<p className="text-sm font-semibold text-gray-900">{p.name}</p>
							<span className="px-2 py-0.5 text-xs bg-gray-100 rounded-full">
								{p.stage}
							</span>
						</div>

						<p className="text-xs text-gray-500">{p.title}</p>

						<div className="mt-1 text-xs text-gray-600">{p.company}</div>

						<div className="mt-2 flex justify-between">
							<p className="text-xs text-purple-700">{p.signal}</p>
							<button className="text-xs text-indigo-600">Review</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
});

ProspectRow.displayName = "ProspectRow";

/* ---------------- TABLE ---------------- */
const ProspectTable = ({ data = [] }) => {
	const [selectedIds, setSelectedIds] = useState([]);

	// Convert to Set (fast lookup)
	const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds]);

	const allSelected = useMemo(
		() => data.length > 0 && selectedIds.length === data.length,
		[data.length, selectedIds.length],
	);

	const toggleSelect = useCallback((id) => {
		setSelectedIds((prev) =>
			prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
		);
	}, []);

	const toggleSelectAll = useCallback(() => {
		setSelectedIds((prev) =>
			prev.length === data.length ? [] : data.map((p) => p.id),
		);
	}, [data]);

	// Indeterminate checkbox (nice touch)
	const checkboxRef = useRef();

	useEffect(() => {
		if (checkboxRef.current) {
			checkboxRef.current.indeterminate =
				selectedIds.length > 0 && selectedIds.length < data.length;
		}
	}, [selectedIds, data.length]);

	return (
		<div className="w-full border border-gray-200 rounded-lg overflow-hidden">
			{/* Header */}
			<div className="hidden sm:grid grid-cols-12 bg-gray-50 text-xs text-gray-500 px-4 py-3">
				<div className="col-span-1">
					<input
						ref={checkboxRef}
						type="checkbox"
						checked={allSelected}
						onChange={toggleSelectAll}
					/>
				</div>
				<div className="col-span-3">Prospect</div>
				<div className="col-span-1">Stage</div>
				<div className="col-span-2">Goal</div>
				<div className="col-span-2">Signal</div>
				<div className="col-span-2">Recommended Action</div>
				<div className="col-span-1 text-right">Actions</div>
			</div>

			{/* Rows */}
			{data.length ? (
				data.map((p) => (
					<ProspectRow
						key={p.id}
						p={p}
						checked={selectedSet.has(p.id)}
						onToggle={toggleSelect}
					/>
				))
			) : (
				<p className="p-6 text-sm text-gray-400 text-center">
					No prospects found.
				</p>
			)}
		</div>
	);
};

export default ProspectTable;
