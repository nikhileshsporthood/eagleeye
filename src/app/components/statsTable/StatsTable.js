// @flow weak

import React, {
  Component
}                     from 'react';
import PropTypes      from 'prop-types';
import Chart          from 'chart.js';
var Spinner = require('react-spinkit');
import {
  earningGraphMockData
}                     from '../../models';
import Panel          from '../panel/Panel';
import WorkProgressPanel  from '../../components/workProgress/workProgressPanel/WorkProgressPanel';
import fetchStatsTableDataIfNeeded  from '../../redux/modules/actions';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCol
}                         from '../../components';
import {store} from '../../Root.js'


class StatsTable extends Component {

  // chart = null;
  // linechart = null;

  constructor(props) {
    super(props);
    this.state        = { selectedLocation: props.selectedLocation } ;
  }



  componentDidMount() {
    // const { headers, data } = this.props;
  }

  componentWillReceiveProps(newProps) {
    const tableData = newProps.data[newProps.name]
    const { isFetching, requested_venue_id, venue_id } = tableData;
    console.log("StatsTable.componentWillReceiveProps");
    console.log("requested_venue_id: " + requested_venue_id);
    console.log("venue_id: " + venue_id);    
    if(!isFetching){
      if(requested_venue_id != venue_id){
        console.log("Location changed. Request data again");
        console.log(this.props.reloadData);
        this.props.reloadData(requested_venue_id,this.props.name);
      }      
    }
  }

  render() {
    const tableData = this.props.data[this.props.name]
    const { headers, data, isFetching, requested_venue_id, venue_id } = tableData;
    console.log("StatsTable.render");
    console.log("requested_venue_id: " + requested_venue_id);
    console.log("venue_id: " + venue_id);


    //TODO - This is anti-pattern and risky.
    if(!isFetching){
      if(requested_venue_id != venue_id){
        console.log("Location changed. Request data again");
        console.log(this.props.reloadData);
        this.props.reloadData(requested_venue_id,this.props.name);
      }      
    }


    var loaderDiv;
    if (isFetching) {
      loaderDiv = <div className="loading-overlay"><Spinner name="ball-grid-pulse" color="darkturquoise"/></div>;
    } else {
      loaderDiv = null;
    }    
    return (
      <WorkProgressPanel>
        {loaderDiv}
        <Table>
          <TableHeader>
            {
              headers.map(
                (header, headerIdx) => {
                  return (
                    <th key={headerIdx}>
                      {header}
                    </th>
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

export default StatsTable
