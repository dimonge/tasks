import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import Styles from './Styles/SelectedItemStyle';
import { Loader } from 'semantic-ui-react';

export default class SelectedItem extends Component {
  render() {
    const { appIds } = this.props;
    if (!(appIds && appIds.length)) {
      return <Loader active inline='centered' />
    }
    return <Dropdown
      style={Styles.dropdown}
      options={appIds} 
      onChange={this.props.onChange}
      scrolling
      defaultValue={this.props.selectedSendingRate || appIds[0].value}
    />
  }
}