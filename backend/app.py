from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

# Path to the cards JSON file
CARDS_FILE = 'cards.json'

@app.route("/api/test")
def test():
    return jsonify({"message":"Flask works"})

@app.route("/api/cards")
def get_cards():
    try:
        # Check if the cards file exists
        if not os.path.exists(CARDS_FILE):
            return jsonify({"error": "Cards file not found"}), 404
        
        # Read and parse the JSON file
        with open(CARDS_FILE, 'r') as file:
            cards_data = json.load(file)
        
        return jsonify(cards_data)
    except json.JSONDecodeError:
        return jsonify({"error": "Invalid JSON format in cards file"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
