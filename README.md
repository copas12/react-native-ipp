# react-native-ipp

## Getting started

`$ npm install github:copas12/react-native-ipp --save`

## Usage

```javascript
import RNIPP from "react-native-ipp";

const data = `
  ^XA
  ^A0N,25,23
  ^FO0,12^FD211220-1                    (1/2)^FS
  ^A0N,25,23
  ^FO0,39^FDIman^FS
  ^FO0,69^GB400,2,2^FS
  ^A0N,25,23
  ^FO0,80^FDAyam Bakar Spesial^FS
  ^A0N,25,23
  ^FO0,107^FDSambal Matah, Tahu Goreng, ^FS
  ^A0N,25,23
  ^FO0,134^FDTempe Goreng, Kol Goreng^FS
  ^XZ`;

const printer = ipp.Printer(printerUrl, { version: "2.0" });

printer.printZPL(data, function (err, res) {
  if (err) {
    console.log({ err });
  } else {
    console.log({ res });
  }
});
```
