import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';

export default class SelectedPerAppID extends Component {
  render() {
    if (!this.props.appIds.length) {
      return <div>loading...</div>
    }
    return <Dropdown
      style={{margin: '7px 80px'}}
      options={this.props.appIds} 
      onChange={this.props.onChange}
      defaultValue={this.props.selectedSendingRate || this.props.appIds[0].value}
    />
  }
}