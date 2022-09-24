// Taken from https://github.com/sindresorhus/electron-util/blob/master/node.js

const isElectron = "electron" in process.versions;

const isUsingAsar =
  isElectron && require.main && require.main.filename.includes("app.asar");

function fixPathForAsarUnpack(path: string): string {
  return isUsingAsar ? path.replace("app.asar", "app.asar.unpacked") : path;
}

export default fixPathForAsarUnpack;
