'use client';
import React from "react";
import { color, motion } from "framer-motion";
import Link from "next/link";
import {
  FaMagnifyingGlass,
  FaUserSecret,
  FaClipboardList,
} from "react-icons/fa6";

const FeatureCard = ({ icon, title, description }) => (
  <motion.div
    className="bg-white p-6 rounded-lg shadow-lg"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="flex gap-12">
    <div className="text-4xl mb-4 text-purple-600">{icon}</div>
    <h3 className="text-xl font-bold mb-2 text-black">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const LandingPage = () => {
return (
    <div
        className="h-[90vh] bg-cover bg-center text-white pt-20"
        style={{ backgroundImage: "url('/bkg.png')" }}
    >
        <div className="container mx-auto px-4 py-16">
            <motion.h1
                className="text-7xl font-bold text-center mb-4 font-gilda text-purple-600"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Secrets in the Dark
            </motion.h1>

            <motion.h2
                className="text-white text-3xl font-semibold text-center mb-8 font-sans"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Interactive Murder Mystery Game
            </motion.h2>

            <motion.p
                className="text-2xl text-center mb-12 tracking-wider font-sans"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                Become the detective, solve the crime, uncover the truth!
            </motion.p>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
            >
                <FeatureCard
                    icon={<FaMagnifyingGlass />}
                    title="Investigate Scenes"
                    description="Explore multiple locations, gather clues, and piece together the mystery."
                />
                <FeatureCard
                    icon={<FaUserSecret />}
                    title="Interview Suspects"
                    description="Question a cast of unique characters, each with their own motives and secrets."
                />
                <FeatureCard
                    icon={<FaClipboardList />}
                    title="Track Evidence"
                    description="Collect and analyze evidence to build your case and identify the culprit."
                />
            </motion.div>

            <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
            >
                <Link href="/game" passHref>
                    <motion.button
                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full text-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Start Your Investigation
                    </motion.button>
                </Link>
            </motion.div>
        </div>

        <motion.div
            className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
        />
    </div>
);
};

export default LandingPage;