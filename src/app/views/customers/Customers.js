// flow weak

import React, {
  PureComponent
}                         from 'react';
import PropTypes          from 'prop-types';
import {
  StatsTable,AnimatedView
}                         from '../../components';

class Customers extends PureComponent {
  static propTypes = {
    actions: PropTypes.shape({
    })
  };

  componentWillMount() {
    const { actions: { enterPage } } = this.props;
    enterPage('Customers');
  }

  componentDidMount() {
    const {
      actions: {
        fetchStatsTableDataIfNeeded
      }
    } = this.props;
  }

  componentWillUnmount() {
    const { actions: { leavePage } } = this.props;
    leavePage('Customers');
  }

  render() {
    const {
      statsTable
    } = this.props;
    
    const { 
      actions: {
        fetchStatsTableDataIfNeeded
      }
    } = this.props;    

    return(
      <AnimatedView>
        <div className="row">
          <div className="col-md-12">
            <StatsTable bigTable={true} name="active_customers_list" data={statsTable} reloadData={fetchStatsTableDataIfNeeded}/>
          </div>        
        </div>

      </AnimatedView>
    );
  }
}

export default Customers;
