const electron = require('electron');
const {app, BrowserWindow, Menu, ipcMain} = electron;
let mainWindow;
let devMode = true;


// Listen for app to be ready
app.on('ready', function(){
    // Create new window
    mainWindow = new BrowserWindow({
		icon: __dirname + '/Images/WyvernIcon.ico',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    mainWindow.removeMenu();
    // Load html in window
    mainWindow.loadFile('main.html');
    mainWindow.maximize();
    if(devMode){
        // Open the DevTools.
        mainWindow.webContents.openDevTools();
    }
});

if(devMode){
    // Enable live reload for all the files inside your project directory
    require('electron-reload')(__dirname);
}