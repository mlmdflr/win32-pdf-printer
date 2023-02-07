export interface Printer {
  deviceId: string;
  name: string;
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
  printer?: string;
  paperSizeInfoPath?: string;
}

export interface PaperSizesInfoType {
  printerName: string;
  PaperSizes: PaperSizeType[];
}

export interface PaperSizeType {
  Height: number;
  Kind: number;
  PaperName: string;
  RawKind: number;
  Width: number;
}
