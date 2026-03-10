"use client";

import { useState } from "react";
import API from "../../services/api";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";

export default function CreateTask(){

  const router = useRouter()

  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")
  const [dueDate,setDueDate] = useState("")

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : ""

  const createTask = async()=>{

    await API.post("/tasks",
    {
      title,
      description,
      status:"TODO",
      priority:"HIGH",
      dueDate
    },
    {
      headers:{
        Authorization:"Bearer "+token
      }
    })

    router.push("/dashboard")
  }

  return(

    <div className="min-h-screen bg-gray-100">

      <Navbar/>

      <div className="flex justify-center pt-20">

        <div className="bg-white p-8 rounded shadow w-96">

          <h2 className="text-2xl font-bold mb-4">
          Create Task
          </h2>

          <input
          placeholder="Title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          className="border p-2 w-full mb-3"
          />

          <input
          placeholder="Description"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
          className="border p-2 w-full mb-3"
          />

          <input
          type="datetime-local"
          value={dueDate}
          onChange={(e)=>setDueDate(e.target.value)}
          className="border p-2 w-full mb-4"
          />

          <button
          onClick={createTask}
          className="bg-blue-500 text-white w-full py-2 rounded">
          Create Task
          </button>

        </div>

      </div>

    </div>

  )
}