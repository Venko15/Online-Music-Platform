import React from 'react';
import axios from 'axios';
import DisplayPage from "../displayPage"

const API_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEyLCJpYXQiOjE2ODc3ODQ2NTksImV4cCI6MTY4Nzc4NjQ1OX0.xP203-fFM0yySVZL1yefpT7vahZtUpGMD0GsHpgXiuU';

class ProfilePage extends DisplayPage {
  state = {
    profile: null,
    playlists: [],
    songs: [],
    currentSong: null,
    selectedPlaylistId: null,
    playlistDialogOpen: false,
    playlistSongs: [],
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
      console.log(songsResponse.data)
      const { data: profile } = profileResponse;
      const { data: playlists } = playlistsResponse;
      const { data: songs } = songsResponse;

      this.setState({ profile, playlists, songs });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  fetchPlaylistSongs = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/playlists/${id}`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });
      const playlistSongs = response.data;
      this.setState({ playlistSongs });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  render() {
    const {
      profile,
      playlists,
      songs,
      currentSong,
      playlistDialogOpen,
      selectedOption,
      selectedPlaylistId,
      playlistSongs,
    } = this.state;

    return (
      <div>
        <h2>Profile Page</h2>

        <div>
          <button onClick={() => this.setState({ selectedOption: 'Posted Songs' })}>
            Posted Songs
          </button>
          <button onClick={() => this.setState({ selectedOption: 'Playlists Made' })}>
            Playlists Made
          </button>
        </div>

        {selectedOption === 'Posted Songs' && (
          <div>
            <h3>Posted Songs</h3>
            <ul>
              {songs.map((song) => (
                <li key={song.id}>
                  {song.title}
                  <button onClick={() => this.handleStream(song.id)}>
                    {currentSong === song.id ? 'Playing' : 'Play'}
                  </button>
                  <button onClick={() => this.handleOpenPlaylistDialog(song.id)}>Add to Playlist</button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {selectedOption === 'Playlists Made' && (
          <div>
            <h3>Playlists Made</h3>
            <ul>
              {playlists.map((playlist) => (
                <li
                  key={playlist.id}
                >
                  
                  <button onClick={() => {this.setState({ selectedPlaylistId: playlist.id });this.fetchPlaylistSongs(playlist.id);}}>
                    {playlist.title}
                    </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {selectedOption === 'Playlists Made' && selectedPlaylistId && (
          <div>
            <h3>Songs in Playlist</h3>
            <ul>
              {playlistSongs.map((song) => (
                <li key={song.id}>{song.title}
                  <button onClick={() => this.handleStream(song.id)} disabled={currentSong === song.id}>
                    {currentSong === song.id ? 'Playing' : 'Play'}
                </button>
                </li>
                
              ))}

            </ul>
          </div>
        )}

        {super.renderAudio()}

        {super.render()}
      </div>
    );
  }
}

export default ProfilePage;
