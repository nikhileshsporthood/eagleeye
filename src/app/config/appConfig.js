// @flow weak

export const appConfig = {
  // dev mode to mock async data for instance
  DEV_MODE: true,
  // When you need some kind "console spam" to debug
  DEBUG_ENABLED: true,
  // fake delay to mock async
  FAKE_ASYNC_DELAY: 1000,


  APP_NAME: 'EagleEye',

  // connection status text references
  CONNECTION_STATUS: {
    online: 'online',
    disconnected: 'disconnected'
  },
  // eaningGraph config
  earningGraph: {
    data: {
      API: 'eagleeye/getRevenueData'
    }
  },
  teamMates:{
    data: {
      API: 'api/teamMates'
    }
  },
  statsWidget:{
    data: {
      API: 'eagleeye/getTableData'
    }
  },
  statsTable:{
    data: {
      API: 'eagleeye/getTableData',
      tables: {
        "revenue_per_month": "7501",
        "customers_per_month": "7502",
        "batch_health" : "7520",
        "active_customers_list" : "7530",
        "sessions_list" : "7540"
      }
    }
  },  
  statsCard:{
    data: {
      API: 'eagleeye/getStatsCard'
    }
  },  
  locationMenu:{
    data: {
      API: 'eagleeye/getCenters/'
    }
  },
  // userInfos config
  userInfos: {
    data: {
      API: 'api/userInfos'
    }
  },

  HELLO_WORD: 'Hello'

};
