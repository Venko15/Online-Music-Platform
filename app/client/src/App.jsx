import React from 'react';
import RegisterPage from './pages/auth/registrationPage';
import LoginPage from './pages/auth/loginPage';
import UserPanel from './UserPanel';
import CreatePlaylistsPage from './pages/creation pages/createPlaylist/createPlaylistPage';
import UploadPage from './pages/creation pages/createSong/createSongPage';
import SongListPage from './Home';
import ProfilePage from './pages/display pages/profile page/profilePage';
class App extends React.Component {

  renderPage() {
    const { pathname } = window.location;
    if(pathname === '/'){
      return <SongListPage/>
    }else if (pathname === '/register') {
      return <RegisterPage />;
    } else if (pathname === '/login') {
      return <LoginPage />;

    }  else if (pathname === '/profile') {
      return <ProfilePage />;

    } else if (pathname === '/makePlaylist') {
      return <CreatePlaylistsPage />;
    } else if(pathname === '/upload'){
      return <UploadPage/>
    }else{
      return <h2>Page not found</h2>;
    }
  }

  render() {
    return (
      <div>
        <h1>My App</h1>
        {this.renderPage()}
      </div>
    );
  }
}

export default App;
