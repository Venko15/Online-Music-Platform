import React from 'react';
import axios from 'axios';
import CreationPage from '../creationPage';

class CreatePlaylistsPage extends CreationPage {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      name : ''
    };
    
  }
  handlePlaylistCreation = async (event) => {
    event.preventDefault();
    const { name } = this.state;

    try {
      const response = await axios.post('http://localhost:3000/api/playlists/createPlaylist', {
        name: name,
      }, {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEyLCJpYXQiOjE2ODc3MjUwOTUsImV4cCI6MTY4NzcyNjg5NX0.Vs5JVwxSgjKkeR7mZVdPjhXbydMoWTNdY9EReOFagjI'
      }});

      console.log('Playlist created', response.data);
      // Handle success or redirect
    } catch (error) {
      console.error('Failed to create playlist', error);
      // Handle error
    }
  };

  render() {
    return (
      <div>
        <h2>Create Playlists Page</h2>
        <form onSubmit={this.handlePlaylistCreation}>
          {super.render()}
          {/* Additional form fields and logic */}
          <button type="submit">Create Playlist</button>
        </form>
      </div>
    );
  }
}

export default CreatePlaylistsPage;
