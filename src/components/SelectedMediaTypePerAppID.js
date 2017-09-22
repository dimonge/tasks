import React, { Component } from 'react';
import PropTypes from 'prop-types'; 
import {PieChart, Pie, Tooltip, Cell, Legend} from 'recharts';
import {
  Colors
} from './Styles/SelectedMediaTypePerAppIDStyle';
import LoadingIndicator from './LoadingIndicator';
export default class SelectedMediaTypePerAppID extends Component {
  render() {
    const { mediaTypes } = this.props;
    console.log(mediaTypes)
    if (!(mediaTypes.length)) {
      return <LoadingIndicator />
    }
    let cell = mediaTypes.map((mediaType, index) => <Cell key={`cell-${index}`} fill={Colors[index]} />)
    return (
      <PieChart 
        width={800} 
        height={400}>
        <Pie 
          dataKey='value'
          data={mediaTypes} 
          cx={500} 
          cy={200} 
          innerRadius={40} 
          outerRadius={80} 
          fill="#82ca9d" 
          label
          labelLine
        >
        {cell}
        </Pie>
        <Legend verticalAlign="top" height={36}/>
        <Tooltip />      
			</PieChart>
    );    
  }
}

SelectedMediaTypePerAppID.propTypes = {
  mediaTypes: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    })
  ),
};
