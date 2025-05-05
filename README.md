# Cyber Duelists

A strategic card game where players battle using cyber-themed cards to reduce their opponent's health points.

## Features

- Strategic card-based gameplay
- Multiple card types (Attack, Defense, Reconnaissance, Support)
- Real-time health tracking
- Turn-based combat system
- Card targeting mechanics
- Graveyard system for destroyed cards

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/cyber-duelists.git
cd cyber-duelists
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Game Rules

- Each player starts with 1000 health points (Stealth Points for player, System Integrity for enemy)
- Players draw cards at the start of their turn
- Attack cards can target enemy cards or deal direct damage
- Defense cards reduce incoming damage
- Destroyed cards go to the graveyard
- The game ends when either player's health reaches 0

## Technologies Used

- Vue.js 3
- Pinia for state management
- Vite for build tooling
- CSS for styling

## License

This project is licensed under the MIT License - see the LICENSE file for details.
