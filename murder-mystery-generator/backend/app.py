# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from story_generator import generate_story
from ai_engine import process_player_action

app = Flask(__name__)
CORS(app)

@app.route('/new_game', methods=['POST'])
def new_game():
    story = generate_story()
    # In a real implementation, you'd save this to a database
    return jsonify({'game_id': 'unique_id', 'initial_state': story})

@app.route('/action', methods=['POST'])
def player_action():
    data = request.json
    game_id = data['gameId']
    action = data['action']
    # In a real implementation, you'd retrieve the current game state from a database
    current_state = {}  # Placeholder
    updated_state = process_player_action(current_state, action)
    # Save the updated state to the database
    return jsonify(updated_state)

if __name__ == '__main__':
    app.run(debug=True)
