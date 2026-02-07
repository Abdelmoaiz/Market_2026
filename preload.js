const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  sendUser: (data) => ipcRenderer.send('userNameView', data),
  receive: (channel, callback) => {
    ipcRenderer.on(channel, (event, args) => callback(args));
  }
});
