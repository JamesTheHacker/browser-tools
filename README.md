# <img src="https://upload.wikimedia.org/wikipedia/commons/2/24/Chromium_Material_Icon-256x256.png" width="60px" align="center" alt="Chromium logo"> browser-tools for Chromium

A Node.js package that can retrieve data from the user data directory in Chromium. Examples of this type of data are: accounts, history, and cookies. It is supposed to work on Windows, macOS, and Linux operating systems but the default location for the user data directory varies.

## Building
You'll need [Node.js](https://nodejs.org) installed on your computer in order to build this app.

```bash
$ git clone https://github.com/Phoqe/browser-tools
$ cd browser-tools
$ npm install
```

If you don't wish to clone, you can [download the source code](https://github.com/Phoqe/browser-tools/archive/master.zip).

## User Data Directory
Every public function has a parameter where you can specify a custom path for the user data file you want to access, I've gathered some paths here from [the Chromium website](https://www.chromium.org/user-experience/user-data-directory).

### Windows 10 / 8 / 7
- **Google Chrome**: C:\Users\%USERNAME%\AppData\Local\Google\Chrome\User Data\Default
- **Chromium**: C:\Users\%USERNAME%\AppData\Local\Chromium\User Data\Default

### Mac OS X
- **Google Chrome**: ~/Library/Application Support/Google/Chrome/Default
- **Chromium**: ~/Library/Application Support/Chromium/Default

### Linux
- **Google Chrome**: ~/.config/google-chrome/Default
- **Chromium**: ~/.config/chromium/Default

### Chrome OS
- /home/chronos/

## Contributing
Feel free to send PRs and create issues regarding anything pretty much. An example on what you can do is adding more browsers to the private getBrowserPath function.
