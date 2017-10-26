// @flow weak

import React      from 'react';
import PropTypes  from 'prop-types';

const TableCol = ({
  children
}) => (
  <td dangerouslySetInnerHTML={{__html: children.toString()}}>
  </td>
);

TableCol.propTypes = {
  children: PropTypes.node.isRequired
};

export default TableCol;
