const env = process.env.NODE_ENV;
const baseUrl = {};

if (env === "production") {
  baseUrl.rootPath = "http://172.30.105.73:7001";
} else {
  baseUrl.rootPath = "http://172.30.105.73:7001";
}

export { baseUrl };
