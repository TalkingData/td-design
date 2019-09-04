const env = process.env.NODE_ENV;
const baseUrl = {};

if (env === "production") {
  // baseUrl.rootPath = "http://172.28.4.230:7001";
  //baseUrl.rootPath = "http://172.29.3.19:7001";
  baseUrl.rootPath = "http://design.tendcloud.com";
} else {
  // baseUrl.rootPath = "http://172.28.4.230:7001";
  // baseUrl.rootPath = "http://172.29.3.19:7001";
  // baseUrl.rootPath = "http://design.tendcloud.com";
  baseUrl.rootPath = "http://localhost:7001";
}

export {
  baseUrl
};