import React, { Component, PropTypes } from 'react';
import {PieChart, Pie, Tooltip, Cell} from 'recharts';
import {
  Color
} from './Styles/SelectedMediaTypePerAppIDStyle';
import { Loader } from 'semantic-ui-react';

export default class SelectedMediaTypePerAppID extends Component {
  render() {
    const { mediaTypes } = this.props;
    if (!(mediaTypes)) {
      <Loader active inline='centered' />
    }
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    let cell = mediaTypes.map((mediaType, index) => <Cell fill={COLORS[index % COLORS.length]} />)
    return (
      <PieChart 
        width={800} 
        height={400}>
        <Pie 
          data={mediaTypes} 
          cx={500} 
          cy={200} 
          innerRadius={40} 
          outerRadius={80} 
          fill="#82ca9d" 
          label
          labelLine
        />
        {cell}
        <Tooltip/>
			</PieChart>
    );    
  }
}

SelectedMediaTypePerAppID.propTypes = {

}
