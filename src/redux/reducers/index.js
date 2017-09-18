import {
  REQUEST_STATISTICS,
  RECEIVED_STATISTICS,
  GET_SENDING_RATE_PER_APPID,
  GET_AVG_SENDING_RATE_ACROSS_APPIDS,
  GET_BUILD_VER,
  GET_MEDIA_TYPE_PER_APPID
} from '../actions/MetricsAction';

const initialState = {
  payload: [],
  selectedSendingRate: null,
  selectedBuildName: null,
  selectedBuildVer: null,
  selectedAppIDForMediaType: null
}
export default function getAverageId(state = initialState, action) {
  switch(action.type) {
    case REQUEST_STATISTICS: 
      return Object.assign({}, state, {
        isFetchingStats: true
      })
    case RECEIVED_STATISTICS:
      const payload = processMetrics(action.payload);
      return Object.assign({}, state, {
        payload: Object.assign({}, state.payload, payload),
        isFetchingStats: false
      });
    case GET_SENDING_RATE_PER_APPID:
      return Object.assign({}, state, {
        selectedSendingRate: action.appId
      });
    case GET_AVG_SENDING_RATE_ACROSS_APPIDS:
      return state;
    case GET_MEDIA_TYPE_PER_APPID:
      return Object.assign({}, state, {
        selectedAppIDForMediaType: action.appId
      });
    case GET_BUILD_VER: 
      return nextState(state, {
        selectedBuildVer: action.buildVer
      })
    default:
      return state;
  }
}

function nextState(oldState, newState) {
  return Object.assign({}, oldState, newState);
}


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