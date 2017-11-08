// @flow weak

import React, {
  PureComponent
}                     from 'react';
import PropTypes  from 'prop-types';

class TableData extends PureComponent {

  render() {
  	console.log("TableData.render");	
  	console.log(this.props);	
  	return null;
  }
}
export default TableData;
