console.log("Hello world!");

const { app, BrowserWindow, Menu, screen } = require('electron')

const createWindow = () => {
  const primaryDisplay = screen.getPrimaryDisplay()
  const { width, height } = primaryDisplay.workAreaSize

  const win = new BrowserWindow({width, height})

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  Menu.setApplicationMenu(null);

  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
    if (process.platform !== "darwin") app.quit()
})