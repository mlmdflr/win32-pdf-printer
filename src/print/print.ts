//This print api uses SumatraPDF and will comply with gplv3.
import path from "path";
import fs from "fs";
import fixPathForAsarUnpack from "../utils/electron-util";
import throwIfUnsupportedOperatingSystem from "../utils/throw-if-unsupported-os";
import { execSync } from "node:child_process";
import type { PrintOptions } from "../types";

const validSubsets = ["odd", "even"];
const validOrientations = ["portrait", "landscape"];
const validScales = ["noscale", "shrink", "fit"];
const validSides = ["duplex", "duplexshort", "duplexlong", "simplex"];

export default function print(pdf: string, options: PrintOptions = {}): void {
  throwIfUnsupportedOperatingSystem();
  if (!pdf) throw "No PDF specified";
  if (!fs.existsSync(pdf)) throw "No such file";

  let sumatraPdf =
    options.sumatraPdfPath || path.join(__dirname, "SumatraPDF.exe");
  if (!options.sumatraPdfPath) sumatraPdf = fixPathForAsarUnpack(sumatraPdf);

  const args: string[] = [];

  const { printer, silent, printDialog } = options;

  if (printDialog) {
    args.push("-print-dialog");
  } else {
    if (printer) {
      args.push("-print-to", `"${printer}"`);
    } else {
      args.push("-print-to-default");
    }
    if (silent !== false) {
      args.push("-silent");
    }
  }
  let printSettings = getPrintSettings(options);

  if (printSettings.length) {
    args.push("-print-settings", printSettings.join(","));
  }

  args.push(`"${pdf}"`);

  try {
    execSync(`${sumatraPdf} ${args.join(" ")}`);
  } catch (error) {
    throw error;
  }
}

function getPrintSettings(options: PrintOptions): string[] {
  const {
    pages,
    subset,
    orientation,
    scale,
    monochrome,
    side,
    bin,
    paperSize,
    copies,
  } = options;

  const printSettings = [];

  pages && printSettings.push(pages);

  if (subset) {
    if (validSubsets.includes(subset)) {
      printSettings.push(subset);
    } else {
      throw `Invalid subset provided. Valid names: ${validSubsets.join(", ")}`;
    }
  }

  if (orientation) {
    if (validOrientations.includes(orientation)) {
      printSettings.push(orientation);
    } else {
      throw `Invalid orientation provided. Valid names: ${validOrientations.join(
        ", "
      )}`;
    }
  }

  if (scale) {
    if (validScales.includes(scale)) {
      printSettings.push(scale);
    } else {
      throw `Invalid scale provided. Valid names: ${validScales.join(", ")}`;
    }
  }

  if (monochrome) {
    printSettings.push("monochrome");
  } else if (monochrome === false) {
    printSettings.push("color");
  }

  if (side) {
    if (validSides.includes(side)) {
      printSettings.push(side);
    } else {
      throw `Invalid side provided. Valid names: ${validSides.join(", ")}`;
    }
  }

  bin && printSettings.push(`bin=${bin}`);

  paperSize && printSettings.push(`paper="${paperSize}"`);

  copies && printSettings.push(`${copies}x`);

  return printSettings;
}
