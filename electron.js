require('dotenv').config();
require('electron-debug');

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

const IP = process.env.IP;
const PORT = process.env.PORT;

function createWindow() {
  mainWindow = new BrowserWindow({width: 900, height: 680, fullscreen: true});
  mainWindow.loadURL(`http://${IP}:${PORT}`);
  mainWindow.webContents.on('did-finish-load', async () => {
    console.log('Page was saved successfully.');
    mainWindow.webContents.enableDeviceEmulation({screenPosition: 'mobile'});
  });
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});