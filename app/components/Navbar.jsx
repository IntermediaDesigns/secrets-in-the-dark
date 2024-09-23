"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "../lib/auth";

const Navbar = ({ user }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="bg-transparent fixed w-full">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">
          <img src="/secret-logo.png" alt="logo" className="w-28 h-auto pt-2" />
        </Link>
        <div className="mt-2">
          {user ? (
            <div className="flex items-center gap-8">
              <span className="text-white mr-4">Welcome, {user.name}</span>
              <button>
                <Link href='/game' className="bg-purple-500 hover:bg-purple-700 text-white font-semibold text-lg py-2.5 px-4 rounded">
                  Play Game
                </Link>
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </div>
          ) : (
            <div>
              <Link
                href="/login"
                className="text-white mr-4 hover:text-gray-300"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
