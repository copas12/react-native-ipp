const _ = require("lodash");
const wordWrap = require("word-wrap");

const generateZPL = (data, config) => {
  const { maxCharacter, fontSize, xOffset, yOffset } = config;
  const spaceBetweenLine = 2;

  // UTILS
  const blankSpace = (length) => {
    return _.range(length)
      .map((_) => " ")
      .join("");
  };
  const wrap = (str) => {
    return wordWrap(str, {
      indent: "",
      width: maxCharacter - 3,
    }).split("\n");
  };

  // GENERATE ZPL
  const arrToZPL = (arr) => {
    console.log({ arr });
    const arrZPL = ["^XA"];
    const x = 20 + xOffset || 0;
    const y = 0 + yOffset || 0;
    let lastY = 0 + y;
    arr.map((o, _i) => {
      if (o.type === "string") {
        arrZPL.push(`^A0N,${fontSize},${fontSize - 2}`);
        arrZPL.push(`^FO${x},${lastY + spaceBetweenLine}^FD${o.value}^FS`);
        lastY = lastY + fontSize + spaceBetweenLine;
      }
      if (o.type === "line") {
        arrZPL.push(`^FO0,${lastY + 5}^GB400,2,2^FS`);
        lastY = lastY + 12 + spaceBetweenLine;
      }
    });
    arrZPL.push("^XZ");
    return arrZPL.join("\n");
  };

  // MAIN
  let arr = [];
  const orderIdentity = `${data.orderNumber}${blankSpace(
    maxCharacter - (data.orderNumber.length + data.position.length) + 3
  )}${data.position}`;
  arr.push({ type: "string", value: orderIdentity });
  arr = arr.concat(
    wrap(data.customerName).map((s) => {
      return { type: "string", value: s };
    })
  );
  arr.push({ type: "line" });
  arr = arr.concat(
    wrap(data.productName).map((s) => {
      return { type: "string", value: s };
    })
  );
  arr = arr.concat(
    wrap(data.modifiers).map((s) => {
      return { type: "string", value: s };
    })
  );
  const zpl = arrToZPL(arr);
  return zpl;
};

module.exports = { generateZPL };
