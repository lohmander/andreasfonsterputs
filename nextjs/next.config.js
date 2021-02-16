const config = {
  trailingSlash: true,
  i18n: {
    locales: ["sv"],
    defaultLocale: "sv",
  },
  images: {
    domains: ["localhost"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "x-frame-options",
            value: "sameorigin",
          },
        ],
      },
    ];
  },
  // webpack: (config, _) => {
  //   config.resolve.symlinks = false;
  //   return config;
  // },
};

const bucketDomain = process.env.S3_AWS_S3_ENDPOINT_DOMAIN;

if (bucketDomain) {
  config.images.domains.push(bucketDomain);
}

module.exports = config;
