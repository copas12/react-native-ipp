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
  Printer: (printerUrl: string, options: any) => any;
  generateZPL: (data: OrderData, config: ZPLConfig) => string;
  getPrinters: (ip: string) => string[];
};

export default _default;
