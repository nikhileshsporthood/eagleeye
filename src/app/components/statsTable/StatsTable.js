// @flow weak

import React, {
  Component
}                     from 'react';
import PropTypes      from 'prop-types';
import Chart          from 'chart.js';
import FilterableTable from 'react-filterable-table';
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
import TableData from '../../components/table/tableCol/TableData'


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
    if(!isFetching){
      if(requested_venue_id != venue_id){
        this.props.reloadData(requested_venue_id,this.props.name);
      }      
    }
  }

  bigTable(data,headers){
    //Convert data to react-filterable-table format
    var cols = headers;
    const dataTableData = data.map(function(element,index){
       var newObj = {};
       element.forEach(function(data,index){
          newObj[cols[index]]=data;
       });
       return newObj;
    });
    //Convert headers to react-filterable-table format.
    // var headings = [];
    const headings = headers.map(function(element,index){
      var heading = {};
      heading["name"] = element;
      heading["displayName"] = element;
      heading["sortable"] = true;
      heading["inputFilterable"] = true;
      heading["render"] =  props => <span dangerouslySetInnerHTML={{__html: props.value}}  ></span>
      return heading;
    });
    return <FilterableTable
          namespace="People"
          data={dataTableData}
          fields={headings}
          pagersVisible={false}
          pageSize={100}
          pageSizes={null}
        />;
  }

  smallTable(data,headers){
    return(
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
        </Table>) ;   
  }  


  render() {
    const tableData = this.props.data[this.props.name]
    const { headers, data, isFetching, requested_venue_id, venue_id } = tableData;
    //TODO - This is anti-pattern and risky.
    if(!isFetching){
      if(requested_venue_id != venue_id){
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

        { this.props.bigTable &&
          this.bigTable(data,headers)
        }
        { !this.props.bigTable &&
          this.smallTable(data,headers)
        }

      </WorkProgressPanel>
    );
  }
}


export default StatsTable
