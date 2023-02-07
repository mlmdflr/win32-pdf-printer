# Node.js PDF printing

A utility to print PDF files from Node.js and Electron.

Enhancements in [`pdf-to-printer`](https://github.com/artiebits/pdf-to-printer) to support all printers and to handle
some `Chinese encoding`

- `Supports all printers`
- `Get detailed paper sizes`
- Works on Windows only

If you are looking for a utility that will work on **Unix-like operating systems**, then take a look
at https://github.com/artiebits/unix-print.

- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [API](#api)
    - [`.print(pdf[, options]) => void`](#printpdf-options--void)
    - `getPaperSizeInfo`
      - [`.getPaperSizeInfo([options]) => PaperSizesInfoType`](#getpapersizeinfoalloptions--papersizesinfotype)
      - [`.getPaperSizeInfoDecode([options]) => PaperSizesInfoType`](#getpapersizeinfodecodeoptions--papersizesinfotype)
      - [`.getPaperSizeInfoAll([options]) => PaperSizesInfoType[]`](#getpapersizeinfoalloptions--papersizesinfotype)
      - [`.getPaperSizeInfoAllDecode([options]) => PaperSizesInfoType[]`](#getpapersizeinfoalldecodeoptions--papersizesinfotype)
    - [`.getPrinters() => Printer[]`](#getPrinters)
    - [`.getPrintersDecode(encoding: string = "cp936") => Printer[]`](#getprintersdecodeencoding-string--cp936--printer)
    - [`.getPaperSize(printer:string) => string[]`](#getpapersizeprinterstring--string)
    - [`.getPaperSizeDecode(printer:string,encoding:string='cp936') => string[]`](#getpapersizedecodeprinterstringencodingstringcp936--string)
    - [`.getDefaultPrinter() => Printer | null`](#getdefaultprinter--printer--null)
    - [`.getDefaultPrinterDecode(encoding: string = "cp936") => Printer | null`](#getdefaultprinterdecodeencoding-string--cp936--printer--null)
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

1. `pdf` (`string`, Required): A path to the PDF file you want to print. Will throw an error if PDF not specified or not
   found.
2. `options` (`Object`, Optional):
    - `printer` ( `string`, Optional): Send a file to the specified printer.
    - `pages` (`string`, Optional): Specifies which pages to print in the PDF document.
    - `subset` (`string`, Optional): Will print odd pages only when value is `odd`. Will print even pages only
      when `even`.
    - `orientation` (`string`, Optional): Can provide 90-degree rotation of contents (NOT the rotation of paper which
      must be pre-set by the choice of printer defaults).
    - `scale` (`string`, Optional): Supported names `noscale`, `shrink` and `fit`.
    - `monochrome` (`boolean`, Optional): Prints the document in black and white. Default is `false`.
    - `side` (`string`, Optional): Supported names `duplex`, `duplexshort`, `duplexlong` and `simplex`.
    - `bin` (`string`, Optional): Select tray to print to. Number or name.
    - `paperSize` (`string`, Optional): Specifies the paper size. Supported
      names `A2`, `A3`, `A4`, `A5`, `A6`, `letter`, `legal`, `tabloid`, `statement`.
    - `silent` (`boolean`, Optional): Silences SumatraPDF's error messages.
    - `printDialog` (`boolean`, Optional): displays the Print dialog for all the files indicated on this command line.
    - `copies`(`number`, Optional): Specifies how many copies will be printed.
    - `sumatraPdfPath`(`string`, Optional): Specify the path manually.

**Examples**

To print a PDF file to the default printer:

```javascript
import {print} from "win32-pdf-printer";

print("assets/pdf-sample.pdf");
```

To print to a specific printer:

```javascript
import {print} from "win32-pdf-printer";

const options = {
    printer: "Zebra",
};

print("assets/pdf-sample.pdf", options);
```

Example with a few print settings. It will print pages 1, 3, 5 and scale them so that they fit into the printable area
of the paper.

```javascript
import {print} from "win32-pdf-printer";

const options = {
    printer: "Zebra",
    pages: "1-3,5",
    scale: "fit",
};

print("assets/pdf-sample.pdf", options);
```

## getPaperSizeInfo

### `.getPaperSizeInfo([options]) => PaperSizesInfoType`

A function to get detailed parameters of paper size

**Arguments**

`options` (`Object`, Optional):

- `printer` ( `string`, Optional): Send a file to the specified printer.
- `paperSizeInfoPath`(`string`, Optional): Specify the path manually.

**Returns**

`PaperSizesInfoType`:

- `printerName` ( `string`)
- `PaperSizes`(`array`)

**Examples**

```javascript
import {getPaperSizeInfo} from "win32-pdf-printer";

/**
 * {
 *   "printerName": "Deli DL-666",
 *   "PaperSizes": [
 *       {
 *           "Height": 400,
 *           "Kind": 0,
 *           "PaperName": "USER",
 *           "RawKind": 256,
 *           "Width": 410
 *       },
 *       {
 *           "Height": 400,
 *           "Kind": 0,
 *           "PaperName": "2 x 4",
 *           "RawKind": 257,
 *           "Width": 210
 *       },
 *       {
 *           "Height": 400,
 *           "Kind": 0,
 *           "PaperName": "4 x 4",
 *           "RawKind": 258,
 *           "Width": 410
 *       },
 *       {
 *           "Height": 600,
 *           "Kind": 0,
 *           "PaperName": "4 x 6",
 *           "RawKind": 259,
 *           "Width": 410
 *       }
 *   ]
 * }
 **/
console.log(getPaperSizeInfo());
```

### `.getPaperSizeInfoDecode([options]) => PaperSizesInfoType`

A function to get detailed parameters of paper size

**Arguments**

`options` (`Object`, Optional):

- `encoding` ( `string`, Optional): specified encoding(Default `cp936`).
- `printer` ( `string`, Optional): specified printer.
- `paperSizeInfoPath`(`string`, Optional): Specify the path manually.

**Examples**

```javascript
import {getPaperSizeInfoDecode} from "win32-pdf-printer";

/**
 * {
 *   "printerName": "Deli DL-999",
 *   "PaperSizes": [
 *       {
 *           "Height": 799,
 *           "Kind": 0,
 *           "PaperName": "韵达标准",
 *           "RawKind": 278,
 *           "Width": 404
 *       },
 *       {
 *           "Height": 709,
 *           "Kind": 0,
 *           "PaperName": "韵达小包",
 *           "RawKind": 279,
 *           "Width": 404
 *       },
 *       {
 *           "Height": 591,
 *           "Kind": 0,
 *           "PaperName": "宅急送",
 *           "RawKind": 280,
 *           "Width": 404
 *       }
 *   ]
 * }
 **/
console.log(getPaperSizeInfoDecode());
```

### `.getPaperSizeInfoAll([options]) => PaperSizesInfoType[]`

A function to get detailed parameters of paper size(`All printers`)

**Arguments**

`options` (`Object`, Optional):

- `paperSizeInfoPath`(`string`, Optional): Specify the path manually.

**Returns**

`PaperSizesInfoType[]`

### `.getPaperSizeInfoAllDecode([options]) => PaperSizesInfoType[]`

A function to get detailed parameters of paper size(`All printers`)

**Arguments**

`options` (`Object`, Optional):

- `encoding` ( `string`, Optional): specified encoding(Default `cp936`).
- `paperSizeInfoPath`(`string`, Optional): Specify the path manually.

**Returns**

`PaperSizesInfoType[]`

## getPrinters

### `.getPrinters() => Printer[]`

A function to get a list of available printers.

**Returns**

`Printer[]`: a list of available printers.

**Examples**

```javascript
import {getPrinters} from "win32-pdf-printer";

console.log(getPrinters());
```

### `.getPrintersDecode(encoding: string = "cp936") => Printer[]`

A function to get a list of available printers.

**Returns**

`Printer[]`: a list of available printers.

### `.getPaperSize(printer:string) => string[]`

Get the set of paper sizes supported by the print driver

**Returns**

`string[]`: supported paperSizes.

**Examples**

```javascript
import {getPaperSize, getDefaultPrinter} from "win32-pdf-printer";

console.log(getPaperSize(getDefaultPrinter().name));
```

### `.getPaperSizeDecode(printer:string,encoding:string='cp936') => string[]`

Get the set of paper sizes supported by the print driver

**Returns**

`string[]`: supported paperSizes.

### `.getDefaultPrinter() => Printer | null`

A function to get the default printer info.

**Returns**

`Printer | null`: the default printer info, or `null` if there is no default printer.

**Examples**

```javascript
import {getDefaultPrinter} from "win32-pdf-printer";

console.log(getDefaultPrinter());
```

### `.getDefaultPrinterDecode(encoding: string = "cp936") => Printer | null`

A function to get the default printer info.

**Returns**

`Printer | null`: the default printer info, or `null` if there is no default printer.


## License

[MIT](LICENSE)
