"use client";

import { useRouter } from "next/navigation";

export default function Navbar(){

  const router = useRouter()

  const logout = ()=>{
    localStorage.removeItem("token")
    router.push("/login")
  }

  return(

    <div className="flex justify-between items-center bg-white shadow p-4">

      <h1 className="text-xl font-bold">
        Task Manager
      </h1>

      <div className="flex gap-3">

        <button
        onClick={()=>router.push("/dashboard")}
        className="bg-blue-500 text-white px-3 py-1 rounded">
        Dashboard
        </button>

        <button
        onClick={()=>router.push("/create-task")}
        className="bg-green-500 text-white px-3 py-1 rounded">
        Create Task
        </button>

        <button
        onClick={logout}
        className="bg-red-500 text-white px-3 py-1 rounded">
        Logout
        </button>

      </div>

    </div>

  )
}