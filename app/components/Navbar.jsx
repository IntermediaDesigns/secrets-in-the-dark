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
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">
          Murder Mystery Game
        </Link>
        <div>
          {user ? (
            <div className="flex items-center">
              <span className="text-white mr-4">Welcome, {user.name}</span>
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
