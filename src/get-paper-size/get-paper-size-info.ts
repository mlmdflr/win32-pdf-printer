import path from "path";
import { execSync } from "node:child_process";
import fixPathForAsarUnpack from "../utils/electron-util";
import throwIfUnsupportedOperatingSystem from "../utils/throw-if-unsupported-os";
import type { paperSizeInfoOptions, PaperSizesInfoType } from "../types";

/**
 * 获取指定打印机所支持的纸张大小,如果想获取默认打印机纸张大小 options.printer 请使用空字符
 * Get the paper size supported by the specified printer, if you want to get the default printer paper size options.printer Please use a blank character
 */
export const getPaperSizeInfo = (
  options: paperSizeInfoOptions = { printer: "" }
): PaperSizesInfoType | null => {
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

/**
 * 获取所有打印机所支持的纸张大小
 * Get the paper size supported by all printers
 * @returns all paperSize
 */
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
