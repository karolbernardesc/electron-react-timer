const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 400, // Largura fixa
    height: 400, // Altura fixa
    resizable: false, // Impede redimensionamento
    fullscreenable: false, // Impede modo tela cheia
    maximizable: false, // Impede maximizar
    minimizable: true, // Permite minimizar
    movable: true, // Permite arrastar a janela
    autoHideMenuBar: true, // Oculta a barra de menus
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // Remove a barra de menus completamente
  Menu.setApplicationMenu(null);

  // Verifica se está rodando em desenvolvimento ou produção
  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:5173');
  } else {
    win.loadFile(path.join(__dirname, 'dist', 'index.html'));
  }
}

app.whenReady().then(createWindow);

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
