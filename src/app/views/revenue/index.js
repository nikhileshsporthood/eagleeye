// @flow weak

import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import * as actions           from '../../redux/modules/actions';
import Revenue                   from './Revenue';

const mapStateToProps = (state) => {
  return {
    currentView:  state.views.currentView,
    statsTable:             state.statsTable,
    scoreCard:             state.scoreCard
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions : bindActionCreators(
      {
        enterPage: actions.enterPage,
        leavePage: actions.leavePage,
        fetchStatsTableDataIfNeeded:  actions.fetchStatsTableDataIfNeeded,
        fetchScoreCardDataIfNeeded:  actions.fetchScoreCardDataIfNeeded
      },
      dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Revenue);
