import { createSelector } from 'reselect';
import {
  sendingRateKey,
  buildVer,
  buildName
} from '../../config/metricsConfig';
const metrics = state => state.payload;

const getMetricsKey = createSelector([metrics], metrics => {
  return Object.keys(metrics);
}) 
const getAppIds = createSelector([metrics, getMetricsKey], (metrics, metricsKey) => {
  if (metricsKey.length) {
    return metricsKey;
  }
});

export const getTextAndValueOfAppId = createSelector([getAppIds], appIds => {
  if (appIds) {
    return appIds.map(appId => {
      return {text: appId, value: appId};
    })
  }
  return [];
})

export const getCurrentSendingRates = createSelector([metrics, getAppIds], (metrics, appIds) => {
  if (appIds && appIds.length) {
    console.log(metrics[appIds[0]])
    return metrics[appIds[0]];
  }
})

export const getAvgSendingRates = createSelector([metrics, getMetricsKey], (metrics, metricsKey) => {
  if (metricsKey && metricsKey.length) {
    const avgSendingRates = [];
    for (let appID in metrics) {
      let avgSendingRate = metrics[appID]
        .map(metric => metric[sendingRateKey])
        .reduce((sum, value) => {
          if (typeof value === 'number') {
            return sum + value;
          } else {
            return sum;
          }
        }, 0)
      avgSendingRates.push({
        appID,
        [sendingRateKey]: avgSendingRate
      })
    }
    return avgSendingRates;
  }
});

export const getBuildName = createSelector([metrics, getMetricsKey], (metrics, metricsKey) => {
  if (metricsKey) {
    let buildNames = [];
    for(let metric in metrics) {
      metrics[metric].map(stats => {
        const buildName = stats[buildName];
        if (buildName && buildNames.indexOf(buildName) !== -1) {
          buildNames.push(buildName)
        }
      });
    }
    return buildNames;
  };
})

export const getBuildVer = createSelector([metrics, getMetricsKey], (metrics, metricsKey) => {
  if (metricsKey) {
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
export const getAvgSendingRatesPerBuildNameAndBuildVer = createSelector([metrics, getMetricsKey], (metrics, metricsKey) => {
  if (metricsKey && metricsKey.length) {
    return metrics;
  }
  return metrics;
})