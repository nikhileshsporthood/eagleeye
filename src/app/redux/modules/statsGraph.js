// flow weak

/* eslint no-console:0 */
/* eslint consistent-return:0 */

/*
  imports
 */
import moment               from 'moment';
import { appConfig }        from '../../config';
import {
  getStatsGraphData
}                           from '../../services/API';
import {
  fetchMockstatsGraphData
}                           from '../../services/fetchMocks';
import * as ReduxTypes      from '../types';

/*
  constants
 */
const REQUEST_STATS_GRAPH_DATA   = 'REQUEST_STATS_GRAPH_DATA';
const RECEIVED_STATS_GRAPH_DATA  = 'RECEIVED_STATS_GRAPH_DATA';
const ERROR_STATS_GRAPH_DATA     = 'ERROR_STATS_GRAPH_DATA';


let singleTableState = {
  isFetching: false,
  labels: [],
  datasets: [],
  requested_venue_id: 0,
  venue_id: -1,
  time:       null
};

/*
  reducer
 */
  let initialStateCopy = {};
  for (var tableName in appConfig.statsGraph.data.tables) {
    if (appConfig.statsGraph.data.tables.hasOwnProperty(tableName)) {
        initialStateCopy[tableName] = Object.assign({}, singleTableState);
    }
  } 
  const initialState = initialStateCopy;

export default function statsGraph(state = initialState, action) {
  let data = initialState;
  switch (action.type) {
  case 'CHANGE_LOCATION_FOR_STATS_GRAPH':
    console.log("Nik - REQUEST_LOCATION_CHANGE");
    console.log(state);
    data[action.name].requested_venue_id = action.selectedLocation;
    return Object.assign({}, state, data);
  case 'REFRESH_STATS_GRAPH_DATA':
    console.log("Nik - REFRESH_STATS_GRAPH_DATA");
    fetchStatsGraphDataIfNeeded(action.venue_id,action.name);
    return state;        
  case 'REQUEST_STATS_GRAPH_DATA':
    console.log("Nik - REQUEST_STATS_GRAPH_DATA data");
    console.log(state);
    data[action.name].isFetching = action.isFetching;
    data[action.name].time = action.time;
    return Object.assign({}, state, data);
  case 'RECEIVED_STATS_GRAPH_DATA':
    console.log("Nik - RECEIVED_STATS_GRAPH_DATA data");
    console.log(action);
    data[action.name].isFetching = action.isFetching;
    data[action.name].time = action.time;
    data[action.name].labels = action.labels;
    data[action.name].datasets = action.datasets;
    data[action.name].venue_id = action.venue_id;
    let newstate = Object.assign({}, state, data);
    console.log(newstate);
    return newstate;
  case 'ERROR_STATS_GRAPH_DATA':
    data[action.name].isFetching = action.isFetching;
    data[action.name].time = action.time;
    data[action.name].labels = [];
    data[action.name].datasets = [];

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
export function fetchStatsGraphDataIfNeeded(id=0,name) {
  return (
    dispatch, 
    getState
  ) => {
    if (shouldFetchStatsGraphData(getState(),name)) {
      return dispatch(fetchStatsGraphData(id,name));
    }
  };
}
function requestStatsGraphData(name,time = moment().format()) {
  return {
    type:       REQUEST_STATS_GRAPH_DATA,
    isFetching: true,
    time,name
  };
}
function receivedStatsGraphData(data,name, time = moment().format()) {
  return {
    type:       RECEIVED_STATS_GRAPH_DATA,
    isFetching: false,
    labels:   [...data.labels],
    datasets:   [...data.datasets],
    venue_id:   data.venue_id,
    time,name
  };
}
function errorStatsGraphData(error,name, time = moment().format()) {
  return {
    type:       ERROR_STATS_GRAPH_DATA,
    isFetching: false,
    error,
    time,name
  };
}
function fetchStatsGraphData(id=0,name) {
  return dispatch => {
    dispatch(requestStatsGraphData(name));
      getStatsGraphData(id,name)
        .then(
          data => dispatch(receivedStatsGraphData(data,name))
        )
        .catch(
          error => dispatch(errorStatsGraphData(error,name))
        );
  };
}

function shouldFetchStatsGraphData(state,name) {
  const userInfosStore = state.statsGraph[name];
  if (userInfosStore.isFetching) {
    return false;
  } else {
    return true;
  }
}
