// @flow weak

import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import * as actions           from '../../redux/modules/actions';
import Home                   from './Home';

const mapStateToProps = (state) => {
  return {
    currentView:  state.views.currentView,

    earningGraphIsFetching: state.earningGraph.isFetching,
    earningGraphLabels:     state.earningGraph.labels,
    earningGraphDatasets:   state.earningGraph.datasets,
    teamMatesIsFetching:    state.teamMates.isFetching,
    teamMates:              state.teamMates.data,
    statsWidget:            state.statsWidget,
    statsWidget2:            state.statsWidget2,    
    statsCard:              state.statsCard,
    statsTable:             state.statsTable
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions : bindActionCreators(
      {
        enterPage: actions.enterPage,
        leavePage: actions.leavePage,

        fetchEarningGraphDataIfNeeded:  actions.fetchEarningGraphDataIfNeeded,
        fetchTeamMatesDataIfNeeded:     actions.fetchTeamMatesDataIfNeeded,
        fetchStatsWidgetDataIfNeeded:   actions.fetchStatsWidgetDataIfNeeded,
        fetchStatsWidget2DataIfNeeded:   actions.fetchStatsWidget2DataIfNeeded,
        fetchStatsCardDataIfNeeded:   actions.fetchStatsCardDataIfNeeded,
        fetchStatsTableDataIfNeeded:  actions.fetchStatsTableDataIfNeeded
      },
      dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
