"use client";

import { IoChevronBack, IoChevronForward } from "react-icons/io5";

interface Props {
    page: number;
    setPage: (p: number) => void;
    totalPages?: number;  // Add this prop to know when to disable Next
}

export default function Pagination({ page, setPage, totalPages = 1 }: Props) {
    return (
        <div className="flex items-center gap-3">
            {/* Previous Button */}
            <button
                onClick={() => setPage(Math.max(page - 1, 0))}
                disabled={page === 0}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-all duration-200"
            >
                <IoChevronBack className="w-4 h-4" />
                Previous
            </button>

            {/* Page Info */}
            <div className="flex items-center gap-1">
                <span className="px-4 py-2 bg-indigo-50 text-indigo-600 font-semibold rounded-lg border border-indigo-200">
                    Page {page + 1} of {totalPages}
                </span>
            </div>

            {/* Next Button - Disabled on last page */}
            <button
                onClick={() => setPage(page + 1)}
                disabled={page + 1 >= totalPages}
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-indigo-600 disabled:hover:translate-y-0"
            >
                Next
                <IoChevronForward className="w-4 h-4" />
            </button>
        </div>
    );
}