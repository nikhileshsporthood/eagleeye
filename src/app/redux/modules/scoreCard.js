// flow weak

/* eslint no-console:0 */
/* eslint consistent-return:0 */

/*
  imports
 */
import moment               from 'moment';
import { appConfig }        from '../../config';
import {
  getScoreCardData
}                           from '../../services/API';
import {
  fetchMockscoreCardData
}                           from '../../services/fetchMocks';
import * as ReduxTypes      from '../types';

/*
  constants
 */
const REQUEST_SCORE_CARD_DATA   = 'REQUEST_SCORE_CARD_DATA';
const RECEIVED_SCORE_CARD_DATA  = 'RECEIVED_SCORE_CARD_DATA';
const ERROR_SCORE_CARD_DATA     = 'ERROR_SCORE_CARD_DATA';


let singleTableState = {
  isFetching: false,
  data:   [[]],
  requested_venue_id: 0,
  venue_id: -1,
  time:       null
};

/*
  reducer
 */
  let initialStateCopy = {};
  for (var tableName in appConfig.scoreCard.data.tables) {
    if (appConfig.scoreCard.data.tables.hasOwnProperty(tableName)) {
        initialStateCopy[tableName] = Object.assign({}, singleTableState);
    }
  } 
  const initialState = initialStateCopy;

export default function scoreCard(state = initialState, action) {
  let data = initialState;
  switch (action.type) {
  case 'CHANGE_LOCATION_FOR_SCORE_CARD':
    console.log("Nik - REQUEST_LOCATION_CHANGE");
    console.log(state);
    data[action.name].requested_venue_id = action.selectedLocation;
    return Object.assign({}, state, data);
  case 'REFRESH_SCORE_CARD_DATA':
    console.log("Nik - REFRESH_SCORE_CARD_DATA");
    fetchScoreCardDataIfNeeded(action.venue_id,action.name);
    return state;        
  case 'REQUEST_SCORE_CARD_DATA':
    console.log("Nik - REQUEST_SCORE_CARD_DATA data");
    console.log(state);
    data[action.name].isFetching = action.isFetching;
    data[action.name].time = action.time;
    return Object.assign({}, state, data);
  case 'RECEIVED_SCORE_CARD_DATA':
    console.log("Nik - RECEIVED_SCORE_CARD_DATA data");
    console.log(action);
    data[action.name].isFetching = action.isFetching;
    data[action.name].time = action.time;
    data[action.name].headers = action.headers;
    data[action.name].data = action.data;
    data[action.name].venue_id = action.venue_id;
    let newstate = Object.assign({}, state, data);
    console.log(newstate);
    return newstate;
  case 'ERROR_SCORE_CARD_DATA':
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
export function fetchScoreCardDataIfNeeded(id=0,name) {
  return (
    dispatch, 
    getState
  ) => {
    if (shouldFetchScoreCardData(getState(),name)) {
      return dispatch(fetchScoreCardData(id,name));
    }
  };
}
function requestScoreCardData(name,time = moment().format()) {
  return {
    type:       REQUEST_SCORE_CARD_DATA,
    isFetching: true,
    time,name
  };
}
function receivedScoreCardData(data,name, time = moment().format()) {
  return {
    type:       RECEIVED_SCORE_CARD_DATA,
    isFetching: false,
    data:   [...data.data],
    venue_id:   data.venue_id,
    time,name
  };
}
function errorScoreCardData(error,name, time = moment().format()) {
  return {
    type:       ERROR_SCORE_CARD_DATA,
    isFetching: false,
    error,
    time,name
  };
}
function fetchScoreCardData(id=0,name) {
  return dispatch => {
    dispatch(requestScoreCardData(name));
      getScoreCardData(id,name)
        .then(
          data => dispatch(receivedScoreCardData(data,name))
        )
        .catch(
          error => dispatch(errorScoreCardData(error,name))
        );
  };
}

function shouldFetchScoreCardData(state,name) {
  const userInfosStore = state.scoreCard[name];
  if (userInfosStore.isFetching) {
    return false;
  } else {
    return true;
  }
}
