import React from 'react';

class Panel extends React.Component {
  // Common method for all panels
  commonMethod() {
    console.log('This is a common method for all panels');
  }

  // Common property for all panels
  commonProperty = 'Common Property';

  // Common render method for all panels
  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <p>{this.commonProperty}</p>
      </div>
    );
  }
}

export default Panel;
