var mysql      = require('./node_modules/mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1234',
  database : 'biezuomeng',
});

connection.connect();

connection.query('SELECT tag_name from bzm_tag where id=1', function(err, rows, fields) {
  if (err) throw err;

  console.log('The solution is: ', rows[0].tag_name);
});

connection.end();