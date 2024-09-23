"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "../lib/auth";
import { useTheme } from "../context/ThemeContext";

const Navbar = ({ user }) => {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className={`theme-bg-primary theme-text w-full shadow-md transition-colors duration-300 ${theme}`} >
      <div className="container mx-auto flex justify-between items-center py-2 px-6">
        <Link href="/" className="theme-text text-2xl font-bold">
          <img src="/secret-logo.png" alt="logo" className="w-20 h-auto hover:transform hover:scale-105" />
        </Link>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full theme-bg-secondary theme-text-secondary hover:theme-bg-hover transform hover:scale-105"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          {user ? (
            <div className="flex items-center gap-4">
              <span className="theme-text mr-4">Welcome, {user.name}</span>
              <Link href='/game' className="theme-bg-accent theme-text-accent hover:theme-bg-accent-hover font-semibold text-lg py-2 px-4 rounded transition-colors duration-300">
                Play Game
              </Link>
              <button
                onClick={handleLogout}
                className="theme-bg-danger theme-text-danger text-red-700 hover:text-red-500 hover:theme-bg-danger-hover font-bold py-2 px-4 rounded transition-colors duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <div>
              <Link
                href="/login"
                className="theme-text mr-4 hover:opacity-80 transition-opacity duration-300"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="theme-bg-accent theme-text-accent hover:theme-bg-accent-hover font-bold py-2 px-4 rounded transition-colors duration-300"
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
