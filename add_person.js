/* eslint-disable no-console */
const settings = require("./settings"); // settings.json
var knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.password,
    password : settings.password,
    database : settings.database
  }
});

const query = process.argv.slice(2)[0];

if (query === 'create') {
  let firstname = process.argv.slice(2)[1];
  let surname = process.argv.slice(2)[2];
  let date = process.argv.slice(2)[3];
  createFamous(firstname, surname, date);
}

function createFamous(firstname, surname, date) {
  knex('famous_people').insert({first_name: firstname, last_name: surname, birthdate: date})
    .asCallback(function(err, result) {
      if (err){
        console.log('error:', err);
      }
      else {
        console.log('Entry added to database');
      }
      knex.destroy();
    });
}