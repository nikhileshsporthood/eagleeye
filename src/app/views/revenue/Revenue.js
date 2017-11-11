// flow weak

import React, {
  PureComponent
}                         from 'react';
import PropTypes          from 'prop-types';
import {
  StatsTable,AnimatedView,ScoreCard
}                         from '../../components';

class Revenue extends PureComponent {
  static propTypes = {
    actions: PropTypes.shape({
    })
  };

  componentWillMount() {
    const { actions: { enterPage } } = this.props;
    enterPage('Revenue');
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
    leavePage('Revenue');
  }

  render() {
    const {
      statsTable,scoreCard
    } = this.props;
    
    const { 
      actions: {
        fetchStatsTableDataIfNeeded,fetchScoreCardDataIfNeeded
      }
    } = this.props;    
    return(
      <AnimatedView>
        <div className="row">
          <div className="col-md-12">
            <ScoreCard name="revenue_score_card" data={scoreCard} reloadData={fetchScoreCardDataIfNeeded}/>          
          </div>                  
        </div>      
        <div className="row">
          <div className="col-md-4">
            <StatsTable name="revenue_breakup_by_program" data={statsTable} reloadData={fetchStatsTableDataIfNeeded}/>
          </div>
          <div className="col-md-4">
            <StatsTable name="revenue_breakup_by_package" data={statsTable} reloadData={fetchStatsTableDataIfNeeded}/>
          </div>                
          <div className="col-md-4">
            <StatsTable name="revenue_breakup_by_package_duration" data={statsTable} reloadData={fetchStatsTableDataIfNeeded}/>
          </div>                          
        </div>
        <div className="row">
          <div className="col-md-12">
            <StatsTable name="cash_collection_report" bigTable={true} data={statsTable} reloadData={fetchStatsTableDataIfNeeded}/>          
          </div>                  
        </div>        
      </AnimatedView>
    );
  }
}

export default Revenue;
