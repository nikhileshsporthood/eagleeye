// @flow weak

import { appConfig }  from '../../config';
import {
  defaultOptions,
  checkStatus,
  parseJSON,
  getLocationOrigin
}                     from '../fetchTools';

export const getLocationMenuData = () => {
  const url = `${getLocationOrigin()}/${appConfig.locationMenu.data.API}`;
  const options = {...defaultOptions};

  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => data)
    .catch(error => error);
};

