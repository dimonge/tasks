import {
  RECEIVED_STATISTICS,
  GET_SENDING_RATE_PER_APPID,
  GET_BUILD_VER,
  GET_BUILD_NAME,
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
    case RECEIVED_STATISTICS:
      const payload = processMetrics(action.payload);
      return nextState(state, {
        payload: nextState(state.payload, payload)
      });
    case GET_SENDING_RATE_PER_APPID:
      return nextState(state, {
        selectedSendingRate: action.appId
      });
    case GET_MEDIA_TYPE_PER_APPID:
      return nextState(state, {
        selectedAppIDForMediaType: action.appId
      });
    case GET_BUILD_VER: 
      return nextState(state, {
        selectedBuildVer: action.buildVer
      })
    case GET_BUILD_NAME: 
      return nextState(state, {
        selectedBuildName: action.buildName
      });
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