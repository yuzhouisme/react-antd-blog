import React from 'react';
import Post from './Front/Post';

const App = React.createClass({
  render() {
    return (
      <div>
        {this.props.children || <Post location={location}/>}
      </div>
    );
  }
});

export default App;
