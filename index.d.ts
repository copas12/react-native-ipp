interface OrderData {
  customerName: string,
  orderNumber: string,
  position: string,
  productName: string,
  modifiers: string,
}

interface ZPLConfig {
  maxCharacter: number;
  fontSize: number;
  xOffset?: number;
  yOffset?: number;
}

declare const _default: {
  getPrinters: (ip: string) => string[];
  Printer: (printerUrl: string, options: any) => any;
  generateZPL: (data: OrderData, config: ZPLConfig) => string;
  generateLabelArray: (data: OrderData, config: ZPLConfig) => string[];
  convertTextArrayToZPL: (data: string[], config: ZPLConfig) => string;
};

export default _default;
