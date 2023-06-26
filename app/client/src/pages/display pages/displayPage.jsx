import React from "react";
import Page from "../page";
import axios from "axios";

const API_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEyLCJpYXQiOjE2ODc3ODA3MTIsImV4cCI6MTY4Nzc4MjUxMn0.MfdgeXk5D3SetNSLhaFvZkCec3ibSThAHXx9vrJFRps';
class DisplayPage extends Page{

    state = {
          playlists: [],
          songs: [],
          currentSong: null,
          selectedPlaylistId: null,
          playlistDialogOpen: false,
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
        this.setState({ selectedPlaylistId: playlistId }, () => {
          // Call the method to add the song to the playlist
          this.handleClosePlaylistDialog();
          this.handleAddToPlaylist();
        });
      };


      renderAudio(){
        return(        
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            backgroundColor: "#f1f1f1",
            padding: "10px",
          }}
        >
          <audio ref={this.audioRef} controls style={{ width: '100%' }}/>
        </div>);
      }
      render() {
        return(            
        <div>
            {this.state.playlistDialogOpen && (
            <div>
              <h3>Choose Playlist</h3>
              <ul>
                {this.state.playlists.map((playlist) => (
                  <li key={playlist.id}>
                    <button onClick={() => {this.handleSelectPlaylist( playlist.id )}}>
                    {playlist.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          
          )}  
          </div>

        );
      }
      
}


export default DisplayPage;