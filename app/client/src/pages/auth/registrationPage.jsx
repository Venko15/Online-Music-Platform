import React, { Component } from 'react';
import axios from 'axios';

class RegistrationPage extends Component {
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

  handleRegistration = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', {
        username,
        password,
      });
      console.log('Registration successful', response.data);
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  render() {
    const { username, password } = this.state;

    return (
      <div>
        <h2>Registration Page</h2>
        <form onSubmit={this.handleRegistration}>
          <div>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" value={username} onChange={this.handleUsernameChange} />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={password} onChange={this.handlePasswordChange} />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}

export default RegistrationPage;
