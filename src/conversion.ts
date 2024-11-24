import { ConverterSettings } from "./converter.types"
import { Jimp } from "jimp";

export const runConversion = async (converterSettings: ConverterSettings) => {
  try {
    const originalImage = await Jimp.read(converterSettings.inputFilePath);

    const originalWidth = originalImage.bitmap.width;
    const originalHeight = originalImage.bitmap.height;

    const newWidth = originalWidth * converterSettings.patternScale + (originalWidth - 1) * converterSettings.borderSize;
    const newHeight = originalHeight * converterSettings.patternScale + (originalHeight - 1) * converterSettings.borderSize;

    const newImage = new Jimp({ width: newWidth, height: newHeight, color: 0x000000FE });

    const tempcolors = new Set([])

    // process each pixel in the original image
    for (let y = 0; y < originalHeight; y++) {
      pixelLoop:
      for (let x = 0; x < originalWidth; x++) {
        const originalcolor = originalImage.getPixelColor(x, y);
        tempcolors.add(`#${originalcolor.toString(16).padStart(6, '0')}`)

        const destX = x * (converterSettings.patternScale + converterSettings.borderSize);
        const destY = y * (converterSettings.patternScale + converterSettings.borderSize);

        const colorsToReplace = converterSettings.colorReplacements.map((colorReplacement) => colorReplacement.from.toUpperCase())

        // Replace pixels with signs and other colors based on settings
        for (let color of colorsToReplace) {
          if (color.toLowerCase() === `#${originalcolor.toString(16).slice(0, 6).toLowerCase()}`) {
            for (let dy = 0; dy < converterSettings.patternScale; dy++) {
              for (let dx = 0; dx < converterSettings.patternScale; dx++) {
                newImage.setPixelColor(0x000000FF, destX + dx, destY + dy)
              }
            }
            continue pixelLoop
          }
        }

        // default scale up pixels if they are not replaced
        for (let dy = 0; dy < converterSettings.patternScale; dy++) {
          for (let dx = 0; dx < converterSettings.patternScale; dx++) {
            newImage.setPixelColor(originalcolor, destX + dx, destY + dy);
          }
        }
      }
    }
    console.log("Colors: ", tempcolors)
    // Save the new image
    await newImage.write(`${converterSettings.outputFolderPath}/processedImage.png`);
    return `Image processed and saved to ${converterSettings.outputFolderPath}/processedImage.png`
  } catch (err) {
    return `Error processing image: ${err}`
  }
}
