import throwIfUnsupportedOperatingSystem from "../utils/throw-if-unsupported-os";
import { execSync } from "node:child_process";
import path from "path";
import type { Printer } from "../types";
import fixPathForAsarUnpack from "../utils/electron-util";

function getDefaultPrinter(paperSizeInfoPath?: string): Printer | null {
  try {
    throwIfUnsupportedOperatingSystem();
    let Printer =
      paperSizeInfoPath || path.join(__dirname, "paper-size-info.exe");
    if (!paperSizeInfoPath) Printer = fixPathForAsarUnpack(Printer);
    const Parameter = `${Printer}`;
    return JSON.parse(execSync(Parameter).toString());
  } catch (error) {
    throw error;
  }
}

export default getDefaultPrinter;
