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
  fetchMockstatsWidget2Data
}                           from '../../services/fetchMocks';
import * as ReduxTypes      from '../types';

/*
  constants
 */
const REQUEST_STATS_WIDGET2_DATA   = 'REQUEST_STATS_WIDGET2_DATA';
const RECEIVED_STATS_WIDGET2_DATA  = 'RECEIVED_STATS_WIDGET2_DATA';
const ERROR_STATS_WIDGET2_DATA     = 'ERROR_STATS_WIDGET2_DATA';




type StatsWidget2State = {
  isFetching: boolean,
  headers:     Array<string>,
  data:   Array<Array<string>>,
  time:       string
};

/*
  reducer
 */
const initialState: StatsWidget2State = {
  isFetching: false,
  headers:     [],
  data:   [[]],
  time:       null
};

export default function statsWidget2(state = initialState, action) {
  switch (action.type) {
  case 'REQUEST_STATS_WIDGET2_DATA':
    return {
      ...state,
      isFetching: action.isFetching,
      time:       action.time
    };
  case 'RECEIVED_STATS_WIDGET2_DATA':
    console.log("Nik - Received data");
    console.log(action);
    return {
      ...state,
      isFetching: action.isFetching,
      headers:     action.headers,
      data:   action.data,
      time:       action.time
    };
  case 'ERROR_STATS_WIDGET2_DATA':
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
export function fetchStatsWidget2DataIfNeeded(id=0) {
  return (
    dispatch, 
    getState
  ) => {
    if (shouldFetchStatsWidget2Data(getState())) {
      return dispatch(fetchStatsWidget2Data(id));
    }
  };
}
function requestStatsWidget2Data(time = moment().format()) {
  return {
    type:       REQUEST_STATS_WIDGET2_DATA,
    isFetching: true,
    time
  };
}
function receivedStatsWidget2Data(data, time = moment().format()) {
  console.log(data);
  return {
    type:       RECEIVED_STATS_WIDGET2_DATA,
    isFetching: false,
    headers:     [...data.headers],
    data:   [...data.data],
    time
  };
}
function errorStatsWidget2Data(error, time = moment().format()) {
  return {
    type:       ERROR_STATS_WIDGET2_DATA,
    isFetching: false,
    error,
    time
  };
}
function fetchStatsWidget2Data(id=0) {
      getStatsWidgetData(id,7502)
        .then(
          data => dispatch(receivedStatsWidget2Data(data))
        )
        .catch(          
          error => {console.log("Nik - Got Error");console.log(error);}
        );  
  return dispatch => {
    dispatch(requestStatsWidget2Data());
      getStatsWidgetData(id,7502)
        .then(
          data => dispatch(receivedStatsWidget2Data(data))
        )
        .catch(
          error => dispatch(errorStatsWidget2Data(error))
        );
  };
}
function shouldFetchStatsWidget2Data(state) {
  const statsWidget2Store = state.statsWidget2;
  // just check wether fetching (assuming data could be refreshed and should not persist in store)
  if (statsWidget2Store.isFetching) {
    return false;
  } else {
    return true;
  }
}
