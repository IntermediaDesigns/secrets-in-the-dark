import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const tutorialSteps = [
  {
    title: "Welcome to Secrets of the Dark Murder Mystery Game!",
    content: "You're a detective trying to solve a murder. Explore locations, interview suspects, and collect evidence to crack the case!"
  },
  {
    title: "Exploring Locations",
    content: "Click on different locations on the map to move around and investigate. New locations will unlock as you progress."
  },
  {
    title: "Interviewing Suspects",
    content: "Talk to suspects by typing actions like 'Interview John Doe'. Pay attention to their alibis and motives!"
  },
  {
    title: "Collecting Evidence",
    content: "Look for clues in each location. Type actions like 'Examine the bookshelf' to find evidence."
  },
  {
    title: "Solving the Mystery",
    content: "Once you've gathered enough information, you can try to solve the case. Good luck, detective!"
  }
];

const Tutorial = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div className="bg-white p-6 rounded-lg max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-purple-600 text-center">{tutorialSteps[currentStep].title}</h2>
            <p className='text-gray-800 text-center'>{tutorialSteps[currentStep].content}</p>
          </motion.div>
        </AnimatePresence>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={nextStep}
          className="mt-6 bg-purple-500 text-white px-4 py-2 rounded flex mx-auto hover:bg-purple-600"
        >
          {currentStep < tutorialSteps.length - 1 ? "Next" : "Start Game"}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Tutorial;