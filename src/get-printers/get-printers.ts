import { execSync } from "node:child_process";
import throwIfUnsupportedOperatingSystem from "../utils/throw-if-unsupported-os";
import type { Printer } from "../types";
import fixPathForAsarUnpack from "../utils/electron-util";
import path from "node:path";

function getPrinters(paperSizeInfoPath?: string): Printer[] {
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

export default getPrinters;
