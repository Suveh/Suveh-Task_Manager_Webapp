"use client";

import { useEffect, useState } from "react";
import API from "../../services/api";
import Navbar from "../../components/Navbar";
import TaskList from "../../components/TaskList";
import Pagination from "../../components/Pagination";
import TaskFilters from "../../components/TaskFilters";
import { Task } from "../../types/task";
import { useRouter } from "next/navigation";

export default function Dashboard() {

    const [tasks, setTasks] = useState<Task[]>([])
    const [page, setPage] = useState(0)
    const [status, setStatus] = useState("")
    const [priority, setPriority] = useState("")
    const [sort, setSort] = useState("")

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
                } else {
                    setTasks(res.data)
                }

            } catch (err) {
                console.log(err)
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

        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="p-10">

                <h1 className="text-3xl font-bold mb-6">
                    Task Dashboard
                </h1>

                <TaskFilters
                    setStatus={setStatus}
                    setPriority={setPriority}
                    setSort={setSort}
                />

                <TaskList
                    tasks={tasks}
                    onDelete={deleteTask}
                    onComplete={completeTask}
                    onEdit={editTask}
                />

                <Pagination
                    page={page}
                    setPage={setPage}
                />

            </div>

        </div>

    )
}