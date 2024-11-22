// src/global.d.ts

import { ConverterSettings } from "./converter.types";

export { };

declare global {
  interface Window {
    api: {
      // Define the methods and properties available on window.api
      // For example:
      openDirectory: () => Promise<string | null>;
      openFile: () => Promise<string | null>;
      runConversion: (converterSettings: ConverterSettings) => Promise<string | null>;
      // Add other methods as needed
    };
  }
}

