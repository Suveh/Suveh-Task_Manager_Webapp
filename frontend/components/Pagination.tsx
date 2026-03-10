"use client";

interface Props{
  page:number
  setPage:(value:number)=>void
}

export default function Pagination({page,setPage}:Props){

  return(

    <div className="flex gap-4 mt-10">

      <button
      onClick={()=>setPage(Math.max(page-1,0))}
      className="bg-gray-400 text-white px-4 py-2 rounded">
      Previous
      </button>

      <span className="font-semibold">
      Page {page+1}
      </span>

      <button
      onClick={()=>setPage(page+1)}
      className="bg-blue-500 text-white px-4 py-2 rounded">
      Next
      </button>

    </div>

  )
}