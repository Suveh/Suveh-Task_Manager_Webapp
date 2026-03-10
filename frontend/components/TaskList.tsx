"use client";

import { Task } from "../types/task";
import { useState } from "react";
import { FiEdit2, FiTrash2, FiCheckCircle } from "react-icons/fi";
import { MdAccessTime, MdFlag, MdDateRange } from "react-icons/md";
import { FaExclamationTriangle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

interface Props {
    tasks: Task[];
    onDelete: (id: number) => void;
    onComplete: (id: number) => void;
    onEdit: (id: number) => void;
}

export default function TaskList({ tasks, onDelete, onComplete, onEdit }: Props) {
    const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

    const getStatusBadge = (status: string) => {
        const badges = {
            PENDING: { bg: "bg-yellow-100", text: "text-yellow-800", label: "Pending" },
            IN_PROGRESS: { bg: "bg-blue-100", text: "text-blue-800", label: "In Progress" },
            DONE: { bg: "bg-green-100", text: "text-green-800", label: "Done" }
        };
        const badge = badges[status as keyof typeof badges] || badges.PENDING;
        return (
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
                {badge.label}
            </span>
        );
    };

    const getPriorityBadge = (priority: string) => {
        const badges = {
            HIGH: { bg: "bg-red-100", text: "text-red-800", icon: "🔴", label: "High" },
            MEDIUM: { bg: "bg-yellow-100", text: "text-yellow-800", icon: "🟡", label: "Medium" },
            LOW: { bg: "bg-green-100", text: "text-green-800", icon: "🟢", label: "Low" }
        };
        const badge = badges[priority as keyof typeof badges] || badges.MEDIUM;
        return (
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
                {badge.icon} {badge.label}
            </span>
        );
    };

    const handleDeleteClick = (id: number) => {
        setDeleteConfirmId(id);
    };

    const confirmDelete = (id: number) => {
        onDelete(id);
        setDeleteConfirmId(null);
    };

    const cancelDelete = () => {
        setDeleteConfirmId(null);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
                <div
                    key={task.id}
                    className="group bg-white rounded-xl shadow-sm hover:shadow-xl border border-gray-200 hover:border-indigo-200 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                    {/* Card Header with Status */}
                    <div className="p-5">
                        <div className="flex justify-between items-start mb-3">
                            <h3 className="font-bold text-lg text-gray-800 group-hover:text-indigo-600 transition-colors line-clamp-1">
                                {task.title}
                            </h3>
                            <div className="flex gap-2">
                                {getStatusBadge(task.status)}
                            </div>
                        </div>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {task.description}
                        </p>

                        {/* Priority and Due Date */}
                        <div className="flex items-center justify-between mb-4">
                            {getPriorityBadge(task.priority)}
                            
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                <MdDateRange className="w-4 h-4" />
                                <span>
                                    {task.dueDate
                                        ? new Date(task.dueDate).toLocaleDateString()
                                        : "No due date"}
                                </span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        {deleteConfirmId === task.id ? (
                            <div className="flex gap-2 mt-4 p-3 bg-red-50 rounded-lg animate-fadeIn">
                                <FaExclamationTriangle className="w-4 h-4 text-red-500" />
                                <p className="text-sm text-red-600 flex-1">Delete this task?</p>
                                <button
                                    onClick={() => confirmDelete(task.id)}
                                    className="text-xs bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded transition-colors"
                                >
                                    Yes
                                </button>
                                <button
                                    onClick={cancelDelete}
                                    className="text-xs bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded transition-colors"
                                >
                                    No
                                </button>
                            </div>
                        ) : (
                            <div className="flex gap-2 mt-4">
                                <button
                                    onClick={() => onEdit(task.id)}
                                    className="flex-1 inline-flex items-center justify-center gap-1 bg-amber-500 hover:bg-amber-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                                >
                                    <FiEdit2 className="w-4 h-4" />
                                    Edit
                                </button>
                                
                                <button
                                    onClick={() => onComplete(task.id)}
                                    disabled={task.status === "DONE"}
                                    className={`flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${
                                        task.status === "DONE"
                                            ? "bg-gray-300 cursor-not-allowed"
                                            : "bg-emerald-500 hover:bg-emerald-600 text-white"
                                    }`}
                                >
                                    <FiCheckCircle className="w-4 h-4" />
                                    Complete
                                </button>
                                
                                <button
                                    onClick={() => handleDeleteClick(task.id)}
                                    className="flex-1 inline-flex items-center justify-center gap-1 bg-rose-500 hover:bg-rose-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                                >
                                    <FiTrash2 className="w-4 h-4" />
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}