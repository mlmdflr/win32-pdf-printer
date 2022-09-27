import throwIfUnsupportedOperatingSystem from "../utils/throw-if-unsupported-os";
import isValidPrinter from "../utils/windows-printer-valid";
import { execSync } from "node:child_process";
import { decode } from "iconv-lite";

export interface Printer {
  deviceId: string;
  name: string;
}

function getDefaultPrinter(): Printer | null {
  try {
    throwIfUnsupportedOperatingSystem();

    const stdout = execSync(
      `Powershell.exe -Command Get-CimInstance Win32_Printer -Property DeviceID,Name -Filter Default=true`,
      { encoding: "utf8" }
    );

    const printer = stdout.trim();

    // If stdout is empty, there is no default printer
    if (!stdout) return null;

    const { isValid, printerData } = isValidPrinter(printer);

    // DeviceID or Name not found
    if (!isValid) return null;

    return printerData;
  } catch (error) {
    throw error;
  }
}

export const getDefaultPrinterDecode = (encoding: string = "cp936") => {
  try {
    throwIfUnsupportedOperatingSystem();

    const stdout = execSync(
      `Powershell.exe -Command Get-CimInstance Win32_Printer -Property DeviceID,Name -Filter Default=true`,
      { encoding: "buffer" }
    );

    const printer = decode(stdout, encoding).trim();

    // If stdout is empty, there is no default printer
    if (!stdout) return null;

    const { isValid, printerData } = isValidPrinter(printer);

    // DeviceID or Name not found
    if (!isValid) return null;

    return printerData;
  } catch (error) {
    throw error;
  }
};

export default getDefaultPrinter;
