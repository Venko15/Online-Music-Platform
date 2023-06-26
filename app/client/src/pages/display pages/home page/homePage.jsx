import React from "react";
import DisplayPage from "../displayPage";
import axios from "axios";

class HomePage extends DisplayPage {
  state = {
    songs: [],
  };

  audioRef = React.createRef();

  componentDidMount() {
    this.fetchSongs();
  }

  fetchSongs = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/song");
      const songs = response.data;
      this.setState({ songs: songs });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  renderSongs() {
    return this.state.songs.map((song) => (
      <div key={song.id}>
        <h4>{song.title}</h4>
        <button onClick={() => this.handleStream(song.id)}>Play</button>
        <button onClick={() => this.handleOpenPlaylistDialog(song.id)}>
          Add to Playlist
        </button>
      </div>
    ));
  }

  render() {
    return (
      <div>
        <h2>Home Page</h2>
        {this.state.playlistDialogOpen && (
          <div>
            <h3>Choose Playlist</h3>
            <ul>
              {this.state.playlists.map((playlist) => (
                <li key={playlist.id}>
                  <button
                    onClick={() => this.handleSelectPlaylist(playlist.id)}
                  >
                    {playlist.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {this.renderSongs()}
        {this.renderAudio()}
      </div>
    );
  }
}

export default HomePage;
