// Script to generate version.json with a build timestamp
// Place this in your build process (e.g., as an npm script)

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const version = {
  version: new Date().toISOString(),
};

const outputDir = path.join(__dirname, "..", "static");
const outputPath = path.join(outputDir, "version.json");

console.log("debug", {
  outputDir,
  outputPath,
});

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(version, null, 2), "utf-8");

console.log(`Generated version.json at ${outputPath}`);
