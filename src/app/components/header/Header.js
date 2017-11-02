// @flow weak

import React        from 'react';
import PropTypes    from 'prop-types';
import UserMenu     from './userMenu/UserMenu';
import TaskMenu     from './taskMenu/TaskMenu';
import MessageMenu  from './messageMenu/MessageMenu';
import Button       from './button/Button';
import ViewLink                             from '../../components/aside/asideLeft/menu/menuLinks/viewLink/ViewLink.js';

const Header = ({
  userLogin,
  userFirstname,
  userLastname,
  userPicture,
  showPicture,
  appName,
  currentView,
  toggleSideMenu,
  onLogout,
  sideMenu
}) => (
  <header
    className="header fixed--header">
    <a href="#"
      className="logo">
      { appName }
    </a>
    <nav
      className="navbar navbar-static-top"
      role="navigation">
      <Button
        toggleSideMenu={toggleSideMenu}
      />
    {/* 
      <div className="navbar-right">
        <ul className="nav navbar-nav">
          <MessageMenu />
          <TaskMenu />
          <UserMenu
            login={userLogin}
            firstname={userFirstname}
            lastname={userLastname}
            picture={userPicture}
            showUserPicture={showPicture}
            onLogout={onLogout}
          />
        </ul>
      </div>
    */}
    </nav>
    <div className="top-navigation-menu"><ul>
                <ViewLink
                  key={'1'}
                  isActive={true}
                  linkTo={'/'}
                  viewName={'Dashboard'}
                  faIconName={'fa-bar-chart'}
                  itemCount= { 0}
                />
                <ViewLink
                  key={'2'}
                  isActive={true}
                  linkTo={'/batchhealth'}
                  viewName={'Fixtures'}
                  faIconName={'fa-calendar'}
                  itemCount= { 0}
                />                 
                <ViewLink
                  key={'3'}
                  isActive={true}
                  linkTo={'/sessions'}
                  viewName={'Sessions'}
                  faIconName={'fa-futbol-o'}
                  itemCount= { 0}  
                />                
                <ViewLink
                  key={'4'}
                  isActive={true}
                  linkTo={'/customers'}
                  viewName={'Customers'}
                  faIconName={'fa-users'}
                  itemCount= { 0}
                />
                <ViewLink
                  key={'5'}
                  isActive={true}
                  linkTo={'/leads'}
                  viewName={'Leads'}
                  faIconName={'fa-address-card-o'}
                  itemCount= { 0}
                />                 
              </ul></div>                 
  </header>
);

Header.propTypes = {
  appName:        PropTypes.string,

  userLogin:      PropTypes.string,
  userFirstname:  PropTypes.string,
  userLastname:   PropTypes.string,
  userPicture:    PropTypes.string,
  showPicture:    PropTypes.bool,
  onLogout:       PropTypes.func,

  currentView:    PropTypes.string,
  toggleSideMenu: PropTypes.func
};

Header.defaultProps = {
  appName: 'applicationName'
};

Header.displayName = 'Header';

export default Header;
