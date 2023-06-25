import React from 'react';
import axios from 'axios';
import DisplayPage from "../displayPage"

const API_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEyLCJpYXQiOjE2ODc3MzA1ODgsImV4cCI6MTY4NzczMjM4OH0.rPjgZA-24Yw0Duyoc9y9mcijkeO-Nb4T8wivnSeWlo8';

class ProfilePage extends DisplayPage {
  state = {
    profile: null,
    playlists: [],
    songs: [],
    currentSong: null,
    selectedPlaylistId: null,
    playlistDialogOpen: false,
  };

  audioRef = React.createRef();

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const [profileResponse, playlistsResponse, songsResponse] = await Promise.all([
        axios.get('http://localhost:3000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        }),
        axios.get('http://localhost:3000/api/users/playlists', {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        }),
        axios.get('http://localhost:3000/api/users/songs', {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        }),
      ]);

      const { data: profile } = profileResponse;
      const { data: playlists } = playlistsResponse;
      const { data: songs } = songsResponse;

      this.setState({ profile, playlists, songs });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  handleStream = (id) => {
    const audioPlayer = this.audioRef.current;
    audioPlayer.src = `http://localhost:3000/api/song/${id}/stream`;
    audioPlayer.play();
    this.setState({ currentSong: id });
  };

  handleOpenPlaylistDialog = (id) => {
    this.setState({ playlistDialogOpen: true, currentSong: id });
  };

  handleClosePlaylistDialog = () => {
    this.setState({ playlistDialogOpen: false });
  };

  handleSelectPlaylist = (playlistId) => {
    this.setState({ selectedPlaylistId: playlistId });
    this.handleClosePlaylistDialog();
    // Call the method to add the song to the playlist
    this.handleAddToPlaylist();
  };

  handleAddToPlaylist = async () => {
    const { currentSong, selectedPlaylistId } = this.state;

    try {
      await axios.post(`http://localhost:3000/api/playlists/${selectedPlaylistId}/songs/${currentSong}`, null, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });

      // Perform any additional logic or state updates as needed

      // Example: Refresh the data after successful addition
      await this.fetchData();
    } catch (error) {
      console.error('Error:', error);
      // Handle error scenarios
    }
  };

  render() {
    const { profile, playlists, songs, currentSong, playlistDialogOpen } = this.state;

    return (
      <div>
        <h2>Profile Page</h2>
        <h3>Playlists</h3>
        <ul>
          {playlists.map((playlist) => (
            <li key={playlist.id}>{playlist.title}</li>
          ))}
        </ul>

        <h3>Songs</h3>
        <ul>
          {songs.map((song) => (
            <li key={song.id}>
              {song.title}
              <button onClick={() => this.handleStream(song.id)} disabled={currentSong === song.id}>
                {currentSong === song.id ? 'Playing' : 'Play'}
              </button>
              <button onClick={() => this.handleOpenPlaylistDialog(song.id)}>Add to Playlist</button>
            </li>
          ))}
        </ul>

        <audio ref={this.audioRef} controls>
          {songs.map((song) => (
            <source
              key={song.id}
              src={song.audioUrl}
              type="audio/mp3"
              data-testid={`audio-source-${song.id}`}
            />
          ))}
          Your browser does not support the audio element.
        </audio>

        {playlistDialogOpen && (
          <div>
            <h3>Choose Playlist</h3>
            <ul>
              {playlists.map((playlist) => (
                <li key={playlist.id} onClick={() => this.handleSelectPlaylist(playlist.id)}>
                  {playlist.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default ProfilePage;
