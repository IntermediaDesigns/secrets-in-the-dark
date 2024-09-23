import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PlayerActions = ({ onAction }) => {
  const [action, setAction] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (action.trim().length < 3) {
      setError('Action must be at least 3 characters long');
      return;
    }
    if (action.trim().length > 100) {
      setError('Action must be no more than 100 characters long');
      return;
    }
    setError('');
    onAction(action);
    setAction('');
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2 text-purple-700 text-center">Player Actions</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          value={action}
          onChange={(e) => setAction(e.target.value)}
          placeholder="Enter your action..."
          className="w-full px-2 py-1 border rounded text-gray-700"
        />
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 text-sm"
          >
            {error}
          </motion.p>
        )}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        >
          Submit Action
        </motion.button>
      </form>
    </div>
  );
};

export default PlayerActions;