import React, { Component } from 'react';
import axios from 'axios';

class CreatePlaylistsPage extends CreationPage {
  constructor(props) {
    super(props);
    this.state = {
      playlistName: '',
    };
  }

  handlePlaylistNameChange = (event) => {
    this.setState({ playlistName: event.target.value });
  };

  handlePlaylistCreation = async (event) => {
    event.preventDefault();
    const { playlistName } = this.state;
    try {
      const response = await axios.post('http://localhost:3000/api/playlists/createPlaylist', {
        name: playlistName,
      }, {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTY4NzQzOTQwNCwiZXhwIjoxNjg3NDQxMjA0fQ.LU2_LNwOR9LaL1IycscmXfhOj5N-X0VNU_jZumJDKtY',
        },
      });

      console.log('Playlist created', response.data);
      // Handle success or redirect
    } catch (error) {
      console.error('Failed to create playlist', error);
      // Handle error
    }
  };

  render() {
    const { playlistName } = this.state;

    return (
      <div>
        <h2>Create Playlists Page</h2>
        <form onSubmit={this.handlePlaylistCreation}>
          <div>
            <label htmlFor="playlistName">Playlist Name:</label>
            <input type="text" id="playlistName" value={playlistName} onChange={this.handlePlaylistNameChange} />
          </div>
          {/* Add other form fields */}
          <button type="submit">Create Playlist</button>
        </form>
      </div>
    );
  }
}

export default CreatePlaylistsPage;
