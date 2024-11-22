export interface ColorReplacement {
  from: string;
  to: string;
}

export interface ConverterSettings {
  inputFilePath: string;
  outputFolderPath: string;
  patternScale: number;
  borderSize: number;
  iconSize: number;
  colorReplacements: ColorReplacement[];
  printActual: boolean;
  printA3: boolean;
  printA4: boolean;
  printA5: boolean;
}
