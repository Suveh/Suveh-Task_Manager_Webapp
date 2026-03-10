"use client";

import { useEffect, useState } from "react";
import API from "../../services/api";
import Navbar from "../../components/Navbar";
import TaskList from "../../components/TaskList";
import Pagination from "../../components/Pagination";
import TaskFilters from "../../components/TaskFilters";
import { Task } from "../../types/task";
import { useRouter } from "next/navigation";
import { FiPlus } from "react-icons/fi";
import { GiChecklist } from "react-icons/gi";
import { MdOutlineTaskAlt } from "react-icons/md";

export default function Dashboard() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [page, setPage] = useState(0)
    const [totalPages, setTotalPages] = useState(1)
    const [status, setStatus] = useState("")
    const [priority, setPriority] = useState("")
    const [sort, setSort] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    const router = useRouter()

    const token = typeof window !== "undefined"
        ? localStorage.getItem("token")
        : ""

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/login");
        }
    }, []);

    useEffect(() => {
        const loadTasks = async () => {
            setIsLoading(true)
            try {
                let url = `/tasks/page?page=${page}&size=5`

                if (status || priority) {
                    url = `/tasks/filter?status=${status}&priority=${priority}`
                }

                if (sort) {
                    url = `/tasks/sort?field=${sort}`
                }

                const res = await API.get(url, {
                    headers: { Authorization: "Bearer " + token }
                })

                if (res.data.content) {
                    setTasks(res.data.content)
                    setTotalPages(res.data.totalPages || 1)
                } else {
                    setTasks(res.data)
                    setTotalPages(1)
                }
            } catch (err) {
                console.log(err)
            } finally {
                setIsLoading(false)
            }
        }

        loadTasks()
    }, [page, status, priority, sort, token])

    const deleteTask = async (id: number) => {
        await API.delete(`/tasks/${id}`, {
            headers: { Authorization: "Bearer " + token }
        })

        setTasks(prev => prev.filter(t => t.id !== id))
    }

    const completeTask = async (id: number) => {
        await API.put(`/tasks/${id}/complete`, {}, {
            headers: { Authorization: "Bearer " + token }
        })

        setTasks(prev =>
            prev.map(t => t.id === id ? { ...t, status: "DONE" } : t)
        )
    }

    const editTask = (id: number) => {
        router.push(`/edit-task?id=${id}`)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <Navbar />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <div className="flex items-center gap-2">
                            <MdOutlineTaskAlt className="w-8 h-8 text-indigo-600" />
                            <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
                                Task Dashboard
                            </h1>
                        </div>
                        <p className="text-slate-600 mt-1">
                            Manage and track your tasks efficiently
                        </p>
                    </div>
                    
                    <button
                        onClick={() => router.push("/create-task")}
                        className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-6 py-2.5 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                    >
                        <FiPlus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                        Create New Task
                    </button>
                </div>

                {/* Filters Section */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
                    <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                         Filters & Sorting
                    </h2>
                    <TaskFilters
                        setStatus={setStatus}
                        setPriority={setPriority}
                        setSort={setSort}
                    />
                </div>

                {/* Tasks Grid */}
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 animate-pulse">
                                <div className="h-6 bg-slate-200 rounded w-3/4 mb-4"></div>
                                <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
                                <div className="h-4 bg-slate-200 rounded w-2/3 mb-4"></div>
                                <div className="flex gap-2 mt-4">
                                    <div className="h-8 bg-slate-200 rounded flex-1"></div>
                                    <div className="h-8 bg-slate-200 rounded flex-1"></div>
                                    <div className="h-8 bg-slate-200 rounded flex-1"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : tasks.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
                        <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <GiChecklist className="w-12 h-12 text-indigo-400" />
                        </div>
                        <h3 className="text-lg font-medium text-slate-700 mb-2">No tasks found</h3>
                        <p className="text-slate-500 mb-4">Get started by creating your first task!</p>
                        <button
                            onClick={() => router.push("/create-task")}
                            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium group"
                        >
                            <FiPlus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                            Create a task
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="mb-4 flex items-center justify-between">
                            <p className="text-sm text-slate-600">
                                Showing {tasks.length} task{tasks.length !== 1 ? 's' : ''}
                            </p>
                            <p className="text-xs text-slate-400">
                                Page {page + 1}
                            </p>
                        </div>
                        
                        <TaskList
                            tasks={tasks}
                            onDelete={deleteTask}
                            onComplete={completeTask}
                            onEdit={editTask}
                        />
                    </>
                )}

                {/* Pagination */}
                {tasks.length > 0 && !isLoading && (
                    <div className="mt-10 flex justify-center">
                        <Pagination
                            page={page}
                            setPage={setPage}
                            totalPages={totalPages}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}