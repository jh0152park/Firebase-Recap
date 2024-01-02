const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        createProxyMiddleware("/api", {
            //target: "http://127.0.0.1:5001/recap-1daad/us-central1/auth",
            target: process.env.REACT_APP_API_URL,
            changeOrigin: true,
            pathRewrite: {
                "^/api": "",
            },
        })
    );
};
