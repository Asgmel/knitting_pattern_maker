import { ConverterSettings, ColorReplacement } from "./converter.types"
import { Jimp } from "jimp";

type JimpType = InstanceType<typeof Jimp>;

export async function runConversion(converterSettings: ConverterSettings) {
  try {
    const originalImage = await Jimp.read(converterSettings.inputFilePath);

    const originalWidth = originalImage.bitmap.width;
    const originalHeight = originalImage.bitmap.height;

    const newWidth = originalWidth * converterSettings.patternScale + (originalWidth - 1) * converterSettings.borderSize;
    const newHeight = originalHeight * converterSettings.patternScale + (originalHeight - 1) * converterSettings.borderSize;

    let newImage = new Jimp({ width: newWidth, height: newHeight, color: 0x000000FE });

    // process each pixel in the original image
    for (let y = 0; y < originalHeight; y++) {
      for (let x = 0; x < originalWidth; x++) {
        const originalColor = originalImage.getPixelColor(x, y).toString();
        console.log(originalColor)
        const anchorX = x * (converterSettings.patternScale + converterSettings.borderSize);
        const anchorY = y * (converterSettings.patternScale + converterSettings.borderSize);


        for (let replacement of converterSettings.colorReplacements) {
          if (originalColor === replacement.from && replacement.to === "circle") {
            newImage = transform_pixel_circle(newImage, anchorX, anchorY, converterSettings.patternScale, converterSettings.iconSize, replacement)
          }
          else if (originalColor === replacement.from && replacement.to === "dot") {
            newImage = transform_pixel_dot(newImage, anchorX, anchorY, converterSettings.patternScale, converterSettings.iconSize, replacement)
          }
          else if (originalColor === replacement.from && replacement.to === "cross") {
            newImage = transform_pixel_cross(newImage, anchorX, anchorY, converterSettings.patternScale, converterSettings.iconSize, replacement)
          }
          else if (originalColor === replacement.from && replacement.to === "line") {
            newImage = transform_pixel_line(newImage, anchorX, anchorY, converterSettings.patternScale, converterSettings.iconSize, replacement)
          }
          else if (originalColor === replacement.from && replacement.to === "hex") {
            newImage = transform_pixel_color(newImage, anchorX, anchorY, converterSettings.patternScale, replacement)
          }
          else {
            newImage = transform_pixel_default(newImage, anchorX, anchorY, converterSettings.patternScale)
          }
        }
      }
    }
    // Save the new image
    await newImage.write(`${converterSettings.outputFolderPath}/processedImage.png`);
    return `Image processed and saved to ${converterSettings.outputFolderPath}/processedImage.png`
  } catch (err) {
    return `Error processing image: ${err}`
  }
}

function transform_pixel_circle(
  image: JimpType,
  anchorX: number,
  anchorY: number,
  patternScale: number,
  iconSize: number,
  colorReplacement: ColorReplacement
): JimpType {
  return image
}

function transform_pixel_dot(
  image: JimpType,
  anchorX: number,
  anchorY: number,
  patternScale: number,
  iconSize: number,
  colorReplacement: ColorReplacement
): JimpType {
  return image
}

function transform_pixel_cross(
  image: JimpType,
  anchorX: number,
  anchorY: number,
  patternScale: number,
  iconSize: number,
  colorReplacement: ColorReplacement
): JimpType {
  return image
}

function transform_pixel_line(
  image: JimpType,
  anchorX: number,
  anchorY: number,
  patternScale: number,
  iconSize: number,
  colorReplacement: ColorReplacement
): JimpType {
  return image
}

function transform_pixel_color(
  image: JimpType,
  anchorX: number,
  anchorY: number,
  patternScale: number,
  colorReplacement: ColorReplacement
): JimpType {
  return image
}

function transform_pixel_default(
  image: JimpType,
  anchorX: number,
  anchorY: number,
  patternScale: number,
): JimpType {
  return image
}
