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

if (query === 'read') {
  let firstname = process.argv.slice(2)[1];
  readFirstName(firstname);
} 

if (query === 'list'){
  listAll();
}

// if (query === 'update'){
//   let newName = process.argv.slice(2)[2];
//   let id = process.argv.slice(2)[1];
//   update(newName, id);
// }

// if (query === 'delete'){
//   let id = process.argv.slice(2)[1]
//   deletePerson(id);
// }


function createFamous(firstname, surname, date) {
  knex('famous_people').insert({first_name: firstname, last_name: surname, birthdate: date}).returning('id')
    .asCallback(function(err, result) {
      console.log('error:', err);
      console.log('result:', result);
      console.log('Entry added to database');
      knex.destroy();
    });
}

function readFirstName(firstname){
  knex.select().from('famous_people')
    .where('first_name','=', firstname)
    .then((result) => {
      console.log (`Found ${Object.keys(result).length} person(s) by the name ${firstname}`)
      for (let i = 1; i <=Object.keys(result).length; i++){
        let person = result[i-1];
        console.log(`- ${i}: ${person.first_name} ${person.last_name}, born ${person.birthdate}`);
      }
      knex.destroy();
    })
    console.log('Searching...') 
}

function listAll(){
  knex.select().from('famous_people').then((result) => {console.log(result); knex.destroy();})
  
}


// function update(newName, id){
//   client.query("UPDATE famous_people SET name=$1 WHERE id=$2", [newName, id], (err, res) => {
//     if (err) {
//       console.log("ERR:", err)
//       return false
//     }
//     console.log(res.rows)
//     client.end()
//   })
// }

// function deletePerson(id){
//   client.query("DELETE FROM famous_people WHERE id=$1", [id], (err, res) => {
//   if (err) {
//     console.log("Error deleting person with id", err)
//     return false
//   }
//   console.log("Deleted")
//   client.end()
//   })
// }
