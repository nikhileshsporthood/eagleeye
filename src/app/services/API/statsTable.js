// @flow weak

import { appConfig }  from '../../config';
import {
  defaultOptions,
  checkStatus,
  parseJSON,
  getLocationOrigin
}                     from '../fetchTools';

export const getStatsTableData = (venue_id,name) => {
  const url = `${getLocationOrigin()}/${appConfig.statsTable.data.API}/?report_id=${appConfig.statsTable.data.tables[name]}&venue_id=${venue_id}`;
  const options = {...defaultOptions};

  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => data)
    .catch(error => error);
};

