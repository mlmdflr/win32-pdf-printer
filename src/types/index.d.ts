export interface Printer {
  DeviceID: string;
  PrinterName: string;
}

export interface PrintOptions {
  printer?: string;
  pages?: string;
  subset?: string;
  orientation?: string;
  scale?: string;
  monochrome?: boolean;
  side?: string;
  bin?: string;
  paperSize?: string;
  silent?: boolean;
  printDialog?: boolean;
  sumatraPdfPath?: string;
  copies?: number;
}

export interface paperSizeInfoOptions {
  printer: string;
  paperSizeInfoPath?: string;
}

export interface PaperSizesInfoType {
  PrinterName: string;
  TaskNumber: number;
  Status: number;
  StatusMsg: number;
  PaperSizes: PaperSizeType[];
}

export interface PaperSizeType {
  Height: number;
  Kind: number;
  PaperName: string;
  RawKind: number;
  Width: number;
}
