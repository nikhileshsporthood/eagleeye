// flow weak

/* eslint no-console:0 */
/* eslint consistent-return:0 */

/*
  imports
 */
import moment               from 'moment';
import { appConfig }        from '../../config';
import {
  getStatsCardData
}                           from '../../services/API';

import * as ReduxTypes      from '../types';

/*
  constants
 */
const REQUEST_STATS_CARD_DATA   = 'REQUEST_STATS_CARD_DATA';
const RECEIVED_STATS_CARD_DATA  = 'RECEIVED_STATS_CARD_DATA';
const ERROR_STATS_CARD_DATA     = 'ERROR_STATS_CARD_DATA';




type StatsCard = {
  value:            ?string,
  label:        ?string,
  icon:         string,
  color:          string
};

type StatsCardState = {
  isFetching: boolean,
  data:   Array<StatsCard>,
  time:       string
};

/*
  reducer
 */
const initialState: StatsCardState = {
  isFetching: false,
  data:   [{},{},{},{}],
  time:       null
};

export default function statsCard(state = initialState, action) {
  switch (action.type) {
  case 'REQUEST_STATS_CARD_DATA':
    return {
      ...state,
      isFetching: action.isFetching,
      time:       action.time
    };
  case 'RECEIVED_STATS_CARD_DATA':
    console.log("Nik - Received data");
    console.log(action);
    return {
      ...state,
      isFetching: action.isFetching,
      data:   action.data,
      time:       action.time
    };
  case 'ERROR_STATS_CARD_DATA':
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
export function fetchStatsCardDataIfNeeded(id) {
  return (
    dispatch, 
    getState
  ) => {
    if (shouldFetchStatsCardData(getState())) {
      return dispatch(fetchStatsCardData(id));
    }
  };
}
function requestStatsCardData(time = moment().format()) {
  return {
    type:       REQUEST_STATS_CARD_DATA,
    isFetching: true,
    time
  };
}
function receivedStatsCardData(data, time = moment().format()) {
  console.log('Nikhilesh - receivedStatsCardData');
  console.log(data);
  return {
    type:       RECEIVED_STATS_CARD_DATA,
    isFetching: false,
    data:   [...data.data],
    time
  };
}
function errorStatsCardData(error, time = moment().format()) {
  return {
    type:       ERROR_STATS_CARD_DATA,
    isFetching: false,
    error,
    time
  };
}
function fetchStatsCardData(id=0) {
      getStatsCardData(id)
        .then(
          data => dispatch(receivedStatsCardData(data))
        )
        .catch(          
          error => {console.log("Nik - Got Error");console.log(error);}
        );  
  return dispatch => {
    dispatch(requestStatsCardData());
      getStatsCardData(id)
        .then(
          data => dispatch(receivedStatsCardData(data))
        )
        .catch(
          error => dispatch(errorStatsCardData(error))
        );
  };
}
function shouldFetchStatsCardData(state) {
  console.log('Nik - shouldFetchEarningData');
  const statsCardStore = state.statsCard;
  // just check wether fetching (assuming data could be refreshed and should not persist in store)
  if (statsCardStore.isFetching) {
    return false;
  } else {
    return true;
  }
}
