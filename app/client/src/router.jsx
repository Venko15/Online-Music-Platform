import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routes from './routes';
import LoginPage from './auth/loginPage';
import RegistrationPage from './auth/registrationPage';

class Router extends React.Component {
  render() {
    return (
    <Router>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/login" element={<LoginPage/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </Layout>
      </Router>
    );
  }
}

export default Router;
