// @flow weak

import { routerReducer }    from 'react-router-redux';
import { combineReducers }  from 'redux';
import earningGraph         from './earningGraph';
import sideMenu             from './sideMenu';
import userInfos            from './userInfos';
import teamMates            from './teamMates';
import views                from './views';
import statsWidget			from './statsWidget'

export const reducers = {
  earningGraph,
  statsWidget,
  sideMenu,
  userInfos,
  teamMates,
  views
};

export default combineReducers({
  ...reducers,
  routing: routerReducer
});
