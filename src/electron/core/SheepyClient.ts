import { readFileSync } from 'fs';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const ipcMain = electron.ipcMain;
const dialog = electron.dialog;

export class SheepyClient {

  window: any;

  constructor() { }

  run(): void {
    app.on('ready', () => {
      this.createWindow();
    });

    app.on('window-all-closed', () => {
      // Apple shit going on
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });

    app.on('activate', () => {
      // Some more apple shit....
      if (!window) {
        this.createWindow();
      }
    });
  }

  createWindow(): void {
    this.window = new BrowserWindow({
      width: 960,
      height: 600,
      frame: false
    });

    this.window.loadURL('file://' + __dirname + '/index.html');

    this.window.on('closed', () => {
      this.window = null;
    });
  }
}
