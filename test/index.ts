import { join } from "node:path";
import {
  print,
  getPaperSizeInfoAll,
  getPaperSizeInfo,
  getDefaultPrinter,
  getPrinters,
} from "../dist";

// 获取默认打印机支持的纸张大小
let DefaultPrinterPaperSizeInfo = getPaperSizeInfo();

// 获取指定打印机支持的纸张大小
// let PrinterPaperSizeInfo = getPaperSizeInfo({ printer: '\\\\192.168.0.126\\HP LaserJet Tank 1020 PCLmS (V3)' });

// 获取默认打印机名称
let DefaultPrinterName = getDefaultPrinter()?.PrinterName;

// 获取所有打印机名称信息
let AllPrinterName = getPrinters();

// 打印测试
print(join(__dirname, "mlmdflr.pdf"), {
  printer: DefaultPrinterName,
  paperSize: DefaultPrinterPaperSizeInfo?.PaperSizes[0].PaperName,
});

// 打印所有打印机支持的纸张大小
console.log(JSON.stringify(getPaperSizeInfoAll()));
