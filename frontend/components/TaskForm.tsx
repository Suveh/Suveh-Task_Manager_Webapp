"use client";

interface Task {
  id:number
  title:string
  description:string
  status:string
  priority:string
}

interface Props{
  tasks:Task[]
  onDelete:(id:number)=>void
  onComplete:(id:number)=>void
  onEdit:(id:number)=>void
}

export default function TaskList({tasks,onDelete,onComplete,onEdit}:Props){

  return(

    <div className="grid grid-cols-3 gap-6">

      {tasks.map((task)=>(

        <div key={task.id} className="bg-white p-6 rounded shadow">

          <h3 className="font-bold text-lg">
            {task.title}
          </h3>

          <p>{task.description}</p>

          <p>Status: {task.status}</p>
          <p>Priority: {task.priority}</p>

          <div className="flex gap-2 mt-3">

            <button
              onClick={()=>onEdit(task.id)}
              className="bg-yellow-500 text-white px-3 py-1 rounded"
            >
              Edit
            </button>

            <button
              onClick={()=>onComplete(task.id)}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Complete
            </button>

            <button
              onClick={()=>onDelete(task.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>

          </div>

        </div>

      ))}

    </div>

  )
}