# SteamShuffle

Simple web app allowing the user to pick a random game from they Steam library by using the official Steam API.


## TechStack

- **Frontend:** React, TypeScript, CSS3
- **Backend:** Node.js, Express.js
- **API:** Official Steam Web API

## Quick Start

### Prerequisites
- Installed [Node.js](https://nodejs.org/) (version 18+)
- Free [Steam API key](https://steamcommunity.com/dev/apikey)
- Public Steam Profile (and public game details in privacy settings)

### 1. Cloning
```bash
git clone https://github.com/Smarkk2367/SteamShuffle.git
cd steam-shuffle
```

### 2. Backend
```bash
cd backend
npm install
```

Create `.env` file in the `backend/` directory:
```env
PORT=5000
STEAM_API_KEY=*Your Steam API key*
```

Start the backend server:
```bash
npm run dev
```
*(Server will start on `http://localhost:5000`)*

### 3. Frontend
Open a new terminal window and go to the `frontend` directory:
```bash
cd frontend
npm install
npm run dev
```
*(App will start on `http://localhost:5173` or `http://localhost:3000`)*

