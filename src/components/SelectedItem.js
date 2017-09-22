import React, { Component } from 'react';
import PropTypes from 'prop-types'; 
import { Dropdown } from 'semantic-ui-react';
import Styles from './Styles/SelectedItemStyle';
import LoadingIndicator from './LoadingIndicator';
export default class SelectedItem extends Component {
  render() {
    const { appIds } = this.props;
    if (!(appIds && appIds.length)) {
      return <LoadingIndicator />;
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

SelectedItem.propTypes = {
  appIds: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    })
  ),
  onChange: PropTypes.func,
  selectedSendingRate: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}