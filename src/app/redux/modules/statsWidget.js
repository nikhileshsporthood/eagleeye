// flow weak

/* eslint no-console:0 */
/* eslint consistent-return:0 */

/*
  imports
 */
import moment               from 'moment';
import { appConfig }        from '../../config';
import {
  getStatsWidgetData
}                           from '../../services/API';
import {
  fetchMockstatsWidgetData
}                           from '../../services/fetchMocks';
import * as ReduxTypes      from '../types';

/*
  constants
 */
const REQUEST_STATS_WIDGET_DATA   = 'REQUEST_STATS_WIDGET_DATA';
const RECEIVED_STATS_WIDGET_DATA  = 'RECEIVED_STATS_WIDGET_DATA';
const ERROR_STATS_WIDGET_DATA     = 'ERROR_STATS_WIDGET_DATA';




type StatsWidgetState = {
  isFetching: boolean,
  headers:     Array<string>,
  data:   Array<Array<string>>,
  time:       string
};

/*
  reducer
 */
const initialState: StatsWidgetState = {
  isFetching: false,
  headers:     [],
  data:   [[]],
  time:       null
};

export default function statsWidget(state = initialState, action) {
  switch (action.type) {
  case 'REQUEST_STATS_WIDGET_DATA':
    return {
      ...state,
      isFetching: action.isFetching,
      time:       action.time
    };
  case 'RECEIVED_STATS_WIDGET_DATA':
    console.log("Nik - Received data");
    console.log(action);
    return {
      ...state,
      isFetching: action.isFetching,
      headers:     action.headers,
      data:   action.data,
      time:       action.time
    };
  case 'ERROR_STATS_WIDGET_DATA':
    return {
      ...state,
      isFetching: action.isFetching,
      time:       action.time
    };
  default:
    return state;
  }
}


/*
  action creators
 */
export function fetchStatsWidgetDataIfNeeded(id=0) {
  return (
    dispatch, 
    getState
  ) => {
    if (shouldFetchStatsWidgetData(getState())) {
      return dispatch(fetchStatsWidgetData(id));
    }
  };
}
function requestStatsWidgetData(time = moment().format()) {
  return {
    type:       REQUEST_STATS_WIDGET_DATA,
    isFetching: true,
    time
  };
}
function receivedStatsWidgetData(data, time = moment().format()) {
  console.log('Nikhilesh - receivedStatsWidgetData');
  console.log(data);
  return {
    type:       RECEIVED_STATS_WIDGET_DATA,
    isFetching: false,
    headers:     [...data.headers],
    data:   [...data.data],
    time
  };
}
function errorStatsWidgetData(error, time = moment().format()) {
  return {
    type:       ERROR_STATS_WIDGET_DATA,
    isFetching: false,
    error,
    time
  };
}
function fetchStatsWidgetData(id=0) {
      getStatsWidgetData(id)
        .then(
          data => dispatch(receivedStatsWidgetData(data))
        )
        .catch(          
          error => {console.log("Nik - Got Error");console.log(error);}
        );  
  return dispatch => {
    dispatch(requestStatsWidgetData());
      getStatsWidgetData(id)
        .then(
          data => dispatch(receivedStatsWidgetData(data))
        )
        .catch(
          error => dispatch(errorStatsWidgetData(error))
        );
  };
}
function shouldFetchStatsWidgetData(state) {
  console.log('Nik - shouldFetchEarningData');
  const statsWidgetStore = state.statsWidget;
  // just check wether fetching (assuming data could be refreshed and should not persist in store)
  if (statsWidgetStore.isFetching) {
    return false;
  } else {
    return true;
  }
}
