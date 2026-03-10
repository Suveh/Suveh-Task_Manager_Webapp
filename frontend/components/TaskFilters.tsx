"use client";

import { MdFilterList, MdSort } from "react-icons/md";
import { FaFlag, FaClock } from "react-icons/fa";

interface Props {
    setStatus: (status: string) => void;
    setPriority: (priority: string) => void;
    setSort: (sort: string) => void;
}

export default function TaskFilters({ setStatus, setPriority, setSort }: Props) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Status Filter */}
            <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <MdFilterList className="w-4 h-4 text-indigo-500" />
                    Status
                </label>
                <select
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:border-indigo-400"
                    defaultValue=""
                >
                    <option value="">All Status</option>
                    <option value="PENDING"> Pending</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="DONE"> Done</option>
                </select>
            </div>

            {/* Priority Filter */}
            <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <FaFlag className="w-4 h-4 text-indigo-500" />
                    Priority
                </label>
                <select
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:border-indigo-400"
                    defaultValue=""
                >
                    <option value="">All Priority</option>
                    <option value="HIGH">🔴 High</option>
                    <option value="MEDIUM">🟡 Medium</option>
                    <option value="LOW">🟢 Low</option>
                </select>
            </div>

            {/* Sort Filter */}
            <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <MdSort className="w-4 h-4 text-indigo-500" />
                    Sort By
                </label>
                <select
                    onChange={(e) => setSort(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:border-indigo-400"
                    defaultValue=""
                >
                    <option value="">Default</option>
                    <option value="dueDate"> Due Date</option>
                    <option value="priority"> Priority</option>
                    <option value="status"> Status</option>
                </select>
            </div>
        </div>
    );
}