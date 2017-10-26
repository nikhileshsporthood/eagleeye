// @flow weak

import React, {
  PureComponent
}                     from 'react';
import PropTypes      from 'prop-types';
import Chart          from 'chart.js';
import {
  earningGraphMockData
}                     from '../../models';
import Panel          from '../panel/Panel';
import WorkProgressPanel  from '../../components/workProgress/workProgressPanel/WorkProgressPanel';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCol
}                         from '../../components';


class StatsWidget extends PureComponent {
  static propTypes = {
    headers:   PropTypes.array,
    data: PropTypes.array
  };

  static defaultProps = {
    headers: [],
    data: []
  };

  // chart = null;
  // linechart = null;

  componentDidMount() {
    const { headers, data } = this.props;
    // this.drawChart({labels, datasets});
  }

  componentWillReceiveProps(newProps) {
    const { headers, data } = this.props;
    // if ((newProps.labels.length > 0 && newProps.datasets.length > 0) &&
    //     (headers.length === 0 && data.length === 0)) {
    //   this.drawChart({
    //     labels: newProps.labels,
    //     datasets: newProps.datasets
    //   });
    // }
  }

  render() {
    const { headers, data } = this.props;
    return (
      <WorkProgressPanel>
        <Table>
          <TableHeader>
            {
              headers.map(
                (header, headerIdx) => {
                  return (
                    <TableCol key={headerIdx}>
                      {header}
                    </TableCol>
                  );
                }
              )
            }
          </TableHeader>
          <TableBody>
            {
              data.map(
                (contentRow, contentRowIdx) => {
                  return (
                    <TableRow key={contentRowIdx}>
                      {
                        contentRow.map(
                          (contentColumn, contentColumnIdx) => {
                            return (
                              <TableCol key={contentColumnIdx}>
                                {contentColumn}
                              </TableCol>
                            );
                          }
                        )
                      }
                    </TableRow>
                  );
                }
              )
            }
          </TableBody>
        </Table>
      </WorkProgressPanel>
    );
  }
}

export default StatsWidget;
