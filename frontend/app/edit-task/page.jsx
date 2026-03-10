"use client";

import { useState, useEffect } from "react";
import API from "../../services/api";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import { FiEdit, FiXCircle } from "react-icons/fi";
import { MdTitle, MdDescription, MdDateRange, MdFlag } from "react-icons/md";
import { BsCalendarDate } from "react-icons/bs";
import { IoArrowBack } from "react-icons/io5";

export default function EditTask() {
    const router = useRouter();
    const params = useSearchParams();
    const id = params.get("id");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [priority, setPriority] = useState("MEDIUM");
    const [status, setStatus] = useState("TODO");
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

    // Fetch task details when component loads
    useEffect(() => {
        const fetchTask = async () => {
            if (!id) return;
            
            try {
                // OPTION 1: Get all tasks and find the one we need
                const res = await API.get(`/tasks/page?page=0&size=100`, {
                    headers: { Authorization: "Bearer " + token }
                });
                
                // Find the task with matching ID
                let task = null;
                if (res.data.content) {
                    task = res.data.content.find(t => t.id === parseInt(id));
                } else if (Array.isArray(res.data)) {
                    task = res.data.find(t => t.id === parseInt(id));
                }
                
                if (task) {
                    setTitle(task.title);
                    setDescription(task.description);
                    setDueDate(task.dueDate || "");
                    setPriority(task.priority || "MEDIUM");
                    setStatus(task.status || "TODO");
                } else {
                    alert("Task not found");
                    router.push("/dashboard");
                }
            } catch (error) {
                console.error("Failed to fetch task:", error);
                alert("Failed to load task details");
                router.push("/dashboard");
            } finally {
                setIsFetching(false);
            }
        };

        if (token) {
            fetchTask();
        } else {
            router.push("/login");
        }
    }, [id, token, router]);

    const updateTask = async () => {
        setIsLoading(true);
        try {
            await API.put(
                `/tasks/${id}`,
                {
                    title,
                    description,
                    status,
                    priority,
                    dueDate: dueDate || null
                },
                {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }
            );
            router.push("/dashboard");
        } catch (error) {
            console.error("Failed to update task:", error);
            alert("Failed to update task. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (isFetching) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
                <Navbar />
                <div className="flex justify-center items-center pt-32">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
            <Navbar />
            
            {/* Background Decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            </div>

            <div className="relative flex justify-center items-start pt-20 px-4 pb-10">
                <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl p-8 w-full max-w-lg border border-white/20">
                    {/* Header with Back Button */}
                    <div className="flex items-center gap-4 mb-6">
                        <button
                            onClick={() => router.push("/dashboard")}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
                        >
                            <IoArrowBack className="w-5 h-5 text-gray-600 group-hover:text-orange-600" />
                        </button>
                        <div>
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                                Edit Task
                            </h2>
                           
                        </div>
                    </div>

                    <div className="space-y-5">
                        {/* Title Input */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700 ml-1 flex items-center gap-1">
                               
                                Task Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                placeholder="Task title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                            />
                        </div>

                        {/* Description Input */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700 ml-1 flex items-center gap-1">
                                
                                Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                placeholder="Task description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={4}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-white/50 backdrop-blur-sm resize-none"
                            />
                        </div>

                        {/* Priority Selection */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700 ml-1 flex items-center gap-1">
                                
                                Priority
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                <button
                                    type="button"
                                    onClick={() => setPriority("LOW")}
                                    className={`py-2 px-3 rounded-lg border-2 transition-all duration-200 flex items-center justify-center gap-1 ${
                                        priority === "LOW"
                                            ? "border-green-500 bg-green-50 text-green-700"
                                            : "border-gray-200 hover:border-gray-300 text-gray-600"
                                    }`}
                                >
                                    <span>🟢</span> Low
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPriority("MEDIUM")}
                                    className={`py-2 px-3 rounded-lg border-2 transition-all duration-200 flex items-center justify-center gap-1 ${
                                        priority === "MEDIUM"
                                            ? "border-yellow-500 bg-yellow-50 text-yellow-700"
                                            : "border-gray-200 hover:border-gray-300 text-gray-600"
                                    }`}
                                >
                                    <span>🟡</span> Medium
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPriority("HIGH")}
                                    className={`py-2 px-3 rounded-lg border-2 transition-all duration-200 flex items-center justify-center gap-1 ${
                                        priority === "HIGH"
                                            ? "border-red-500 bg-red-50 text-red-700"
                                            : "border-gray-200 hover:border-gray-300 text-gray-600"
                                    }`}
                                >
                                    <span>🔴</span> High
                                </button>
                            </div>
                        </div>

                        {/* Status Selection */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700 ml-1 flex items-center gap-1">
                               
                                Status
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                <button
                                    type="button"
                                    onClick={() => setStatus("TODO")}
                                    className={`py-2 px-3 rounded-lg border-2 transition-all duration-200 flex items-center justify-center gap-1 ${
                                        status === "TODO"
                                            ? "border-gray-500 bg-gray-50 text-gray-700"
                                            : "border-gray-200 hover:border-gray-300 text-gray-600"
                                    }`}
                                > Todo
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setStatus("IN_PROGRESS")}
                                    className={`py-2 px-3 rounded-lg border-2 transition-all duration-200 flex items-center justify-center gap-1 ${
                                        status === "IN_PROGRESS"
                                            ? "border-blue-500 bg-blue-50 text-blue-700"
                                            : "border-gray-200 hover:border-gray-300 text-gray-600"
                                    }`}
                                >
                                     In Progress
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setStatus("DONE")}
                                    className={`py-2 px-3 rounded-lg border-2 transition-all duration-200 flex items-center justify-center gap-1 ${
                                        status === "DONE"
                                            ? "border-green-500 bg-green-50 text-green-700"
                                            : "border-gray-200 hover:border-gray-300 text-gray-600"
                                    }`}
                                >
                                     Done
                                </button>
                            </div>
                        </div>

                        {/* Due Date Input */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700 ml-1 flex items-center gap-1">
                                
                                Due Date (Optional)
                            </label>
                            <div className="relative">
                                <MdDateRange className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="datetime-local"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3 pt-4">
                            <button
                                onClick={updateTask}
                                disabled={isLoading || !title || !description}
                                className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2 group"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        <span>Updating...</span>
                                    </>
                                ) : (
                                    <>
                                        <FiEdit className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                        <span>Update Task</span>
                                    </>
                                )}
                            </button>

                            <button
                                onClick={() => router.push("/dashboard")}
                                className="w-full border-2 border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 text-gray-700 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 group"
                            >
                                
                                <span>Cancel</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
            `}</style>
        </div>
    );
}