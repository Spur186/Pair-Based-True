import React, { useState } from "react";
import "./App.css";

function App() {
    const [artist, setArtist] = useState("");
    const [song, setSong] = useState("");
    const [lyrics, setLyrics] = useState("");
    const [error, setError] = useState("");

    // Function to fetch lyrics
    const fetchLyrics = async () => {
        try {
            const response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`);
            const data = await response.json();
            if (data.lyrics) {
                setLyrics(data.lyrics);
                setError("");
            } else {
                setLyrics("");
                setError("Lyrics not found. Please try again.");
            }
        } catch (err) {
            setLyrics("");
            setError("Error fetching lyrics. Please check your network or try again later.");
        }
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (artist && song) {
            fetchLyrics();
        } else {
            setError("Please enter both artist and song name.");
        }
    };

    return (
        <div className="app">
            <h1>Lyrics Finder</h1>
            <form onSubmit={handleSubmit} className="lyrics-form">
                <input
                    type="text"
                    placeholder="Artist Name"
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Song Title"
                    value={song}
                    onChange={(e) => setSong(e.target.value)}
                    required
                />
                <button type="submit">Get Lyrics</button>
            </form>
            <div className="lyrics-display">
                {error && <p className="error">{error}</p>}
                {lyrics && <pre>{lyrics}</pre>}
            </div>
        </div>
    );
}

export default App;
