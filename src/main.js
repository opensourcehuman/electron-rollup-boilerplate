import electron from "electron";
import path from "path";
import url from "url";

import isDev from "./lib/isDev";

const { app, BrowserWindow } = electron;

const windowStyles = {
  width: 800,
  height: 600,
  minWidth: 800,
  minHeight: 600,

  center: true,
  title: "Your App Name"
};

let mainWindow;

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  if (isSecondInstance) app.quit();
  return createWindow();
});

app.on("activate", () => {
  // Re-create a window in the app when the dock icon
  // is clicked and there are no other windows open
  if (!mainWindow) return createWindow();
});

app.on("will-finish-launching", () => {
  // You would usually set up listeners for the `open-file` and `open-url`
  // events here, and start the crash reporter and auto updater
});

app.on("window-all-closed", () => {
  // if (process.platform !== "darwin") return app.quit();
  return app.quit();
});

// Second instance not allowed
const isSecondInstance = app.makeSingleInstance(
  (commandLine, workingDirectory) => {
    // eslint-disable-line
    if (mainWindow) {
      // Someone tried to run a second instance, we should focus our window.
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }

    return true;
  }
);

function createWindow() {
  // Create the browser window...
  mainWindow = new BrowserWindow(windowStyles);

  // ...and load the index.html of the app
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "..", "src", "index.html"),
      protocol: "file:",
      slashes: true
    })
  );

  mainWindow.webContents.on("did-finish-load", () => {
    if (isDev) {
      mainWindow.webContents.openDevTools({ mode: "bottom" });
      mainWindow.maximize();
    }
  });

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.on("closed", () => (mainWindow = null));
}
