/* eslint-disable no-console */
const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }

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

  if (query === 'update'){
    let newName = process.argv.slice(2)[2];
    let id = process.argv.slice(2)[1];
    update(newName, id);
  }

  if (query === 'delete'){
    let id = process.argv.slice(2)[1]
    deletePerson(id);
  }

});

function createFamous(firstname, surname, date) {
  client.query('INSERT INTO famous_people (first_name, last_name, birthdate) VALUES ($1, $2, $3)', [firstname, surname, date], (err, res) =>{
    if (err){
      console.log('error adding new entries')
      return false;
    }
    console.log('Entry added to database')
    client.end();
  })
}

function readFirstName(firstname){
  client.query("SELECT * FROM famous_people WHERE first_name = $1", [firstname] , (err, result) => {
    if (err) {
      return console.error("error reading first name", err);
    }
    console.log('Searching...')
    console.log (`Found ${Object.keys(result.rows).length} person(s) by the name ${firstname}`)
    for (let i = 1; i <=Object.keys(result.rows).length; i++){
      let person = result.rows[i-1];
      console.log(`-${i}: ${person.first_name} ${person.last_name}, born ${person.birthdate}`);
    }
    
    client.end(); 
  })
}

function listAll(){
  client.query("SELECT * FROM famous_people", (err, res) => {
    if (err) {
      console.log("Error listing database", err)
      return false
    }
    console.log(res.rows)
    client.end()
  })
}


function update(newName, id){
  client.query("UPDATE famous_people SET name=$1 WHERE id=$2", [newName, id], (err, res) => {
    if (err) {
      console.log("ERR:", err)
      return false
    }
    console.log(res.rows)
    client.end()
  })
}

function deletePerson(id){
  client.query("DELETE FROM famous_people WHERE id=$1", [id], (err, res) => {
  if (err) {
    console.log("Error deleting person with id", err)
    return false
  }
  console.log("Deleted")
  client.end()
  })
}
