import React from "react";
import { motion } from "framer-motion";

const EvidenceLog = ({ evidence, newEvidence }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2 text-purple-700 text-center">
        Evidence Log
      </h2>
      {evidence.length === 0 ? (
        <p className="text-gray-600">No evidence collected yet.</p>
      ) : (
        <ul className="space-y-2">
          {evidence.map((item, index) => (
            <motion.li
              key={index}
              className={`bg-white p-2 rounded shadow ${
                newEvidence && newEvidence.item === item.item
                  ? "border-2 border-yellow-500"
                  : ""
              }`}
              initial={
                newEvidence && newEvidence.item === item.item
                  ? { scale: 0.9 }
                  : {}
              }
              animate={
                newEvidence && newEvidence.item === item.item
                  ? { scale: 1 }
                  : {}
              }
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-semibold">{item.item}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EvidenceLog;
