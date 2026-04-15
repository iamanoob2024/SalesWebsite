module.exports = function(eleventyConfig) {
eleventyConfig.addPassthroughCopy("assets");eleventyConfig.addPassthroughCopy("assets");  // ONLY passthrough static assets, NOT folders with templates
  eleventyConfig.addPassthroughCopy("*.png");
  eleventyConfig.addPassthroughCopy("*.jpg");
  eleventyConfig.addPassthroughCopy("*.css");
  
  // Explicitly ignore backup files and scripts
  eleventyConfig.ignores.add("*.bak*");
  eleventyConfig.ignores.add("*.sh");
  eleventyConfig.ignores.add("*.py");

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site"
    }
  };
};
