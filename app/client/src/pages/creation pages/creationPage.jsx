import React from 'react';
import Page from '../page';

class CreationPage extends Page {
  constructor(props) {
    super(props);
    this.state = {
      name: props.initName,
    };
  }

  handleNameChange = (event) => {
    const name = event.target.value;
    this.setState({ name: name });
  };

  // Getter method to access the `name` state
  getName() {
    return this.state.name;
  }

  render() {
    return (
      <div>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" value={this.state.name} onChange={this.handleNameChange} />
        </div>
      </div>
    );
  }
}

export default CreationPage;
