// @flow weak

import React, {
  Component
}                     from 'react';
import PropTypes      from 'prop-types';
import Chart          from 'chart.js';
var Spinner = require('react-spinkit');
import {
  earningGraphMockData
}                     from '../../models';
import WorkProgressPanel  from '../../components/workProgress/workProgressPanel/WorkProgressPanel';
import fetchStatsGraphDataIfNeeded  from '../../redux/modules/actions';
import Panel          from '../panel/Panel';


class StatsGraph extends Component {

  constructor(props) {
    super(props);
    this.state        = { selectedLocation: props.selectedLocation } ;
  }



  componentDidMount() {
    const cardData = this.props.data[this.props.name];
    const { isFetching, requested_venue_id, venue_id } = cardData;
    this.drawChart({
      labels: cardData.labels,
      datasets: cardData.datasets
    });    
  }

  componentWillReceiveProps(newProps) {
    const cardData = this.props.data[this.props.name];
    const { isFetching, requested_venue_id, venue_id } = cardData;
    if(!isFetching){
      if(requested_venue_id != venue_id){
        console.log("StatsGraph - Location changed. Request data again");
        this.props.reloadData(requested_venue_id,this.props.name);
      }      
    }
    const { labels, datasets } = this.props;
    this.drawChart({
      labels: cardData.labels,
      datasets: cardData.datasets
    });    
  }

  render() {
    const cardData = this.props.data[this.props.name];
    const { isFetching, requested_venue_id, venue_id } = cardData;
    console.log("StatsGraph requested_venue_id: " + requested_venue_id);
    console.log("StatsGraph venue_id: " + venue_id)
    if(!isFetching){
      if(requested_venue_id != venue_id){
        console.log("StatsGraph - Location changed. Request data again");
        this.props.reloadData(requested_venue_id,this.props.name);
      }      
    }    
    return (
      <Panel
        hasTitle={true}
        title={'Revenue Graph'}>
        <canvas
          ref={this.getCanvaRef}
          id="linechart"
          width="600"
          height="275"
        />
      </Panel>
    );      
  }
  getCanvaRef = ref => (this.linechart = ref)

  drawChart(data) {
    // BAR CHART
    const options = {
      responsive : true,
      maintainAspectRatio: true
    };
    try{
      this.chart.destroy();
    }catch(e){

    }
    this.chart = new Chart(
      this.linechart.getContext('2d'),
      {
        type: 'line',
        data,
        options
      }
    );
  }  
}

export default StatsGraph
