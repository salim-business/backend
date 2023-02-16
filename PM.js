module.exports = {
  apps: [
    {
      script: "node bin/www",
    },
  ],

  // Deployment Configuration
  deploy: {
    production: {
    // "key"  : "/path/to/some.pem",s
      user: "mukisa",
      host: ["167.172.76.19"],
      ref: "origin/main",
      repo: "git@github.com:GeoXhacker/admin-backend.git",
      path: "/home/mukisa/movers-admin",
      "post-deploy": "npm install",
    },
  },
};
