const withImages = require('next-images');

module.exports = {
  ...withImages(),
  poweredByHeader: false,
  useFileSystemPublicRoutes: false,
  reactStrictMode: true,
  publicRuntimeConfig: {
    HOST: process.env.HOST,
    PRISMIC_API_ENDPOINT: process.env.PRISMIC_API_ENDPOINT,
  },
};
