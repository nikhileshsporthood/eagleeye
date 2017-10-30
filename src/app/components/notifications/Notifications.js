// @flow weak

import React              from 'react';
import NotificationPanel  from './notificationPanel/NotificationPanel';
import Notification       from './notification/Notification';

const Notifications = () => (
  <NotificationPanel>


    <Notification type={'success'}>
      <span>
        <strong>
          Well done!
        </strong>
        Sample message
      </span>
    </Notification>

    <Notification type={'info'}>
      <span>
        <strong>
          Info
        </strong>
        Not so important
      </span>
    </Notification>

    <Notification type={'warning'}>
      <span>
        <strong>
          Warning!
        </strong>
        Need attention
      </span>
    </Notification>
    
    <Notification type={'danger'}>
      <span>
        <strong>
          Danger
        </strong>
        Something is messed up
      </span>
    </Notification>    

  </NotificationPanel>
);

export default Notifications;
