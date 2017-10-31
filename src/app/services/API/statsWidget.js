// @flow weak

import { appConfig }  from '../../config';
import {
  defaultOptions,
  checkStatus,
  parseJSON,
  getLocationOrigin
}                     from '../fetchTools';

export const getStatsWidgetData = (venue_id,report_id) => {
  const url = `${getLocationOrigin()}/${appConfig.statsWidget.data.API}/?report_id=${report_id}&venue_id=${venue_id}`;
  const options = {...defaultOptions};

  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => data)
    .catch(error => error);
};

