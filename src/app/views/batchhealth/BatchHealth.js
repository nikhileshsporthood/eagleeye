// flow weak

import React, {
  PureComponent
}                         from 'react';
import PropTypes          from 'prop-types';
import {
  StatsTable,AnimatedView
}                         from '../../components';

class BatchHealth extends PureComponent {
  static propTypes = {
    actions: PropTypes.shape({
    })
  };

  componentWillMount() {
    const { actions: { enterPage } } = this.props;
    enterPage('BatchHealth');
  }

  componentDidMount() {
    const {
      actions: {
        fetchStatsTableDataIfNeeded
      }
    } = this.props;
  }

  componentWillUnmount() {
    const { actions: { leavePage } } = this.props;
    leavePage('BatchHealth');
  }

  render() {
    const {
      statsTable
    } = this.props;
    
    const { 
      actions: {
        fetchStatsTableDataIfNeeded
      }
    } = this.props;    

    return(
      <AnimatedView>
        <div className="row">
          <div className="col-md-12">
            <StatsTable name="batch_health" data={statsTable} reloadData={fetchStatsTableDataIfNeeded}/>
          </div>        
        </div>
      </AnimatedView>
    );
  }
}

export default BatchHealth;
