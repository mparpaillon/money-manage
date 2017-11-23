module.exports = {
  "maximumFileSizeToCacheInBytes": "5MB",
  "globDirectory": "www/",
  "globPatterns": [
    "assets/fonts/*.woff2",
    "assets/icon/*.png",
    "assets/icon/*.ico",
    "assets/images/**/*.*",
    "build/**/*.css",
    "build/**/*.js",
    "index.html"
  ],
  "swSrc": "src/service-worker.js",
  "swDest": "www/service-worker.js"
};
