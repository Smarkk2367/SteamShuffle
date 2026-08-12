import { useState } from 'react';
import './App.css';

interface Game {
  appid: number;
  name: string;
  img_icon_url?: string;
}

function App(){
  const [steamId, setSteamId] = useState('');
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [loading, setloading] = useState(false)
  const [error, setError] = useState<string | null>(null);

  const handleFetchGames = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!steamId.trim()) return;

    setloading(true);
    setError(null);
    setSelectedGame(null);

    try {
      const response = await fetch(`http://localhost:5000/api/games/${steamId.trim()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error loading games.");
      }

      setGames(data.games);
      drawRandomGame(data.games);

    } catch(err) {
      if (err instanceof Error){
        setError(err.message);
      } else {
        setError('An unexpected error has occurred');
      }
    } finally {
      setloading(false);
    }
  };

  const drawRandomGame = (gameList: Game[] = games) => {
    if (!gameList || gameList.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * gameList.length);
    setSelectedGame(gameList[randomIndex]);
  };

  return (
    <div className='app-container'>
      <h1>SteamShuffle</h1>

      <form onSubmit={handleFetchGames} className='search-form'>
        <input type="text" placeholder="enter SteamID64" value={steamId} onChange={(e) => setSteamId(e.target.value)} />
        <button type="submit" disabled={loading}>
          {loading ? 'shuffling...' : 'shuffle'}
        </button>
      </form>

      {error && <div className="error-box">{error}</div>}

      {selectedGame && (
        <div className='game-card'>
          <h2>{selectedGame.name}</h2>
          <img src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${selectedGame.appid}/header.jpg`} alt={selectedGame.name} />
          <button className="reroll-btn" onClick={() => drawRandomGame()}>Shuffle again</button>
        </div>
      )}
    </div>
  )
}

export default(App);