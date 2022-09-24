import { getDefaultPrinter, getPrinters, print } from "../dist";
import { join } from "path";

getDefaultPrinter().then(console.log)

getPrinters().then(console.log)

print(join(__dirname, 'mlmdflr.pdf'))