// Update with your config settings.
'use strict';

module.exports = {
  local: {
    client: 'postgresql',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: '',
      database: 'basic_auth'
    },
    pool: {
      min: 2,
      max: 10
    },
    debug: false
  }
};