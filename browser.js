var sqlite3 = require('sqlite3').verbose();

module.exports.getAccounts = function (dataPath, browser) {
  var database = new sqlite3.Database(
    dataPath,
    sqlite3.OPEN_READONLY,
    function (err) {
      if (err !== null) {
        console.log(err);
      }
    }
  );

  var accounts = [{}];

  database.all('SELECT * FROM logins', function (err, rows) {
    if (err) {
      console.log(err);
    }

    for (var index = 0; index < rows.length; index++) {
      var row = rows[index];
      
      accounts.push({
        origin: row.origin_url,
        username: row.username_value,
        password: row.password_value
      });
    }

    console.log(accounts);
  });
  
  // database.each('SELECT * FROM logins', function (err, row) {
  //   if (err) {
  //     console.log(err);

  //     return;
  //   }

  //   accounts.push({
  //     origin: row.origin_url,
  //     username: row.username_value,
  //     password: row.password_value
  //   });

  //   console.log(accounts)
  // });
};