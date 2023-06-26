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
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEyLCJpYXQiOjE2ODc3Nzg3ODUsImV4cCI6MTY4Nzc4MDU4NX0.ht8RHs9bLa8OrBtQKDL5AVKvNfpnvvcnV3SiOW3F65k'
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
          <button type="submit">Create Playlist</button>
        </form>
      </div>
    );
  }
}

export default CreatePlaylistsPage;
