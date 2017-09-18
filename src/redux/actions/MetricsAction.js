import $ from 'jquery';
/**
 * Actions 
 */
export const RECEIVED_STATISTICS = 'RECEIVED_STATISTICS';

export const GET_SENDING_RATE_PER_APPID = 'GET_SENDING_RATE_PER_APPID';
export const GET_BUILD_VER = 'GET_BUILD_VER';
export const GET_BUILD_NAME = 'GET_BUILD_NAME';

export const GET_MEDIA_TYPE_PER_APPID = 'GET_MEDIA_TYPE_PER_APPID';



/**
 * Action creators
 */

export function fetchStatistics() {
  window.Papa.LocalChunkSize = 1024 * 1024;
  return (dispatch) => {
    $.ajax({
      url: '/metrics.csv',
      type: 'GET',
      dataType: 'text', 
      success: function(data) {
        window.Papa.parse(data, {
          delimiter: "\t",
          header: true,
          worker: true,
          dynamicTyping: true,
          chunk: function(results) {
            if (results.data) {
              dispatch(receivedStatistics(results.data));
            }
          },
          complete: function(results) {},
          error: function(error) {
            console.log(error);
          }
        })
      }
    })
  }
}



function receivedStatistics(payload) {
  return {
    type: RECEIVED_STATISTICS,
    payload
  };
}

/**
 * Action creator for sending the appId to the reducer to show the sending rates
 * @param {*appId}
 */
export function getSendingRatePerAppId(appId) {
  return {
    type: GET_SENDING_RATE_PER_APPID,
    appId
  }
}
/**
 * Action creator to handle change in build version number
 * @param {*buildVer} 
 */
export function getBuildVer(buildVer) {
  return {
    type: GET_BUILD_VER,
    buildVer
  }
}
/**
 * Action creator to handle change in build name
 * @param {*buildName}  
 */
export function getBuildName(buildName) {
  return {
    type: GET_BUILD_NAME,
    buildName
  }
}
/**
 * Action creator to handle change in appId to show the media types
 * @param {*appId}  
 */
export function getMediaTypePerAppId(appId) {
  return {
    type: GET_MEDIA_TYPE_PER_APPID,
    appId
  }
}


