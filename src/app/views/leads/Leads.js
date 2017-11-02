// flow weak

import React, {
  PureComponent
}                         from 'react';
import PropTypes          from 'prop-types';
import {
  StatsTable,AnimatedView
}                         from '../../components';

class Leads extends PureComponent {
  static propTypes = {
    actions: PropTypes.shape({
    })
  };

  componentWillMount() {
    const { actions: { enterPage } } = this.props;
    enterPage('Leads');
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
    leavePage('Leads');
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
          </div>        
        </div>
      </AnimatedView>
    );
  }
}

export default Leads;
