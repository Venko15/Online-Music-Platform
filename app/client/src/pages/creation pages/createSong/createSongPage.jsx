import React from 'react';
import CreationPage from '../creationPage';
import axios from 'axios';

class CreateSongPage extends CreationPage {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      name : ''
    };
    
  }

  handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    this.setState({ file: selectedFile });
  };

  handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const { file } = this.state;
    const name = this.state.name;
    console.log(name);
    // Create FormData object to send the file and other data
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);

    try {
      // Make the POST request using Axios
      const response = await axios.post('http://localhost:3000/api/song/createSong', {name:name, file:file}, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEyLCJpYXQiOjE2ODc3MjUwOTUsImV4cCI6MTY4NzcyNjg5NX0.Vs5JVwxSgjKkeR7mZVdPjhXbydMoWTNdY9EReOFagjI',
        },
      });

      // Handle the response data if needed
      // console.log(response.data);
    } catch (error) {
      // Handle the error if the request fails
      console.error('Error:', error);
    }
  };

  render() {
    return (
      <div>
        <h2>Create Song Page</h2>
        <form onSubmit={this.handleSubmit}>
          {super.render()} {/* Render the content of CreationPage */}
          {/* Additional form fields and logic */}
          <div>
            <label htmlFor="file">Song File:</label>
            <input type="file" id="file" onChange={this.handleFileChange} />
          </div>
          <button type="submit">Submit Song</button>
        </form>
      </div>
    );
  }
}

export default CreateSongPage;
