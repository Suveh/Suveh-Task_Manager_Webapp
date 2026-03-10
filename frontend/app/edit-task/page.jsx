"use client";

import { useState } from "react";
import API from "../../services/api";
import { useRouter } from "next/navigation";

export default function EditTask(){

  const router = useRouter()

  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")

  const updateTask = async () => {

    const token = localStorage.getItem("token")

    const id = prompt("Enter Task ID")

    await API.put(`/tasks/${id}`,
      {
        title,
        description,
        status:"TODO",
        priority:"HIGH"
      },
      {
        headers:{
          Authorization:"Bearer "+token
        }
      }
    )

    router.push("/dashboard")
  }

  return(

    <div className="p-10">

      <h1 className="text-2xl font-bold mb-6">
        Edit Task
      </h1>

      <input
        placeholder="Title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        className="border p-2 block mb-3"
      />

      <input
        placeholder="Description"
        value={description}
        onChange={(e)=>setDescription(e.target.value)}
        className="border p-2 block mb-3"
      />

      <button
        onClick={updateTask}
        className="bg-orange-500 text-white px-4 py-2 rounded"
      >
        Update Task
      </button>

    </div>
  )
}