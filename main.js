const { app, BrowserWindow, globalShortcut } = require('electron');
const path = require('path');

function createWindow() {
    let win = new BrowserWindow({
        width: 1280,
        height: 720,
        minWidth: 1280,
        minHeight: 720,
        show: false,
        icon: path.join(__dirname, 'favicon.ico'),
        webPreferences: {
            nodeIntegration: false
        }
    })

    globalShortcut.register('F11', () => {
        win.setFullScreen(!win.isFullScreen());
    });

    globalShortcut.register('CommandOrControl+Shift+I', () => {
        if (win.webContents.isDevToolsOpened()) win.webContents.closeDevTools();
        else win.webContents.openDevTools();
    });

    win.maximize();
    win.setMenu(null);

    win.loadFile('index.html');
    win.show();

    win.on('closed', () => {
        win = null;
    })
}

app.whenReady().then(() => {
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})
  
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
})