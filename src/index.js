const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the main menu window.
  const menuWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'src', 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // Load the menu HTML file.
  menuWindow.loadFile(path.join(__dirname, 'src', 'menu.html'));

  // Open DevTools for debugging.
  menuWindow.webContents.openDevTools();

  // Listen for game start event.
  ipcMain.on('start-game', () => {
    // Create the game window when "START" is clicked.
    const gameWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'src', 'preload.js'),
        contextIsolation: true,
        nodeIntegration: false,
      },
    });
    gameWindow.loadFile(path.join(__dirname, 'src', 'game.html'));
  });

  // Listen for the exit event to close the app.
  ipcMain.on('exit-app', () => {
    app.quit();
  });
};

// Initialize the app.
app.whenReady().then(createWindow);

// Quit the app when all windows are closed (except on macOS).
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
