// @flow weak

import React, {
  Component
}                             from 'react';
import PropTypes              from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import * as actions           from '../../redux/modules/actions';
import {
  Header,
  // Footer,
  AsideLeft,
  AsideRight
}                             from '../../components';
import { Modals }             from '../../views';
import { appConfig }          from '../../config';
import { navigation }         from '../../models';
import MainRoutes             from '../../routes/MainRoutes';
import { withRouter }         from 'react-router';
import auth                   from '../../services/auth';
import UserIMG                from '../../img/user.jpg';

class App extends Component {
  static propTypes = {
    // react-router 4:
    match:    PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history:  PropTypes.object.isRequired,

    sideMenuIsCollapsed: PropTypes.bool,
    userInfos:  PropTypes.shape({
      login:       PropTypes.string,
      firstname:   PropTypes.string,
      lastname:    PropTypes.string,
      picture:     PropTypes.string,
      showPicture: PropTypes.bool
    }),
    locationMenu:  PropTypes.object,
    userIsConnected: PropTypes.bool,
    currentView:     PropTypes.string,

    actions: PropTypes.shape({
      fetchEarningGraphDataIfNeeded: PropTypes.func,
      fetchUserInfoDataIfNeeded:     PropTypes.func,
      fetchLocationMenuDataIfNeeded:     PropTypes.func,
      openSideMenu:   PropTypes.func,
      closeSideMenu:  PropTypes.func,
      toggleSideMenu: PropTypes.func
    })
  };

  state = {
    appName:          appConfig.APP_NAME,
    connectionStatus: appConfig.CONNECTION_STATUS,
    helloWord:        appConfig.HELLO_WORD
  };

  componentDidMount() {
    const {
      actions: {
        fetchUserInfoDataIfNeeded,
        fetchLocationMenuDataIfNeeded,
        fetchStatsWidgetDataIfNeeded,
        fetchStatsWidget2DataIfNeeded,        
        fetchStatsCardDataIfNeeded,
        fetchEarningGraphDataIfNeeded,
        getSideMenuCollpasedStateFromLocalStorage
      }
    } = this.props;

    fetchLocationMenuDataIfNeeded();
    // fetchUserInfoDataIfNeeded();
    getSideMenuCollpasedStateFromLocalStorage();
    // fetchEarningGraphDataIfNeeded(0);
    // fetchStatsCardDataIfNeeded(0);    
  }

  reloadData = (selectedLocation) => {
    const {
      actions: {
        fetchStatsCardDataIfNeeded,      
        fetchEarningGraphDataIfNeeded,
        getSideMenuCollpasedStateFromLocalStorage,
        changeLocation
      }
    } = this.props; 
    changeLocation(selectedLocation);
  };

  render() {
    const { appName, connectionStatus, helloWord } = this.state;
    const { userInfos, userIsConnected } = this.props;
    const { sideMenuIsCollapsed, currentView } = this.props;
    const {locationMenu} = this.props;

    const userFullName = `${userInfos.firstname} ${userInfos.lastname.toUpperCase()}`;
    return (
      <div>
        <Header
          appName={appName}
          userLogin={userInfos.login}
          userFirstname={userInfos.firstname}
          userLastname={userInfos.lastname}
          userPicture={UserIMG}
          showPicture={userInfos.showPicture}
          currentView={currentView}
          toggleSideMenu={this.handlesMenuButtonClick}
          onLogout={this.handlesOnLogout}
          sideMenu={navigation.sideMenu}
        />
        <div className="wrapper row-offcanvas row-offcanvas-left">
          <AsideLeft
            reloadData = {this.reloadData}
            locationMenu={locationMenu.data}
            isAnimated={true}
            sideMenu={navigation.sideMenu}
            currentView={currentView}
            isCollapsed={sideMenuIsCollapsed}
            helloWord={helloWord}
            connectionStatus={connectionStatus}
            userIsConnected={userIsConnected}
            username={userFullName}
            userPicture={userInfos.picture}
            showPicture={userInfos.showPicture}
          />
          <AsideRight
            isAnimated={true}
            isExpanded={sideMenuIsCollapsed}>
            <MainRoutes onEnter={this.requireAuth}/>
          </AsideRight>
        </div>
        {/* <Footer /> */}
        {/* modals cannot be placed anywhere (avoid backdrop or modal placement issues) so all grouped in same component and outside .wrapper*/}
        <Modals />
      </div>
    );
  }

  handlesMenuButtonClick = (event) => {
    event.preventDefault();
    const { actions: { toggleSideMenu } } = this.props;
    toggleSideMenu();
  }

  handlesOnLogout = (event: any) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    // clear all application storage
    auth.clearAllAppStorage();

    // redirect to login
    const { history } = this.props;
    history.push('/login');
  }
}

const mapStateToProps = (state) => {
  return {
    currentView:         state.views.currentView,
    sideMenuIsCollapsed: state.sideMenu.isCollapsed,
    userInfos:           state.userInfos.data,
    userIsConnected:     state.userInfos.isConnected,
    locationMenu:        state.locationMenu
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions : bindActionCreators(
      {...actions},
      dispatch)
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
