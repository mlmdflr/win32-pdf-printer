import { execSync } from "node:child_process";
import isValidPrinter from "../utils/windows-printer-valid";
import throwIfUnsupportedOperatingSystem from "../utils/throw-if-unsupported-os";
import { Printer } from "../get-default-printer/get-default-printer";
import { decode } from "iconv-lite";

function stdoutHandler(stdout: Buffer, encoding: string | null = null) {
  const printers: Printer[] = [];
  if (!encoding) {
    stdout
      .toString()
      .split(/(\r?\n){2,}/)
      .map((printer) => printer.trim())
      .filter((printer) => !!printer)
      .forEach((printer) => {
        const { isValid, printerData } = isValidPrinter(printer);
        if (!isValid) return;
        printers.push(printerData);
      });
  } else {
    decode(stdout, encoding)
      .split(/(\r?\n){2,}/)
      .map((printer) => printer.trim())
      .filter((printer) => !!printer)
      .forEach((printer) => {
        const { isValid, printerData } = isValidPrinter(printer);
        if (!isValid) return;
        printers.push(printerData);
      });
  }
  return printers;
}

function getPrinters(): Printer[] {
  try {
    throwIfUnsupportedOperatingSystem();
    const stdout = execSync(
      "Powershell.exe -Command Get-CimInstance Win32_Printer -Property DeviceID,Name"
    );
    return stdoutHandler(stdout);
  } catch (error) {
    throw error;
  }
}

export function getPrintersDecode(encoding: string = "cp936"): Printer[] {
  try {
    throwIfUnsupportedOperatingSystem();
    const stdout = execSync(
      "Powershell.exe -Command Get-CimInstance Win32_Printer -Property DeviceID,Name"
    );
    return stdoutHandler(stdout, encoding);
  } catch (error) {
    throw error;
  }
}

export default getPrinters;
