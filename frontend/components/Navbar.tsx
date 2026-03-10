"use client";

import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import { GiChecklist } from "react-icons/gi";

export default function Navbar() {
    const router = useRouter();

    const logout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50 backdrop-blur-sm bg-white/90">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo/Brand */}
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
                            <GiChecklist className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
                            TaskFlow
                        </h1>
                    </div>

                    {/* Logout Button */}
                    <button
                        onClick={logout}
                        className="group relative inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-rose-600 transition-all duration-200 rounded-lg hover:bg-rose-50"
                    >
                        <FiLogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </div>
        </nav>
    );
}