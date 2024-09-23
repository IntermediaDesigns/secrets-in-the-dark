import React from 'react';

const EvidenceLog = ({ evidence }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2 text-center text-purple-700">Evidence Log</h2>
      {evidence.length === 0 ? (
        <li className="text-gray-600">No evidence collected yet.</li>
      ) : (
        <ul className="space-y-2">
          {evidence.map((item, index) => (
            <li key={index} className="bg-white p-2 rounded shadow">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EvidenceLog;