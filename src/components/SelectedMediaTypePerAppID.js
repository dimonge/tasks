import React, { Component } from 'react';
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
        {
          mediaTypes.map((mediaType, index) => <Cell fill={Color[index % Color.length]} />)
        }
        <Tooltip/>
			</PieChart>
    );    
  }
}
