const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const defaultLoginDataPath = path.join(process.env.LOCALAPPDATA, '\\Google\\Chrome\\User Data\\Default\\Login Data');
const defaultCookiesPath = path.join(process.env.LOCALAPPDATA, '\\Google\\Chrome\\User Data\\Default\\Cookies');
const defaultHistoryPath = path.join(process.env.LOCALAPPDATA, '\\Google\\Chrome\\User Data\\Default\\History');

/**
 * Returns saved login data from the Google Chrome web browser.
 * @param {Boolean} limited - Return only important information.
 * @param {String} loginDataPath - Custom path for login data, if it's not specified a default path will be used.
 * @returns {Object[]} An array of saved logins
 */
module.exports.getLoginData = function (limited, loginDataPath) {
  if (!loginDataPath) {
    loginDataPath = defaultLoginDataPath;
  }

  const database = new sqlite3.Database(loginDataPath, sqlite3.OPEN_READONLY, function (error) {
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

        if (limited) {
          loginData.push({
            originUrl: row.origin_url,
            username: row.username_value,
            password: row.password_value
          });
        } else {
          loginData.push(row);
        }
      }

      console.log(loginData);
    });
  });
};

/**
 * Returns saved cookies from the Google Chrome web browser.
 * @param {Boolean} limited - Return only important information.
 * @param {String} cookiesPath - Custom path for cookies, if it's not specified a default path will be used.
 * @returns {Object[]} An array of saved cookies
 */
module.exports.getCookies = function (limited, cookiesPath) {
  if (!cookiesPath) {
    cookiesPath = defaultCookiesPath;
  }

  const database = new sqlite3.Database(cookiesPath, sqlite3.OPEN_READONLY, function (error) {
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

        if (limited) {
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
        } else {
          cookies.push(row);
        }
      }

      console.log(cookies);
    });
  });
};

/**
 * Returns saved history from the Google Chrome web browser.
 * @param {Boolean} limited - Return only important information.
 * @param {String} historyPath - Custom path for history, if it's not specified a default path will be used.
 * @returns {Object[]} An array of history entries
 */
module.exports.getHistory = function (limited, historyPath) {
  if (!historyPath) {
    historyPath = defaultHistoryPath;
  }

  const database = new sqlite3.Database(historyPath, sqlite3.OPEN_READONLY, function (error) {
    if (error) {
      console.error(error);

      return;
    }

    database.all('SELECT * FROM urls', function (error, rows) {
      if (error) {
        console.error(error);

        return;
      }

      let history = [{}];

      for (let index = 0; index < rows.length; index++) {
        let row = rows[index];

        if (limited) {
          history.push({
            id: row.id,
            url: row.url,
            title: row.title,
            visits: row.visit_count,
            lastVisit: row.last_visit_time
          });
        } else {
          history.push(row);
        }
      }

      console.log(history);
    });
  });
};