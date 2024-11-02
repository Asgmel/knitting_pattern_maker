// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  openDirectory: (): Promise<string | null> => {
    return ipcRenderer.invoke('dialog:open-directory');
  },
  openFile: (): Promise<string | null> => {
    return ipcRenderer.invoke('dialog:open-file');
  },
});
