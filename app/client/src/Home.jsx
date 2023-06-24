import React from 'react';
import axios from 'axios';

class SongListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      currentSong: null,
    };
    this.audioRef = React.createRef();
  }

  componentDidMount() {
    this.fetchSongs();
  }

  fetchSongs = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/song');
      const songs = response.data;
      this.setState({ songs });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  handleStream = (id) => {
    const audioPlayer = this.audioRef.current;

    // Load and play the selected song
    audioPlayer.src = `http://localhost:3000/api/song/${id}/stream`;
    audioPlayer.play();
    this.setState({ currentSong: id });
    
  };

  render() {
    const { songs } = this.state;

    return (
      <div>
        <h1>Song List</h1>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {songs.map((song) => (
            <li key={song.id} style={{ marginBottom: '10px' }}>
              {song.title}
              <button
                style={{ marginLeft: '10px', padding: '5px 10px' }}
                onClick={() => this.handleStream(song.id)}
              >
                {this.state.currentSong === song.id ? 'Pause' : 'Stream'}
              </button>
            </li>
          ))}
        </ul>
        <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%' }}>
          <audio id="audioPlayer" ref={this.audioRef} controls style={{ width: '100%' }}>
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    );
  }
}

export default SongListPage;
