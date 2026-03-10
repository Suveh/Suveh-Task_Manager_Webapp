"use client";

interface Props{
  setStatus:(value:string)=>void
  setPriority:(value:string)=>void
  setSort:(value:string)=>void
}

export default function TaskFilters({setStatus,setPriority,setSort}:Props){

  return(

    <div className="flex gap-4 mb-6">

      <select
      onChange={(e)=>setStatus(e.target.value)}
      className="border p-2">

        <option value="">Status</option>
        <option value="TODO">TODO</option>
        <option value="IN_PROGRESS">IN_PROGRESS</option>
        <option value="DONE">DONE</option>

      </select>

      <select
      onChange={(e)=>setPriority(e.target.value)}
      className="border p-2">

        <option value="">Priority</option>
        <option value="LOW">LOW</option>
        <option value="MEDIUM">MEDIUM</option>
        <option value="HIGH">HIGH</option>

      </select>

      <select
      onChange={(e)=>setSort(e.target.value)}
      className="border p-2">

        <option value="">Sort</option>
        <option value="priority">Priority</option>
        <option value="dueDate">Due Date</option>

      </select>

    </div>

  )
}