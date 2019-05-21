// Update with your config settings.
const settings = require("./settings"); 

// "user": "development",
// "password": "development",
// "database": "test_db",
// "hostname": "localhost",
// "port": 5432,
// "ssl": true

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: settings.database,
      user:     settings.user,
      password: settings.password
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: settings.database,
      user:     settings.user,
      password: settings.password
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: settings.database,
      user:     settings.user,
      password: settings.password
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
