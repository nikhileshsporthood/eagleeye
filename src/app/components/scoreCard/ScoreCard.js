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
import fetchScoreCardDataIfNeeded  from '../../redux/modules/actions';
import {
  StatsCard,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCol
}                         from '../../components';
import {store} from '../../Root.js'


class ScoreCard extends Component {

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
    const cardData = this.props.data[this.props.name];
    const { isFetching, requested_venue_id, venue_id } = cardData;
    if(!isFetching){
      if(requested_venue_id != venue_id){
        console.log(this.props.reloadData);
        this.props.reloadData(requested_venue_id,this.props.name);
      }      
    }
  }

  render() {
    const cardData = this.props.data[this.props.name];
    const { isFetching, requested_venue_id, venue_id } = cardData;
    if(!isFetching){
      if(requested_venue_id != venue_id){
        console.log("Location changed. Request data again");
        console.log(this.props.reloadData);
        this.props.reloadData(requested_venue_id,this.props.name);
      }      
    }    
    return(
      <div
        className="row"
        style={{marginBottom: '5px'}}>
        {
            cardData.data.map(
              (singleCard, contentRowIdx) => {
                return (
                <div className="col-md-3" key={contentRowIdx}>
                  <StatsCard
                    statValue={singleCard.value}
                    statLabel={singleCard.label}
                    icon={<i className="fa fa-inr" />}
                    backColor={['red','violet','blue','green'][contentRowIdx%4]}
                  />
                </div>
                );
              }
            )  
        }
      </div>   
    )       
  }
}

export default ScoreCard
