import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectedMediaTypePerAppID from '../components/SelectedMediaTypePerAppID';

class MediaTypePerAppID extends Component {
  render() {
    return (
      <div>
        <h2>Media Types Per AppIDs</h2>
        <SelectedMediaTypePerAppID />
      </div>
    );
  }
}

export default connect()(MediaTypePerAppID);