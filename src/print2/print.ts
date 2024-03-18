import path from "path";
import fs from "fs";
import fixPathForAsarUnpack from "../utils/electron-util";
import throwIfUnsupportedOperatingSystem from "../utils/throw-if-unsupported-os";
import { execSync } from "node:child_process";

export default function print(
  pdf: string,
  printer: string,
  pdf2printerPath?: string
): void {
  throwIfUnsupportedOperatingSystem();
  if (!pdf) throw "No PDF specified";
  if (!fs.existsSync(pdf)) throw "No such file";

  let pdf2printer = pdf2printerPath || path.join(__dirname, "pdf2printer.exe");
  if (!pdf2printerPath) pdf2printerPath = fixPathForAsarUnpack(pdf2printer);

  try {
    execSync(`${pdf2printer} ${printer} ${pdf}`);
  } catch (error) {
    throw error;
  }
}
