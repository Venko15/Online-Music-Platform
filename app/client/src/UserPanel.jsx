import React from 'react';
import axios from 'axios';
import Panel from './Panel'

class Navbar extends React.Component {

    render() {
      const { playlists, songs } = this.props;
  
      return (
        <div>
          <h3>Navbar</h3>
          <ul>
            <li>
              <h4>Playlists</h4>
              <ul>
                {playlists.map((playlist) => (
                  <li key={playlist.id}>{playlist.name}</li>
                ))}
              </ul>
            </li>
            <li>
              <h4>Songs</h4>
              <ul>
                {songs.map((song) => (
                  <li key={song.id}>{song.title}</li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      );
    }
  }
  
  class UserPanel extends Panel {
    state = {
      userData: null,
    };
  
    componentDidMount() {
      this.fetchUserData();
    }
  
    fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users/profile', {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTY4NzQzNzIyMSwiZXhwIjoxNjg3NDM5MDIxfQ.mzUsvexYSF9J-SO_7cfqTYZoYPw2myTCTUWWLwAoYT4`,
          },
        });
        console.log(response);
        this.setState({ userData: response.data });
      } catch (error) {
        console.error(error);
      }
    };
  
    render() {
      const { userData } = this.state;
  
      if (!userData) {
        return <p>Loading user data...</p>;
      }
  
      const { playlists, songs } = userData;
  
      return (
        <div>
          <h2>User Panel</h2>
          <Navbar playlists={playlists} songs={songs} />
          {/* Display other user data */}
        </div>
      );
    }
  }
  
  export default UserPanel;