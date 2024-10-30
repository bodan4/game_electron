const { ipcMain } = require('electron');
ipcMain.on('start-game', () => mainWindow.loadFile(path.join(__dirname, 'src/game.html')));
ipcMain.on('exit-game', () => app.quit());
