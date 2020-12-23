const Axios = require("axios");
const cheerio = require("cheerio");
const axios = Axios.create();
axios.defaults.timeout = 1000;

const getPrinters = async (ip) => {
  const CUPSurl = `http://${ip}:631/printers`;
  try {
    const resp = await axios.get(CUPSurl);
    if (resp.status === 200) {
      var printersUrls = [];
      const $ = cheerio.load(resp.data);
      const a = $("table").find("tr > td > a");
      a.each((i, e) => {
        let href = $(e).attr("href");
        href = href.replace("/printers", "");
        printersUrls.push(CUPSurl + href);
      });
      return printersUrls;
    } else {
      throw new Error("Wrong IP or Printer not detected");
    }
  } catch (error) {
    throw new Error("Wrong IP or Printer not detected");
  }
};

// getPrinters('172.16.0.220').then(console.log).catch(console.log);
module.exports = { getPrinters };
