"use client";

import { useState } from "react";
import API from "../../services/api";
import { useRouter } from "next/navigation";

export default function Register(){

  const router = useRouter();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const register = async () => {

    try{

      await API.post("/auth/register",{
        name,
        email,
        password
      });

      alert("Registered successfully");

      router.push("/login");

    }catch{
      alert("Registration failed");
    }

  };

  return(

    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <div className="bg-white p-8 rounded shadow w-80">

        <h2 className="text-2xl font-bold mb-4">
          Register
        </h2>

        <input
          placeholder="Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className="border p-2 w-full mb-3"
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="border p-2 w-full mb-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="border p-2 w-full mb-4"
        />

        <button
          onClick={register}
          className="bg-green-500 text-white w-full py-2 rounded"
        >
          Register
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?
          <span
            onClick={()=>router.push("/login")}
            className="text-blue-500 cursor-pointer ml-1"
          >
            Login
          </span>
        </p>

      </div>

    </div>

  );
}