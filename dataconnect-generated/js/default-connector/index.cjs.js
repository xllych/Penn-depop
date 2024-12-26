const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'penn-marketplace',
  location: 'northamerica-northeast1'
};
exports.connectorConfig = connectorConfig;

