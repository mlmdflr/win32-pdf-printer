import { execSync } from "node:child_process";
import { decode } from "iconv-lite";
import throwIfUnsupportedOperatingSystem from "../utils/throw-if-unsupported-os";

const RegBinPath =
  process.arch === "ia32" &&
  process.env.hasOwnProperty("PROCESSOR_ARCHITEW6432")
    ? "%windir%\\sysnative\\cmd.exe /c %windir%\\System32"
    : "%windir%\\System32";

const RegPrintersPath = `HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\Print\\Printers`;

const RegQueryParmeter = `printMediaSupported`;

const getPaperSize = (printer: string) => {
  throwIfUnsupportedOperatingSystem();

  const Parameter =
    `${RegBinPath}\\REG.exe ` +
    `QUERY "${RegPrintersPath}\\${printer}\\DsDriver" ` +
    `/v ${RegQueryParmeter}`;
  try {
    return execSync(Parameter)
      .toString()
      .split("REG_MULTI_SZ")[1]
      .replace(/\r+|\n+|\s+/gi, "")
      .split("\\0");
  } catch (error) {
    throw error;
  }
};

export const getPaperSizeDecode = (
  printer: string,
  encoding: string = "cp936"
) => {
  throwIfUnsupportedOperatingSystem();

  const Parameter =
    `${RegBinPath}\\REG.exe ` +
    `QUERY "${RegPrintersPath}\\${printer}\\DsDriver" ` +
    `/v ${RegQueryParmeter}`;
  try {
    return decode(execSync(Parameter, { encoding: "buffer" }), encoding)
      .split("REG_MULTI_SZ")[1]
      .replace(/\r+|\n+|\s+/gi, "")
      .split("\\0");
  } catch (error) {
    throw error;
  }
};

export default getPaperSize;
