module.exports = {
  apps: [
    {
      script: "node bin/www",
      watch: ".",
    },
  ],

  deploy: {
    production: {
      user: "root",
      host: ["64.227.180.171"],
      ref: "origin/main",
      repo: "git@github.com:D-s-Cafe/backend.git",
      path: "/var/www/cafe/backend",
      "post-deploy": "npm install && pm2 start",
    },
  },
};
