// flow weak

/* eslint no-console:0 */
/* eslint consistent-return:0 */

/*
  imports
 */
import moment               from 'moment';
import { appConfig }        from '../../config';
import {
  getLocationMenuData
}                           from '../../services/API';

import * as ReduxTypes      from '../types';

/*
  constants
 */
const REQUEST_LOCATION_MENU_DATA   = 'REQUEST_LOCATION_MENU_DATA';
const RECEIVED_LOCATION_MENU_DATA  = 'RECEIVED_LOCATION_MENU_DATA';
const ERROR_LOCATION_MENU_DATA     = 'ERROR_LOCATION_MENU_DATA';



type LocationMenuData = {
  name:        		string,
  id:         string,
  children:          Array<LocationMenuData>
};

type LocationMenuState = {
  isFetching:   boolean,
  data:         LocationMenuData,
  isConnected:  boolean,
  time:         ?string
};


/*
  reducer
 */
const initialState: LocationMenuState = {
  isFetching: false,
  data:   {},
  time:       null
};

export default function locationMenu(state = initialState, action) {
  switch (action.type) {
  case 'REQUEST_LOCATION_MENU_DATA':
    return {
      ...state,
      isFetching: action.isFetching,
      time:       action.time
    };
  case 'RECEIVED_LOCATION_MENU_DATA':
    console.log("Nik - Received data");
    console.log(action);
    return {
      ...state,
      isFetching: action.isFetching,
      data:   action.data,
      time:       action.time
    };
  case 'ERROR_LOCATION_MENU_DATA':
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
export function fetchLocationMenuDataIfNeeded() {
  return (
    dispatch, 
    getState
  ) => {
    if (shouldFetchLocationMenuData(getState())) {
      return dispatch(fetchLocationMenuData());
    }
  };
}
function requestLocationMenuData(time = moment().format()) {
  return {
    type:       REQUEST_LOCATION_MENU_DATA,
    isFetching: true,
    time
  };
}
function receivedLocationMenuData(data, time = moment().format()) {
  console.log('Nikhilesh - receivedLocationMenuData');
  console.log(data);
  return {
    type:       RECEIVED_LOCATION_MENU_DATA,
    isFetching: false,
    data:   data,
    time
  };
}
function errorLocationMenuData(error, time = moment().format()) {
  return {
    type:       ERROR_LOCATION_MENU_DATA,
    isFetching: false,
    error,
    time
  };
}
function fetchLocationMenuData() {
  console.log("Nik - fetchLocationMenuData - 1");
      getLocationMenuData()
        .then(
          data => dispatch(receivedLocationMenuData(data))
        )
        .catch(          
          error => {console.log("Nik - Got Error");console.log(error);}
        );  
  return dispatch => {
    dispatch(requestLocationMenuData());
      getLocationMenuData()
        .then(
          data => dispatch(receivedLocationMenuData(data))
        )
        .catch(
          error => dispatch(errorLocationMenuData(error))
        );
  };
}
function shouldFetchLocationMenuData(state) {
  console.log('Nik - shouldFetchfetchLocationMenuData');
  const locationMenuStore = state.locationMenu;
  // just check wether fetching (assuming data could be refreshed and should not persist in store)
  if (locationMenuStore.isFetching) {
    return false;
  } else {
    return true;
  }
}
