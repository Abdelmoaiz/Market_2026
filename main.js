const { app, BrowserWindow } = require('electron');
const path = require('path');
require('./databaseServer/server'); // افترض أنها تعالج أخطاء الاتصال

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1500,
    height: 800,
    resizable: true,
    icon: path.join(__dirname, 'imgLogo/19.png'), // يفضل PNG شفاف
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // استخدام preload لتأمين Node.js
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadFile('index.html');

  // افتح DevTools فقط في وضع التطوير
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
