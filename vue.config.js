const { APP_HOST, API_PORT } = process.env;

module.exports = {
  devServer: {
    proxy: {
      '/api': { target: `http://${APP_HOST}:${API_PORT}`, ws: false },
    },
  },
};
