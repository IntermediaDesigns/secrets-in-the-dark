// frontend/src/components/Game.jsx
import PropTypes from 'prop-types';
import CharacterProfile from './CharacterProfile'
import EvidenceLog from './EvidenceList'
import InteractiveMap from './InteractiveMap'

function Game({ gameState, onAction }) {
  if (!gameState) return <div>Loading game...</div>

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2">
        <InteractiveMap locations={gameState.locations} onLocationSelect={(location) => onAction({ type: 'INVESTIGATE_LOCATION', location })} />
      </div>
      <div>
        <CharacterProfile characters={gameState.characters} onInterrogate={(character) => onAction({ type: 'INTERROGATE', character })} />
        <EvidenceLog evidence={gameState.evidence} />
      </div>
    </div>
  )
}

Game.propTypes = {
  gameState: PropTypes.shape({
    locations: PropTypes.array.isRequired,
    characters: PropTypes.array.isRequired,
    evidence: PropTypes.array.isRequired,
  }).isRequired,
  onAction: PropTypes.func.isRequired,
};

export default Game