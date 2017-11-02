// flow weak

/* eslint no-console:0 */
/* eslint consistent-return:0 */

/*
  imports
 */
import moment               from 'moment';
import { appConfig }        from '../../config';
import {
  getStatsTableData
}                           from '../../services/API';
import {
  fetchMockstatsTableData
}                           from '../../services/fetchMocks';
import * as ReduxTypes      from '../types';

/*
  constants
 */
const REQUEST_STATS_TABLE_DATA   = 'REQUEST_STATS_TABLE_DATA';
const RECEIVED_STATS_TABLE_DATA  = 'RECEIVED_STATS_TABLE_DATA';
const ERROR_STATS_TABLE_DATA     = 'ERROR_STATS_TABLE_DATA';


let singleTableState = {
  isFetching: false,
  headers:     [],
  data:   [[]],
  requested_venue_id: 0,
  venue_id: -1,
  time:       null
};

/*
  reducer
 */
  let initialStateCopy = {};
  for (var tableName in appConfig.statsTable.data.tables) {
    if (appConfig.statsTable.data.tables.hasOwnProperty(tableName)) {
        initialStateCopy[tableName] = Object.assign({}, singleTableState);
    }
  } 
  const initialState = initialStateCopy;

export default function statsTable(state = initialState, action) {
  console.log("Inside Reducer");
  console.log(initialState);
  console.log(appConfig.statsTable.data.tables);
  let data = initialState;
  switch (action.type) {
  case 'CHANGE_LOCATION_FOR_STATS_TABLE':
    console.log("Nik - REQUEST_LOCATION_CHANGE");
    console.log(state);
    data[action.name].requested_venue_id = action.selectedLocation;
    return Object.assign({}, state, data);
  case 'REFRESH_STATS_TABLE_DATA':
    console.log("Nik - REFRESH_STATS_TABLE_DATA");
    fetchStatsTableDataIfNeeded(action.venue_id,action.name);
    return state;        
  case 'REQUEST_STATS_TABLE_DATA':
    console.log("Nik - REQUEST_STATS_TABLE_DATA data");
    console.log(state);
    data[action.name].isFetching = action.isFetching;
    data[action.name].time = action.time;
    return Object.assign({}, state, data);
  case 'RECEIVED_STATS_TABLE_DATA':
    console.log("Nik - RECEIVED_STATS_TABLE_DATA data");
    console.log(action);
    data[action.name].isFetching = action.isFetching;
    data[action.name].time = action.time;
    data[action.name].headers = action.headers;
    data[action.name].data = action.data;
    data[action.name].venue_id = action.venue_id;
    let newstate = Object.assign({}, state, data);
    console.log(newstate);
    return newstate;
  case 'ERROR_STATS_TABLE_DATA':
    data[action.name].isFetching = action.isFetching;
    data[action.name].time = action.time;
    data[action.name].headers = [];
    data[action.name].data = [[]];
    //To avoid api loop
    //Stop at first api error.
    data[action.name].venue_id = state[action.name].requested_venue_id;    
    return Object.assign({}, state, data);
  default:
    return state;
  }
}


/*
  action creators
 */
export function fetchStatsTableDataIfNeeded(id=0,name) {
  return (
    dispatch, 
    getState
  ) => {
    if (shouldFetchStatsTableData(getState(),name)) {
      return dispatch(fetchStatsTableData(id,name));
    }
  };
}
function requestStatsTableData(name,time = moment().format()) {
  return {
    type:       REQUEST_STATS_TABLE_DATA,
    isFetching: true,
    time,name
  };
}
function receivedStatsTableData(data,name, time = moment().format()) {
  return {
    type:       RECEIVED_STATS_TABLE_DATA,
    isFetching: false,
    headers:     [...data.headers],
    data:   [...data.data],
    venue_id:   data.venue_id,
    time,name
  };
}
function errorStatsTableData(error,name, time = moment().format()) {
  return {
    type:       ERROR_STATS_TABLE_DATA,
    isFetching: false,
    error,
    time,name
  };
}
function fetchStatsTableData(id=0,name) {
  return dispatch => {
    dispatch(requestStatsTableData(name));
      getStatsTableData(id,name)
        .then(
          data => dispatch(receivedStatsTableData(data,name))
        )
        .catch(
          error => dispatch(errorStatsTableData(error,name))
        );
  };
}

function shouldFetchStatsTableData(state,name) {
  const userInfosStore = state.statsTable[name];
  if (userInfosStore.isFetching) {
    return false;
  } else {
    return true;
  }
}
