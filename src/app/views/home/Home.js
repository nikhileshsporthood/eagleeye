// flow weak

import React, {
  PureComponent
}                         from 'react';
import PropTypes          from 'prop-types';
import {
  AnimatedView,
  StatsCard,
  EarningGraph,
  Notifications,
  WorkProgress,
  TwitterFeed,
  TodoListDemo,
  TeamMatesDemo  
}                         from '../../components';
import StatsWidget from '../../components/statsWidget/StatsWidget.js';

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
      enterHome: PropTypes.func,
      leaveHome: PropTypes.func,
      fetchEarningGraphDataIfNeeded:  PropTypes.func,
      fetchTeamMatesDataIfNeeded:     PropTypes.func,
      fetchStatsWidgetDataIfNeeded:     PropTypes.func
    })
  };

  componentWillMount() {
    const { actions: { enterHome } } = this.props;
    enterHome();
  }

  componentDidMount() {
    const {
      actions: {
        fetchEarningGraphDataIfNeeded,
        fetchTeamMatesDataIfNeeded,
        fetchStatsWidgetDataIfNeeded
      }
    } = this.props;

    fetchEarningGraphDataIfNeeded();
    fetchTeamMatesDataIfNeeded();
    fetchStatsWidgetDataIfNeeded();
  }

  componentWillUnmount() {
    const { actions: { leaveHome } } = this.props;
    leaveHome();
  }

  render() {
    const {
      teamMates,
      teamMatesIsFetching,
      earningGraphLabels,
      earningGraphDatasets,
      statsWidget
    } = this.props;

    return(
      <AnimatedView>
        <div
          className="row"
          style={{marginBottom: '5px'}}>
          <div className="col-md-3">
            <StatsCard
              statValue={'3200'}
              statLabel={'Revenue'}
              icon={<i className="fa fa-inr" />}
              backColor={'red'}
            />
          </div>
          <div className="col-md-3">
            <StatsCard
              statValue={'2200'}
              statLabel={'Gross Margin'}
              icon={<i className="fa fa-inr" />}
              backColor={'violet'}
            />
          </div>
          <div className="col-md-3">
            <StatsCard
              statValue={'100,320'}
              statLabel={'Active Customers'}
              icon={<i className="fa fa-street-view" />}
              backColor={'blue'}
            />
          </div>
          <div className="col-md-3">
            <StatsCard
              statValue={'4567'}
              statLabel={'Demos Scheduled'}
              icon={<i className="fa fa-user-plus" />}
              backColor={'green'}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            <StatsWidget
              headers={statsWidget.headers}
              data={statsWidget.data}/>
          </div>        
          <div className="col-lg-4">
            <Notifications />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <EarningGraph
              labels={earningGraphLabels}
              datasets={earningGraphDatasets}/>
          </div>
          <div className="col-md-6">
            <WorkProgress />            
          </div>
        </div>

        <div className="row">

          

          {/*
          <div className="col-md-7">
            <TodoListDemo />
          </div>
          */}
        </div>

      </AnimatedView>
    );
  }
}

export default Home;
