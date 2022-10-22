# Node.js PDF printing

A utility to print PDF files from Node.js and Electron.

Enhancements in [`pdf-to-printer`](https://github.com/artiebits/pdf-to-printer) to support all printers and to handle some `Chinese encoding`

- `Supports all printers`
- Works on Windows only

If you are looking for a utility that will work on **Unix-like operating systems**, then take a look
at https://github.com/artiebits/unix-print.

- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [API](#api)
  - [`.print(pdf[, options]) => void`](#printpdf-options--void)
  - [`.getPrinters() => Printer[]`](#getprinters--printer)
  - [`.getPaperSize(printer:string) => string[]`](#getpapersizeprinterstring--string)
  - [`.getDefaultPrinter() => Printer | null`](#getdefaultprinter--printer--null)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

Install using [`yarn`](https://yarnpkg.com/):

```bash
yarn add win32-pdf-printer
```

Or [`npm`](https://www.npmjs.com/):

```bash
npm install --save win32-pdf-printer
```

## Basic Usage

You can see the [test](https://github.com/mlmdflr/win32-pdf-printer/tree/main/test) folder for details

## API

A function to print a PDF document.

### `.print(pdf[, options]) => void`

**Arguments**

1. `pdf` (`string`, Required): A path to the PDF file you want to print. Will throw an error if PDF not specified or not found.
2. `options` (`Object`, Optional):
   - `printer` ( `string`, Optional): Send a file to the specified printer.
   - `pages` (`string`, Optional): Specifies which pages to print in the PDF document.
   - `subset` (`string`, Optional): Will print odd pages only when value is `odd`. Will print even pages only when `even`.
   - `orientation` (`string`, Optional): Can provide 90-degree rotation of contents (NOT the rotation of paper which must be pre-set by the choice of printer defaults).
   - `scale` (`string`, Optional): Supported names `noscale`, `shrink` and `fit`.
   - `monochrome` (`boolean`, Optional): Prints the document in black and white. Default is `false`.
   - `side` (`string`, Optional): Supported names `duplex`, `duplexshort`, `duplexlong` and `simplex`.
   - `bin` (`string`, Optional): Select tray to print to. Number or name.
   - `paperSize` (`string`, Optional): Specifies the paper size. Supported names `A2`, `A3`, `A4`, `A5`, `A6`, `letter`, `legal`, `tabloid`, `statement`.
   - `silent` (`boolean`, Optional): Silences SumatraPDF's error messages.
   - `printDialog` (`boolean`, Optional): displays the Print dialog for all the files indicated on this command line.
   - `copies`(`number`, Optional): Specifies how many copies will be printed.
   - `sumatraPdfPath`(`string`, Optional): Specify the path manually.

**Examples**

To print a PDF file to the default printer:

```javascript
import { print } from "win32-pdf-printer";

print("assets/pdf-sample.pdf");
```

To print to a specific printer:

```javascript
import { print } from "win32-pdf-printer";

const options = {
  printer: "Zebra",
};

print("assets/pdf-sample.pdf", options);
```

Example with a few print settings. It will print pages 1, 3, 5 and scale them so that they fit into the printable area of the paper.

```javascript
import { print } from "win32-pdf-printer";

const options = {
  printer: "Zebra",
  pages: "1-3,5",
  scale: "fit",
};

print("assets/pdf-sample.pdf", options);
```

### `.getPrinters() => Printer[]`

A function to get a list of available printers.

**Returns**

`Printer[]`: a list of available printers.

**Examples**

```javascript
import { getPrinters } from "win32-pdf-printer";

console.log(getPrinters());
```

### `.getPaperSize(printer:string) => string[]`

Get the set of paper sizes supported by the print driver

**Returns**

`string[]`: supported paperSizes.

**Examples**

```javascript
import { getPaperSize, getDefaultPrinter } from "win32-pdf-printer";

console.log(getPaperSize(getDefaultPrinter().name));
```

### `.getDefaultPrinter() => Printer | null`

A function to get the default printer info.

**Returns**

`Printer | null`: the default printer info, or `null` if there is no default printer.

**Examples**

```javascript
import { getDefaultPrinter } from "win32-pdf-printer";

console.log(getDefaultPrinter());
```

## License

[MIT](LICENSE)
