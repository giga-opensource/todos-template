import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='body'>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.propTypes = { children: React.PropTypes.node };
