// @flow weak

import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import * as actions           from '../../redux/modules/actions';
import Customers                   from './Customers';

const mapStateToProps = (state) => {
  return {
    currentView:  state.views.currentView,
    statsTable:             state.statsTable
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions : bindActionCreators(
      {
        enterPage: actions.enterPage,
        leavePage: actions.leavePage,
        fetchStatsTableDataIfNeeded:  actions.fetchStatsTableDataIfNeeded
      },
      dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Customers);
