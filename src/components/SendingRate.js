import React, { Component } from 'react';
import { LineChart, Line, YAxis, Tooltip } from 'recharts';
import {
  sendingRateKey
} from '../config/metricsConfig';
export default class SendingRate extends Component {  
  render() {
    return (
      <div>
        <LineChart width={800} height={300} data={this.props.sendingRates}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}>    
          <YAxis/>
          <Tooltip/>
          <Line type="monotone" dataKey={sendingRateKey} stroke="#82ca9d" />          
        </LineChart>
      </div>
    )
    
  }
}
