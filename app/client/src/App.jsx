import React from 'react';
import RegisterPage from './auth/registrationPage';
import LoginPage from './auth/loginPage';
import UserPanel from './UserPanel';
import CreatePlaylistsPage from './create/createPlaylistPage';
import CreateSongPage from './create/createSongPage';
import UploadPage from './create/createSongPage';
import SongListPage from './Home';
class App extends React.Component {

  renderPage() {
    const { pathname } = window.location;
    if(pathname === '/'){
      return <SongListPage/>
    }else if (pathname === '/register') {
      return <RegisterPage />;
    } else if (pathname === '/login') {
      return <LoginPage />;
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
