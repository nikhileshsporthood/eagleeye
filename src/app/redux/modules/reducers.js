// @flow weak

import { routerReducer }    from 'react-router-redux';
import { combineReducers }  from 'redux';
import earningGraph         from './earningGraph';
import sideMenu             from './sideMenu';
import userInfos            from './userInfos';
import teamMates            from './teamMates';
import views                from './views';
import statsWidget			from './statsWidget'
import statsWidget2      from './statsWidget2'
import statsCard			from './statsCard'
import statsTable      from './statsTable'
import locationMenu			from './locationMenu'

export const reducers = {
  earningGraph,
  statsWidget,
  statsWidget2,  
  statsTable,  
  statsCard,
  sideMenu,
  locationMenu,
  userInfos,
  teamMates,
  views
};

export default combineReducers({
  ...reducers,
  routing: routerReducer
});
