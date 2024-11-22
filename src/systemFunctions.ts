import { dialog } from "electron";
import { ConverterSettings } from "./converter.types";

export const openDirectory = async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openDirectory'],
  });
  if (canceled) {
    return null;
  } else {
    return filePaths[0];
  }
}

export const openFile = async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openFile'],
  });
  if (canceled) {
    return null;
  } else {
    return filePaths[0];
  }
}

export const runConversion = async (converterSettings: ConverterSettings) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Pattern created at: ${converterSettings.outputFolderPath}`);
    }, 2000); // Simulates a 2-second delay
  });
}
