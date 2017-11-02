// @flow weak

import React, {
  PureComponent
}                     from 'react';
import PropTypes      from 'prop-types';
import Chart          from 'chart.js';
import {
  earningGraphMockData
}                     from '../../models';
import Panel          from '../panel/Panel';


class EarningGraph extends PureComponent {
  static propTypes = {
    labels:   PropTypes.array,
    datasets: PropTypes.array
  };

  static defaultProps = {
    data: earningGraphMockData
  };

  chart = null;
  linechart = null;

  componentDidMount() {
    const { labels, datasets } = this.props;
    this.drawChart({
      labels: labels,
      datasets: datasets
    });
  }

  componentWillReceiveProps(newProps) {
    const { labels, datasets } = this.props;
    this.drawChart({
      labels: newProps.labels,
      datasets: newProps.datasets
    });    
    // if ((newProps.labels.length > 0 && newProps.datasets.length > 0) &&
    //     (labels.length === 0 && datasets.length === 0)) {
    //   this.drawChart({
    //     labels: newProps.labels,
    //     datasets: newProps.datasets
    //   });
    // }
  }

  render() {
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

export default EarningGraph;
