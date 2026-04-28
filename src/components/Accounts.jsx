import React from "react";

export default function Accounts() {
	return (
		<div className="flex flex-col items-center justify-center py-12 text-center">
			<div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-50 mb-3">
				<span className="text-indigo-600 text-lg">🏢</span>
			</div>

			<h3 className="text-sm font-semibold text-gray-900">
				Accounts view coming soon
			</h3>

			<p className="text-xs text-gray-500 mt-1 max-w-xs">
				We’re working on bringing account-level insights and tracking here.
			</p>

			<span className="mt-3 text-[11px] text-indigo-600 font-medium bg-indigo-50 px-2 py-1 rounded-full">
				🚀 In progress
			</span>
		</div>
	);
}
