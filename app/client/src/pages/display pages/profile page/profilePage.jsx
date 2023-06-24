import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import UserInfo from './UserInfo';

import UserSongs from './UserSongs';

class ProfilePage extends DisplayPage {


    state = {
        playlists: [],
        songs: []
      };
    
      componentDidMount() {
        this.fetchInfo();
      }


  render() {
    return (
      <div>
        <h2>Profile Page</h2>
        <nav>
          
        </nav>

      </div>
    );
  }
}

export default ProfilePage;
