import RegisterPage from './auth/registrationPage';
import LoginPage from './auth/loginPage';
import ProfilePage from './profile/profilePage';
import CreatePlaylistsPage from './create/createPlaylistPage';

const routes = [
  {
    path: '/register',
    component: RegisterPage,
  },
  {
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/profile',
    component: ProfilePage,
  },
  {
    path:'/makePlaylist',
    component: CreatePlaylistsPage
  },
];

export default routes;
