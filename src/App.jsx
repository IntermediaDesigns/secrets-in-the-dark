// frontend/src/App.jsx
import { useState, useEffect } from 'react'
import Game from './components/Game'
import { initializeAppwrite, createGame, performAction } from './services/appwrite'

function App() {
  const [gameId, setGameId] = useState(null)
  const [gameState, setGameState] = useState(null)

  useEffect(() => {
    initializeAppwrite()
    startNewGame()
  }, [])

  const startNewGame = async () => {
    const newGameId = await createGame()
    setGameId(newGameId)
  }

  const handleAction = async (action) => {
    const updatedState = await performAction(gameId, action)
    setGameState(updatedState)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-4">
        <h1 className="text-2xl font-bold">Interactive Murder Mystery</h1>
      </header>
      <main className="container mx-auto p-4">
        {gameId && <Game gameState={gameState} onAction={handleAction} />}
      </main>
    </div>
  )
}

export default App