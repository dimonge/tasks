import React, { Component } from 'react';
import {PieChart, Pie, Legend, Tooltip} from 'recharts';

export default class SelectedMediaTypePerAppID extends Component {
  render() {
    return (
      <PieChart width={800} height={400}>
        <Pie data={this.props.mediaTypes} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" label='name'/>
        <Tooltip/>
			</PieChart>
    );    
  }
}
