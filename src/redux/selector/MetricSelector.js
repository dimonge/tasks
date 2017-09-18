import { createSelector } from 'reselect';
import {
  sendingRateKey,
  buildVer,
  buildName,
  mediaType
} from '../../config/metricsConfig';

const metrics = state => state.payload;
const selectedSendingRate = state => state.selectedSendingRate;
const selectedAppIDForMediaType = state => state.selectedAppIDForMediaType;
const selectedBuildName = state => state.buildName;
const selectedBuildVer = state => state.buildVer;

const getMetricsKey = createSelector([metrics], metrics => {
  return Object.keys(metrics);
}) 
const getAppIds = createSelector([metrics], (metrics) => {
  if (Object.keys(metrics).length) {
    return Object.keys(metrics);
  }
  return [];
});

const getDefaultAppID = createSelector([metrics, getAppIds], (metrics, appID) => {
  if (appID && appID.length) {
    return appID[0];
  }
  return null;
}); 

export const getTextAndValueOfAppId = createSelector([getAppIds], appIds => {
  if (appIds && appIds.length) {
    return appIds.map(appId => {
      return {text: appId, value: appId};
    })
  }
  return [];
});

export const getAllBuildVer = createSelector([metrics, getAppIds], (metrics) => {
  if (appIds && appIds.length) {
    for(let appID in metrics) {
      let allBuildVer = metrics[appID].map((metric) => {
        if (metric[buildVer] && metric[buildVer].length) {
          return metric[buildVer]
        }
      });
      return allBuildVer.filter((buildVer, index, self) => {
        if (buildVer) {
          return self.indexOf(buildVer) === index;
        }
      });
    }
  }
});

function getUniqueOptions(metrics) {
  for(let appID in metrics) {
    let allBuildVer = metrics[appID].map((metric) => {
      if (metric[buildVer] && metric[buildVer].length) {
        return metric[buildVer]
      }
    });
    return allBuildVer.filter((buildVer, index, self) => {
      if (buildVer) {
        return self.indexOf(buildVer) === index;
      }
    });
  }
}
const getAllBuildName = createSelector([metrics, getAppIds], (metrics, appIds) => {

})

export const getTextAndValueOfBuildVer = createSelector([getAllBuildVer], buildVers => {
  if (buildVers && buildVers.length) {
    return buildVers.map(buildVer => {
      return {text: buildVer, value: buildVer};
    })
  }
  return [];
})



export const getCurrentSendingRates = 
  createSelector([metrics, getAppIds, getDefaultAppID, selectedSendingRate], (metrics, appIds, defaultAppID, selectedSendingRate) => {
  if (appIds && appIds.length) {
    if (selectedSendingRate){
      return metrics[selectedSendingRate];
    }
    return metrics[defaultAppID];
  }
})

export const getAvgSendingRates = createSelector([metrics, getAppIds], (metrics, appIDs) => {
  if (appIDs && appIDs.length) {
    const avgSendingRates = [];
    for (let appID in metrics) {
      let sendingRates = metrics[appID]
        .map(metric => metric[sendingRateKey])
      
      const totalSendingRate = sendingRates.length;
      let sumSendingRate = sendingRates.reduce((sum, value) => {
          if (typeof value === 'number') {
            return sum + value;
          } else {
            return sum;
          }
        }, 0)
      avgSendingRates.push({
        appID,
        [sendingRateKey]: sumSendingRate / totalSendingRate
      })
    }
    return avgSendingRates;
  }
});

export const getAvgSendingRatesPerBuildNameAndBuildVer
  = createSelector([metrics, getAppIds, getAllBuildVer, selectedBuildName, selectedBuildVer], 
                      (metrics, appIDs, getAllBuildVer, selectedBuildName, selectedBuildVer) => {
  if (appIDs && appIDs.length) {
    let avgSendingRatesPerBuildNamesAndBuildVer = [];
    const defaultBuildName = metrics[defaultAppID[buildName]];
    const defaultBuildVer = getAllBuildVer[0];
    for(let appID in metrics) {

      let sendingRatePerBuildNameAndBuildVer = metrics[appID].map(metric => {
        const buildName = metric[buildName];
        const buildVer = metric[buildVer];
        if (buildName === selectedBuildName && buildVer === selectedBuildVer) {
          return metric[sendingRateKey];
        } else if (buildName === defaultBuildName && buildVer === defaultBuildVer) {
          return metric[sendingRateKey];
        }
      });
      let totalSendingRatePerBuildNameAndBuildVer = sendingRatePerBuildNameAndBuildVer.length;
      let sumSendingRatePerBuildNameAndBuildVer = sendingRatePerBuildNameAndBuildVer.reduce((sum, value) => {
        if (typeof value === 'number') {
          return sum + value;
        } else {
          return sum;
        }
      }, 0)
      avgSendingRatesPerBuildNamesAndBuildVer.push({
        appID,
        [sendingRateKey]: sumSendingRatePerBuildNameAndBuildVer / totalSendingRatePerBuildNameAndBuildVer
      })
    return avgSendingRatesPerBuildNamesAndBuildVer;
    }    
  };
})

export const getBuildVer = createSelector([metrics, getAppIds], (metrics, appIDs) => {
  if (appIDs && appIDs.length) {
    let buildVers = [];
    for(let metric in metrics) {
      metrics[metric].map(stats => {
        const buildVer = stats[buildVer];
        if (buildVer && buildVers.indexOf(buildVer) !== -1) {
          buildVers.push(buildVer);
        }
      });
    }
    return buildVers;
  };
})
export const getTotalMediaTypes = 
  createSelector([metrics, getAppIds, getDefaultAppID, selectedAppIDForMediaType], 
                  (metrics, appIDs, defaultAppID, selectedAppID) => {
  if (appIDs && appIDs.length) {
    if (selectedAppID) {
      return getMediaTypes(metrics, selectedAppID)
    }
    return getMediaTypes(metrics, defaultAppID);
  }
  return [];
});

function getMediaTypes(metrics, appId) {
  let mediaTypes = metrics[appId].map(metric => {
    return metric[mediaType];
  }).reduce((sum, value) => {
    if (value) {
      sum[value] = ++sum[value] || 1;
      return sum;
    }
    return sum;    
  }, {})

  return Object.keys(mediaTypes).map(mediaType => {
    return {name: mediaType, value: mediaTypes[mediaType]};
  })

}