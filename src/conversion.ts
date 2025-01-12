import { ConverterSettings, ColorReplacement } from "./converter.types"
import { Jimp } from "jimp";

type JimpType = InstanceType<typeof Jimp>;

export async function runConversion(converterSettings: ConverterSettings) {
  try {
    const originalImage = await Jimp.read(converterSettings.inputFilePath);

    const originalWidth = originalImage.bitmap.width;
    const originalHeight = originalImage.bitmap.height;
    const whitespaceSize = 100

    const newWidthScale = originalWidth * converterSettings.patternScale
    const newWidthBorder = (originalWidth - 1) * converterSettings.borderSize
    const newWidthBorderIncrements = Math.floor(originalWidth / 5) * converterSettings.borderSize; // Every 5th border
    const newWidth = newWidthScale + newWidthBorder + newWidthBorderIncrements + whitespaceSize

    const newHeightScale = originalHeight * converterSettings.patternScale
    const newHeightBorder = (originalHeight - 1) * converterSettings.borderSize
    const newHeightBorderIncrements = Math.floor(originalHeight / 5) * converterSettings.borderSize; // Every 5th border
    const newHeight = newHeightScale + newHeightBorder + newHeightBorderIncrements + whitespaceSize

    let newImage = new Jimp({ width: newWidth, height: newHeight, color: 0x000000FF });

    for (let y = 0; y < originalHeight; y++) {
      for (let x = 0; x < originalWidth; x++) {
        let match = false
        const originalColor = originalImage.getPixelColor(x, y);
        console.log(originalColor)
        // Anchor = position * (scale + borderwidth) + extra borderwidth for every 5th line
        const anchorX = x * (converterSettings.patternScale + converterSettings.borderSize) + Math.floor(x / 5) * converterSettings.borderSize;
        const anchorY = y * (converterSettings.patternScale + converterSettings.borderSize) + Math.floor(y / 5) * converterSettings.borderSize;


        for (let replacement of converterSettings.colorReplacements) {
          const replacementFrom = parseInt(replacement.from.slice(1) + "FF", 16)

          if (originalColor === replacementFrom && replacement.to === "circle") {
            newImage = transform_pixel_circle(newImage, anchorX, anchorY, converterSettings.patternScale, converterSettings.iconSize)
            match = true
            break
          }
          else if (originalColor === replacementFrom && replacement.to === "dot") {
            newImage = transform_pixel_dot(newImage, anchorX, anchorY, converterSettings.patternScale, converterSettings.iconSize)
            match = true
            break
          }
          else if (originalColor === replacementFrom && replacement.to === "cross") {
            newImage = transform_pixel_cross(newImage, anchorX, anchorY, converterSettings.patternScale, converterSettings.iconSize)
            match = true
            break
          }
          else if (originalColor === replacementFrom && replacement.to === "line") {
            newImage = transform_pixel_line(newImage, anchorX, anchorY, converterSettings.patternScale, converterSettings.iconSize,)
            match = true
            break
          }
          else if (originalColor === replacementFrom && replacement.to === "hex") {
            newImage = transform_pixel_color(newImage, anchorX, anchorY, converterSettings.patternScale, replacement)
            match = true
            break
          }
        }

        if (!match) {
          newImage = transform_pixel_default(newImage, anchorX, anchorY, converterSettings.patternScale, originalColor)
        }
      }
    }

    // Set right and bottom margin to white for numbering of lines
    for (let y = 0; y < newImage.bitmap.height; y++) {
      for (let x = 0; x < newImage.bitmap.width; x++) {
        if (y > newImage.bitmap.height - whitespaceSize || x > newImage.bitmap.width - whitespaceSize) {
          console.log(x, y, "Replacing color")
          newImage.setPixelColor(0xFFFFFFFF, x, y)
        }
      }
    }
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
): JimpType {
  console.log("Processing Circle")
  const centerX = anchorX + (patternScale / 2)
  const centerY = anchorY + (patternScale / 2)

  for (let y = anchorY; y < anchorY + patternScale; ++y) {
    for (let x = anchorX; x < anchorX + patternScale; ++x) {
      const distanceX = Math.abs(x - centerX)
      const distanceY = Math.abs(y - centerY)
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

      if (distance >= Math.floor(patternScale / 4) - Math.floor(iconSize / 2) && distance <= Math.floor(patternScale / 4) + iconSize) {
        image.setPixelColor(0x000000FF, x, y)
      } else {
        image.setPixelColor(0xFFFFFFFF, x, y)
      }
    }
  }
  return image
}

function transform_pixel_dot(
  image: JimpType,
  anchorX: number,
  anchorY: number,
  patternScale: number,
  iconSize: number,
): JimpType {
  console.log("Processing Dot")
  const centerX = anchorX + (patternScale / 2)
  const centerY = anchorY + (patternScale / 2)

  for (let y = anchorY; y < anchorY + patternScale; ++y) {
    for (let x = anchorX; x < anchorX + patternScale; ++x) {
      const distanceX = Math.abs(x - centerX)
      const distanceY = Math.abs(y - centerY)
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

      if (distance <= iconSize * 2) {
        image.setPixelColor(0x000000FF, x, y)
      } else {
        image.setPixelColor(0xFFFFFFFF, x, y)
      }
    }
  }
  return image
}

function transform_pixel_cross(
  image: JimpType,
  anchorX: number,
  anchorY: number,
  patternScale: number,
  iconSize: number,
): JimpType {
  console.log("Processing Cross")
  const centerX = anchorX + (patternScale / 2)
  const centerY = anchorY + (patternScale / 2)

  for (let y = anchorY; y < anchorY + patternScale; ++y) {
    for (let x = anchorX; x < anchorX + patternScale; ++x) {
      const distanceCenterX = Math.abs(x - centerX)
      const distanceCenterY = Math.abs(y - centerY)

      if ((distanceCenterX <= iconSize && distanceCenterY < (patternScale / 2) - 2) || distanceCenterY <= iconSize && distanceCenterX < (patternScale / 2) - 4) {
        image.setPixelColor(0x000000FF, x, y)
      } else {
        image.setPixelColor(0xFFFFFFFF, x, y)
      }
    }
  }
  return image
}

function transform_pixel_line(
  image: JimpType,
  anchorX: number,
  anchorY: number,
  patternScale: number,
  iconSize: number,
): JimpType {
  console.log("Processing Line")
  const centerX = anchorX + (patternScale / 2)
  const centerY = anchorY + (patternScale / 2)

  for (let y = anchorY; y < anchorY + patternScale; ++y) {
    for (let x = anchorX; x < anchorX + patternScale; ++x) {
      if (Math.abs(x - centerX) < patternScale * 2 && Math.abs(y - centerY) <= iconSize) {
        image.setPixelColor(0x000000FF, x, y)
      } else {
        image.setPixelColor(0xFFFFFFFF, x, y)
      }
    }
  }
  return image
}

function transform_pixel_color(
  image: JimpType,
  anchorX: number,
  anchorY: number,
  patternScale: number,
  colorReplacement: ColorReplacement
): JimpType {
  console.log("Processing Pixel Color")
  for (let y = anchorY; y < anchorY + patternScale; ++y) {
    for (let x = anchorX; x < anchorX + patternScale; ++x) {
      console.log(`Transforming pixel x:${x}, y:${y} to color ${parseInt(colorReplacement.to + "FF", 16)}`)
      image.setPixelColor(parseInt(colorReplacement.to + "FF", 16), x, y)
    }
  }
  return image
}

function transform_pixel_default(
  image: JimpType,
  anchorX: number,
  anchorY: number,
  patternScale: number,
  color: number
): JimpType {
  console.log("Processing Pixel Color")
  for (let y = anchorY; y < anchorY + patternScale; ++y) {
    for (let x = anchorX; x < anchorX + patternScale; ++x) {
      image.setPixelColor(color, x, y)
    }
  }
  return image
}
