"use client";

import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { getCurrentUser } from "../lib/auth";

const MainContent = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser); // This might be null if the user is not authenticated
      } catch (error) {
        console.error("Error loading user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <iframe
          src="https://lottie.host/embed/df38b62f-5fac-4390-96d5-7c21dc4932b2/toBniWeTO7.lottie"
          className="w-96 h-96"
        ></iframe>
      </div>
    );
  }

  return (
    <>
      <Navbar user={user} />
      <main className="container mx-auto mt-4">{children}</main>
    </>
  );
};

export default MainContent;
