if (process.env.NODE_ENV === 'production') {
    //return the prod
    module.exports = require('./prod');
  } else {
    //return the dev keys
    module.exports = require('./dev');
  }
  