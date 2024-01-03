export { default as print } from "./print/print";
export { default as getPrinters } from "./get-printers/get-printers";

export { default as getDefaultPrinter } from "./get-default-printer/get-default-printer";

export {
  getPaperSizeInfo,
  getPaperSizeInfoAll,
} from "./get-paper-size/get-paper-size-info";

export type {
  PrintOptions,
  Printer,
  PaperSizeType,
  PaperSizesInfoType,
  paperSizeInfoOptions,
} from "./types";
