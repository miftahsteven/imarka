module.exports = {
  apps: [
    // =========================================================
    // 1. BACKEND API — Express.js → port 7048
    // =========================================================
    {
      name: 'imarka-api',
      script: 'apps/api/dist/server.js',
      cwd: '/var/www/imarka',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 7048,
      },
      watch: false,
      max_memory_restart: '500M',
      error_file: 'logs/api-error.log',
      out_file: 'logs/api-out.log',
    },

    // =========================================================
    // 2. CMS — Vite Static SPA → port 7049
    //    Menggunakan PM2 built-in static server
    // =========================================================
    {
      name: 'imarka-cms',
      script: 'serve',
      interpreter: 'none',
      args: '-s apps/cms/dist -l 7049',
      cwd: '/var/www/imarka',
      env: {
        PM2_SERVE_PATH: 'apps/cms/dist',
        PM2_SERVE_PORT: 7049,
        PM2_SERVE_SPA: 'true',
        PM2_SERVE_HOMEPAGE: '/index.html',
      },
      watch: false,
      error_file: 'logs/cms-error.log',
      out_file: 'logs/cms-out.log',
    },

    // =========================================================
    // 3. WEB — Next.js → port 7050
    // =========================================================
    {
      name: 'imarka-web',
      script: 'node_modules/.bin/next',
      args: 'start -p 7050',
      cwd: '/var/www/imarka/apps/web',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 7050,
      },
      watch: false,
      max_memory_restart: '500M',
      error_file: '../../logs/web-error.log',
      out_file: '../../logs/web-out.log',
    },
  ],
};
