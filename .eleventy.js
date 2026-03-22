module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("site-src/site.css");
  eleventyConfig.addPassthroughCopy("site-src/assets");
  eleventyConfig.addPassthroughCopy({ "media/web": "assets/media" });
  eleventyConfig.addWatchTarget("site-src/site.css");
  eleventyConfig.addWatchTarget("site-src/assets");
  eleventyConfig.addWatchTarget("content");
  eleventyConfig.addWatchTarget("media/web");

  eleventyConfig.addFilter("rootPrefix", function (url = "/") {
    const parts = String(url)
      .split("?")[0]
      .split("/")
      .filter(Boolean);

    if (parts.length === 0) {
      return "";
    }

    return "../".repeat(parts.length);
  });
};
