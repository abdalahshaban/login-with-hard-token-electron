import { app, Tray, Menu, BrowserWindow } from 'electron';
import * as path from 'path';
const axios = require('axios').default
const server = require('./app.js');
const AutoLaunch = require('auto-launch');

let tray: Tray = null;
let mainWindow: BrowserWindow = null;

// Enable live reload for Electron too
require('electron-reload')(__dirname, {
    // Note that the path to electron may vary according to the main file
    electron: require(`${__dirname}/node_modules/electron`)
});

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
    app.quit();
} else {
    app.on('second-instance', (event, commandLine, workingDirectory) => {

        // Someone tried to run a second instance, we should focus our window.
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore()
            mainWindow.focus()
        }
    });

    app.on('ready', () => {
        app.setLoginItemSettings({
            openAtLogin: true,
            enabled: true,
        })
        createWindow()
    })
}

function createWindow() {

    mainWindow = new BrowserWindow({
        frame: false,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,  // false if you want to run 2e2 test with Spectron
            enableRemoteModule: true // true if you want to run 2e2 test  with Spectron or use remote module in renderer context (ie. Angular)
        },
    });


    mainWindow.loadURL('http://127.0.0.1:4000');
    mainWindow.hide();
    initTray();

}


function initTray() {

    tray = new Tray(path.join(__dirname, './assets/img/login.png'));
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'login',
            click: async () => {
                /**
                 * @desc send request to localhost to set date in token
                 */
                let checkedToken = await axios.post('http://127.0.0.1:4000/api/token/check', {})
                // console.log(checkedToken);
                if (!checkedToken) return 'no token insertd';

                let loginToken = await axios.post('http://127.0.0.1:4000/api/token/login', { pin: "11112222" })
                // console.log(loginToken);
                if (!loginToken) return 'error in login token';

                let getPublicKey = await axios.post('http://127.0.0.1:4000/api/token/get-public-key', { pin: "11112222" })
                // console.log(getPublicKey);
                if (!getPublicKey) return 'error in getPublicKey';
                return
            }
        },
        {
            label: 'Quit',
            type: 'normal',
            role: 'quit',
            toolTip: "will exit from app",
            click: function () {
                app.quit();
            }
        }
    ]);
    tray.setToolTip('User Driver');
    tray.setContextMenu(contextMenu);

}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('will-quit', (event) => {
    console.log('will-quit');
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});




