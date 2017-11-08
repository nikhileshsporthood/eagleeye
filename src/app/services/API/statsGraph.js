// @flow weak

import { appConfig }  from '../../config';
import {
  defaultOptions,
  checkStatus,
  parseJSON,
  getLocationOrigin
}                     from '../fetchTools';

export const getStatsGraphData = (venue_id,name) => {
  const url = `${getLocationOrigin()}/${appConfig.statsGraph.data.API}/?report_id=${appConfig.statsGraph.data.tables[name]}&venue_id=${venue_id}`;
  const options = {...defaultOptions};

  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => data)
    .catch(error => error);
};

