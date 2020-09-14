const {
  APP_PROTOCOL, APP_HOST, APP_PORT, API_PORT, API_HOST, API_PROTOCOL,
} = process.env;

module.exports = {
  devServer: {
    proxy: {
      '/api': { target: `${API_PROTOCOL}://${API_HOST}:${API_PORT}`, ws: false },
    },
    https: APP_PROTOCOL === 'https',
    host: APP_HOST,
    port: APP_PORT,
  },
};
