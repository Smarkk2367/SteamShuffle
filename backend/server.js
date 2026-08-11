import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

console.log('API key:', process.env.STEAM_API_KEY);

// User's game list
app.get('/api/games/:steamId', async (req, res) => {
    const { steamId } = req.params;
    const apiKey = process.env.STEAM_API_KEY.trim();

    if (!apiKey){
        return res.status(500).json({error: 'missing API key'});
    }

    try {
        const steamUrl = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${apiKey}&steamid=${steamId}&format=json&include_appinfo=1&include_played_free_games=1`;

        console.log('Sending request to Steam');

        const response = await fetch(steamUrl);

        if (!response.ok){
            return res.status(response.status).json({error: 'Steam API error'});
        }

        const data = await response.json();

        if (!data.response || !data.response.games){
            return res.status(404).json({ error: 'Games not found. Make sure your Steam ID is correct and your library public.'})
        }

        res.json({
            game_count: data.response.game_count,
            games: data.response.games
        })
    } catch (error){
        console.error('Server error: ', error);
        res.status(500).json({error: 'An error has occured while downloading data.'});
    }
})

app.listen(PORT, () => {
    console.log(`Server is working on http://localhost/${PORT}`);
});