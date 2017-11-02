// flow weak

import React, {
  PureComponent
}                         from 'react';
import PropTypes          from 'prop-types';
import {
  AnimatedView,
  StatsCard,
  StatsTable,
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
      statsTable
    } = this.props;
    
    const { 
      actions: {
        fetchStatsTableDataIfNeeded
      }
    } = this.props;    

    return(
      <AnimatedView>
        <div
          className="row"
          style={{marginBottom: '5px'}}>
          <div className="col-md-3">
            <StatsCard
              statValue={statsCard.data[0].value}
              statLabel={statsCard.data[0].label}
              icon={<i className="fa fa-inr" />}
              backColor={'red'}
            />
          </div>
          <div className="col-md-3">
            <StatsCard
              statValue={statsCard.data[1].value}
              statLabel={statsCard.data[1].label}
              icon={<i className="fa fa-inr" />}
              backColor={'violet'}
            />
          </div>
          <div className="col-md-3">
            <StatsCard
              statValue={statsCard.data[2].value}
              statLabel={statsCard.data[2].label}
              icon={<i className="fa fa-street-view" />}
              backColor={'blue'}
            />
          </div>
          <div className="col-md-3">
            <StatsCard
              statValue={statsCard.data[3].value}
              statLabel={statsCard.data[3].label}
              icon={<i className="fa fa-user-plus" />}
              backColor={'green'}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-7">
            <StatsTable name="revenue_per_month" data={statsTable} reloadData={fetchStatsTableDataIfNeeded}/>          

          </div>        
          <div className="col-lg-5">
            <EarningGraph
              labels={earningGraphLabels}
              datasets={earningGraphDatasets}/>          
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
