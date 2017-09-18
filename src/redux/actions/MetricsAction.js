import $ from 'jquery';
/**
 * Actions 
 */
export const REQUEST_STATISTICS = 'REQUEST_STATISTICS';
export const RECEIVED_STATISTICS = 'RECEIVED_STATISTICS';

export const GET_SENDING_RATE_PER_APPID = 'GET_SENDING_RATE_PER_APPID';
export const GET_BUILD_VER = 'GET_BUILD_VER';

export const GET_AVG_SENDING_RATE_ACROSS_APPIDS = 'GET_AVG_SENDING_RATE_ACROSS_APPIDS';
//export const GET_AVG_SENDING_RATE_OF_BUILD_NAME_AND_BUILD_VER 
//  = 'GET_AVG_SENDING_RATE_OF_BUILD_NAME_AND_BUILD_VER';
export const GET_MEDIA_TYPE_PER_APPID = 'GET_MEDIA_TYPE_PER_APPID';



/**
 * Action creators
 */

/*
function processMetrics(metrics) {
  let transformMetrics = {};

  metrics.forEach(row => {
    const appID = row.appID;
    if (!transformMetrics[appID]) {
      transformMetrics[appID] = [row];
    } else {
      transformMetrics[appID] = transformMetrics[appID].concat(row);
    }
  });
  return transformMetrics;
}
*/

export function fetchStatistics() {
  return (dispatch) => {
    dispatch(requestStatistics());
    $.ajax({
      url: '/metrics.csv',
      type: 'GET',
      dataType: 'text', 
      success: function(data) {
        window.Papa.parse(data, {
          delimiter: "\t",
          header: true,
          worker: true,
          preview: 5000,
          dynamicTyping: true,
          complete: function(results) {
            if (results.data) {
              dispatch(receivedStatistics(results.data));
            }
          },
          error: function(error) {
            console.log(error);
          }
        })
      }
    })
  }
}

function requestStatistics() {
  return {
    type: REQUEST_STATISTICS
  }
}

function receivedStatistics(payload) {
  return {
    type: RECEIVED_STATISTICS,
    payload
  };
}

/**
 * 
 * @param {*returns appId} 
 * @param {*returns the metrics related to }
 */
export function getSendingRatePerAppId(appId) {
  return {
    type: GET_SENDING_RATE_PER_APPID,
    appId
  }
}

export function getAvgSendingRateAcrossAppIds() {
  return {
    type: GET_AVG_SENDING_RATE_ACROSS_APPIDS
  };
}

export function getBuildVer(buildVer) {
  return {
    type: GET_BUILD_VER,
    buildVer
  }
}

export function getMediaTypePerAppId(appId) {
  return {
    type: GET_MEDIA_TYPE_PER_APPID,
    appId
  }
}


