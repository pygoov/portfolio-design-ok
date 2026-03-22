module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("site-src/site.css");
  eleventyConfig.addPassthroughCopy("site-src/assets");
  eleventyConfig.addWatchTarget("site-src/site.css");
  eleventyConfig.addWatchTarget("site-src/assets");
};
