import React, { Component } from 'react';
import axios from 'axios';
import Page from '../page';

class LoginPage extends Page {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handleLogin = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        username,
        password,
      });
      console.log('Login successful', response.data);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  render() {
    const { username, password } = this.state;

    return (
      <div>
        <h2>Login Page</h2>
        <form onSubmit={this.handleLogin}>
          <div>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" value={username} onChange={this.handleUsernameChange} />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={password} onChange={this.handlePasswordChange} />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginPage;
