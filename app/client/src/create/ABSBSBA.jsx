/*
import React from 'react';
import axios from 'axios';

class CreateSongPage extends CreationPage {
    constructor(props) {
      super(props);
      this.state = {
        file: null,
        fileName: '',
      };
    }
  
    handleFileChange = (event) => {
      const selectedFile = event.target.files[0];
      this.setState({ file: selectedFile });
    };
  
    handleNameChange = (event) => {
      const name = event.target.value;
      this.setState({ fileName: name });
    };
  
    handleSubmit = async (url) => {
      const { file, fileName } = this.state;
      
      // Create FormData object to send the file and other data
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', fileName);
  
      try {
        // Make the POST request using Axios
        const response = await axios.post('http://localhost:3000/api/song/createSong', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTY4NzQzOTkzMywiZXhwIjoxNjg3NDQxNzMzfQ.5XqPbeDwDIHl6aEEa_IvWzyNud7Dz0c0_joeKb3zyp4',
          },
        });
  
        // Handle the response data if needed
        //console.log(response.data);
      } catch (error) {
        // Handle the error if the request fails
        console.error('Error:', error);
      }
    };
  
    render() {
      const { fileName } = this.state;
  
      return (
        <div>
          <input type="file" onChange={this.handleFileChange} />
          <input type="text" value={fileName} onChange={this.handleNameChange} placeholder="Enter name" />
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
      );
    }
  }

// Assuming you have a parent component that renders the CreateSongPage component
class UploadPage extends React.Component {
    handleSubmit = (file, fileName) => {
      // Handle the file and fileName data
      console.log(file, fileName);
    };
  
    render() {
      return (
        <div>
          {/* Pass the handleSubmit function as onSubmit prop */ /*}
          <CreateSongPage onSubmit={this.handleSubmit} />
        </div>
      );
    }
  }
  
export default UploadPage;

*/