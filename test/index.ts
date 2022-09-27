import { join } from "node:path";
import {
  getPrintersDecode,
  getPaperSizeDecode,
  getDefaultPrinterDecode,
  print,
} from "../dist";

for (const iterator of getPrintersDecode())
  console.log(iterator, getPaperSizeDecode(iterator.deviceId));

let DefaultPrinter = getDefaultPrinterDecode()?.deviceId!;

let DefaultPrinterPaperSize = getPaperSizeDecode(DefaultPrinter)[0];

console.log(DefaultPrinterPaperSize);

print(join(__dirname, "mlmdflr.pdf"), {
  printer: DefaultPrinter,
  paperSize: DefaultPrinterPaperSize,
});
