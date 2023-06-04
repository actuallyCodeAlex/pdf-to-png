import chalk from "chalk";
import fs from "fs";
import { convert } from "pdf-img-convert";
import sharp from "sharp";

const inputPath = "/Users/alex/Documents/GitHub/pdf-to-png/input";
const outputPath = "/Users/alex/Documents/GitHub/pdf-to-png/output";

/**
 * @description Converts a single .pdf file to a .png file.
 * @param {string} fileName Name of the file to convert
 * @example convertFile('my-file.pdf');
 */
const convertFile = async (fileName) => {
  const fullPath = `${inputPath}/${fileName}`;
  const pages = await convert(fullPath);
  const buffer = pages[0];

  const adjustedFileName = fileName.replace(".pdf", ".png");
  const adjustedPath = `${outputPath}/${adjustedFileName}`;

  fs.writeFile(adjustedPath, buffer, (error) => {
    if (error) console.error(error);
    console.log(chalk.greenBright(`Output file written successfully -- ${adjustedPath}`));
  });
};

const main = async () => {
  // 1. Get contents of directory
  console.log(chalk.blueBright("Reading directory contents ..."));
  fs.readdir(inputPath, { withFileTypes: false }, async (error, files) => {
    if (error) {
      console.error(error);
      return;
    }

    // 2. Filter to only .pdf files
    const onlyPdfFiles = files.filter((file) => file.includes(".pdf"));
    console.log(chalk.greenBright("Directory contents read successfully"));

    // 3. Convert .pdf to .png
    console.log(chalk.blueBright("Converting .pdf's into .png's ..."));
    for (let i = 0; i < onlyPdfFiles.length; i++) {
      const fileName = onlyPdfFiles[i];
      await convertFile(fileName);
    }
  });
};

main();
