// flow weak

import React, {
  PureComponent
}                         from 'react';
import PropTypes          from 'prop-types';
import {
  AnimatedView,
  StatsCard,
  StatsTable,
  ScoreCard,
  StatsGraph,
  EarningGraph,
  Notifications,
  WorkProgress,
  TwitterFeed,
  TodoListDemo,
  TeamMatesDemo  
}                         from '../../components';
import StatsWidget from '../../components/statsWidget/StatsWidget.js';
import StatsWidget2 from '../../components/statsWidget/StatsWidget2.js';

class Home extends PureComponent {
  static propTypes = {
    earningGraphLabels:   PropTypes.array,
    revenueChart:  PropTypes.shape({
      headers: PropTypes.array,
      data: PropTypes.array
    }),
    earningGraphDatasets: PropTypes.array,
    teamMatesIsFetching:  PropTypes.bool,
    teamMates:            PropTypes.arrayOf(
      PropTypes.shape({
        picture:      PropTypes.string,
        firstname:    PropTypes.string,
        lastname:     PropTypes.string,
        profile:      PropTypes.string,
        profileColor: PropTypes.oneOf(['danger', 'warning', 'info', 'success'])
      })
    ),
    actions: PropTypes.shape({
      enterPage: PropTypes.func,
      leavePage: PropTypes.func,
      fetchEarningGraphDataIfNeeded:  PropTypes.func,
      fetchTeamMatesDataIfNeeded:     PropTypes.func,
      fetchStatsWidgetDataIfNeeded:     PropTypes.func,
      fetchStatsWidget2DataIfNeeded:     PropTypes.func,      
      fetchStatsCardDataIfNeeded:       PropTypes.func
    })
  };

  componentWillMount() {
    const { actions: { enterPage } } = this.props;
    enterPage('Home');
  }

  componentDidMount() {
    const {
      actions: {
        fetchEarningGraphDataIfNeeded,
        fetchTeamMatesDataIfNeeded,
        fetchStatsWidgetDataIfNeeded,
        fetchStatsWidget2DataIfNeeded,
        fetchStatsCardDataIfNeeded,
        fetchStatsTableDataIfNeeded
      }
    } = this.props;

    // fetchEarningGraphDataIfNeeded();
    // fetchStatsCardDataIfNeeded();
    // fetchStatsTableDataIfNeeded();
  }

  componentWillUnmount() {
    const { actions: { leavePage } } = this.props;
    leavePage('Home');
  }

  render() {
    const {
      teamMates,
      teamMatesIsFetching,
      earningGraphLabels,
      earningGraphDatasets,
      statsWidget,
      statsWidget2,
      statsCard,
      statsGraph,
      scoreCard,
      statsTable
    } = this.props;
    
    const { 
      actions: {
        fetchStatsTableDataIfNeeded,fetchScoreCardDataIfNeeded,fetchStatsGraphDataIfNeeded
      }
    } = this.props;    

    return(
      <AnimatedView>
        <div className="row"><div className="col-md-12">
          <ScoreCard name="dashboard_score_card" data={scoreCard} reloadData={fetchScoreCardDataIfNeeded}/>          
        </div></div>      

        <div className="row">
          <div className="col-md-7">
            <StatsTable name="revenue_per_month" data={statsTable} reloadData={fetchStatsTableDataIfNeeded}/>          

          </div>        
          <div className="col-lg-5">
            <StatsGraph name="revenue_per_month" data={statsGraph} reloadData={fetchStatsGraphDataIfNeeded}/>          
          </div>
        </div>

        <div className="row">
          <div className="col-md-7">
            <StatsTable name="customers_per_month" data={statsTable} reloadData={fetchStatsTableDataIfNeeded}/>
          </div>        
          <div className="col-lg-5">
            <Notifications />          
          </div>
        </div>

        {/*
            <StatsWidget
              headers={statsWidget.headers}
              data={statsWidget.data}/>
            <StatsWidget
              headers={statsWidget2.headers}
              data={statsWidget2.data}/>                        
        <div className="row">
          <div className="col-md-6">
            <Notifications />
          </div>
          <div className="col-md-6">
            <WorkProgress />            
          </div>
        </div>

        <div className="row">
        */}
          

          {/*
          <div className="col-md-7">
            <TodoListDemo />
          </div>
          */}


      </AnimatedView>
    );
  }
}

export default Home;
