const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const process = require('child_process');
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

function openFolder(key) {
  let dirpath = path.join(__dirname, `../snap/${key}`)
  console.log(dirpath)
  let res = []
  try {
    res = fs.readdirSync(dirpath)
  } catch (error) {
    console.log(error)
    res = []
  }
  return res
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    autoHideMenuBar: true,
    fullscreen: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, './index.html'))

  ipcMain.on("toggle", () => {
    // console.log(com)
    mainWindow.setFullScreen(!mainWindow.fullScreen)
  })
  ipcMain.on("getPhoto", (event, key) => {
    // console.log(com)
    let photos = openFolder(key)
    console.log(photos)
    event.sender.send("photo", { photos, key })
  })

  // 执行游戏
  ipcMain.on("play", (event, data) => {
    console.log(data)
    process.exec(`mame ${data}`, function (error, stdout, stderr) {
      if (error !== null) {
        console.log('exec error: ' + error);
        event.sender.send("error", error)
      }
    });
  })

  ipcMain.on("loading", (event) => {
    let romspath = path.join(__dirname, './roms.json');
    let roms = JSON.parse(fs.readFileSync(romspath));

    event.sender.send("roms", roms)
    let photos = openFolder("kov3")
    event.sender.send("photo", { photos, key: "kov3" })
  })
  ipcMain.on("exit", (event) => {
    app.quit()
  })
  // mainWindow.webContents.openDevTools()
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
