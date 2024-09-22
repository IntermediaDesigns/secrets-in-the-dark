// frontend/src/components/EvidenceList.jsx
import PropTypes from 'prop-types';

const EvidenceList = ({ evidence }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-2">Evidence Log</h2>
      <ul className="list-disc pl-5 space-y-1">
        {evidence.map((item, index) => (
          <li key={index} className="text-sm">{item}</li>
        ))}
      </ul>
    </div>
  );
};

EvidenceList.propTypes = {
  evidence: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default EvidenceList;