import { app, BrowserWindow } from 'electron'

declare var __dirname: string
let mainWindow: Electron.BrowserWindow

//debugging
require('electron-debug')({ showDevTools: true })

function onReady() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  })

  const fileName = `file://${__dirname}/index.html`
  mainWindow.loadURL(fileName)
  mainWindow.on('close', () => app.quit())

  //debugging
  let installExtension = require('electron-devtools-installer')
  installExtension.default(installExtension.VUEJS_DEVTOOLS)
    .then(() => {})
    .catch((err:any) => {
      console.log('Unable to install `vue-devtools`: \n', err)
    })

}

app.on('ready', () => onReady())
app.on('window-all-closed', () => app.quit())
console.log(`Electron Version ${app.getVersion()}`)
