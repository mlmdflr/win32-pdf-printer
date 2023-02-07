import path from "path";
import { execSync } from "node:child_process";
import { decode } from "iconv-lite";
import fixPathForAsarUnpack from "../utils/electron-util";
import throwIfUnsupportedOperatingSystem from "../utils/throw-if-unsupported-os";
import type { paperSizeInfoOptions, PaperSizesInfoType } from "../types";

export const getPaperSizeInfo = (
  options: paperSizeInfoOptions = {}
): PaperSizesInfoType => {
  throwIfUnsupportedOperatingSystem();

  let paperSizeInfo =
    options.paperSizeInfoPath || path.join(__dirname, "paper-size-info.exe");
  if (!options.paperSizeInfoPath)
    paperSizeInfo = fixPathForAsarUnpack(paperSizeInfo);

  const Parameter = options.printer
    ? `${paperSizeInfo} "${options.printer}"`
    : `${paperSizeInfo} `;

  try {
    return JSON.parse(execSync(Parameter).toString());
  } catch (error) {
    throw error;
  }
};

export const getPaperSizeInfoDecode = (
  options: paperSizeInfoOptions & { encoding: string } = { encoding: "cp936" }
): PaperSizesInfoType => {
  throwIfUnsupportedOperatingSystem();

  let paperSizeInfo =
    options.paperSizeInfoPath || path.join(__dirname, "paper-size-info.exe");
  if (!options.paperSizeInfoPath)
    paperSizeInfo = fixPathForAsarUnpack(paperSizeInfo);

  const Parameter = options.printer
    ? `${paperSizeInfo} "${options.printer}"`
    : `${paperSizeInfo} `;

  try {
    return JSON.parse(
      decode(execSync(Parameter, { encoding: "buffer" }), options.encoding)
    );
  } catch (error) {
    throw error;
  }
};

export const getPaperSizeInfoAll = (
  options: Omit<paperSizeInfoOptions, "printer"> = {}
): PaperSizesInfoType[] => {
  throwIfUnsupportedOperatingSystem();

  let paperSizeInfo =
    options.paperSizeInfoPath || path.join(__dirname, "paper-size-info.exe");
  if (!options.paperSizeInfoPath)
    paperSizeInfo = fixPathForAsarUnpack(paperSizeInfo);

  const Parameter = `${paperSizeInfo} --all`;

  try {
    return JSON.parse(execSync(Parameter).toString());
  } catch (error) {
    throw error;
  }
};

export const getPaperSizeInfoAllDecode = (
  options: Omit<paperSizeInfoOptions, "printer"> & { encoding: string } = {
    encoding: "cp936",
  }
): PaperSizesInfoType[] => {
  throwIfUnsupportedOperatingSystem();

  let paperSizeInfo =
    options.paperSizeInfoPath || path.join(__dirname, "paper-size-info.exe");
  if (!options.paperSizeInfoPath)
    paperSizeInfo = fixPathForAsarUnpack(paperSizeInfo);

  const Parameter = `${paperSizeInfo} --all`;

  try {
    return JSON.parse(
      decode(execSync(Parameter, { encoding: "buffer" }), options.encoding)
    );
  } catch (error) {
    throw error;
  }
};
