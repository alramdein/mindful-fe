module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['s.gravatar.com'],
  },
  async rewrites() {
    return [
      {
        source: "/posts",
        destination: "http://localhost:8080/posts",
      },
      {
        source: "/images/:file*",
        destination: "http://localhost:8080/images/:file*",
      },
    ];
  },
};
