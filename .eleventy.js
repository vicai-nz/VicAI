const calendarPlugin = require("@codegouvfr/eleventy-plugin-calendar");
const rssPlugin = require("@11ty/eleventy-plugin-rss");
const llmsTxtPlugin = require("eleventy-plugin-llms-txt");
const externalLinksPlugin = require("@sardine/eleventy-plugin-external-links");
const timeToReadPlugin = require("eleventy-plugin-time-to-read");
const brokenLinksPlugin = require("eleventy-plugin-broken-links");
const socialImgPlugin = require("eleventy-plugin-social-img");
const eleventyImg = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {
  // ===== PLUGINS =====

  // Calendar: generates .ics files for events
  eleventyConfig.addPlugin(calendarPlugin, {
    defaultOrganizer: {
      name: "VicAI",
      email: "vicai@clubs.vuw.ac.nz",
    },
  });

  // RSS: Atom/RSS feed filters
  eleventyConfig.addPlugin(rssPlugin);

  // LLMs: generates llms.txt for AI crawlers
  eleventyConfig.addPlugin(llmsTxtPlugin, {
    siteUrl: "https://vicai.nz",
    sortByDate: true,
    sortDirection: "desc",
    normalizeWhitespace: true,
  });

  // External links: adds target="_blank" and rel="noreferrer" to external links
  eleventyConfig.addPlugin(externalLinksPlugin);

  // Time to read: adds {{ content | timeToRead }} filter
  eleventyConfig.addPlugin(timeToReadPlugin);

  // Broken links: checks for broken external links after build
  eleventyConfig.addPlugin(brokenLinksPlugin, {
    broken: "warn",
    redirect: "warn",
    cacheDuration: "1d",
    loggingLevel: 1,
    excludeUrls: ["https://instagram.com/*", "https://linkedin.com/*"],
  });

  // Social images: generates OG images at build time
  eleventyConfig.addPlugin(socialImgPlugin);

  // Image: auto-optimize any <img> tags (responsive, WebP)
  eleventyConfig.addPlugin(eleventyImg.eleventyImageTransformPlugin, {
    formats: ["webp", "auto"],
    defaultAttributes: {
      loading: "lazy",
      decoding: "async",
    },
  });

  // ===== PASSTHROUGH =====
  eleventyConfig.addPassthroughCopy("src/brand");
  eleventyConfig.addPassthroughCopy("src/favicon.ico");
  eleventyConfig.addPassthroughCopy("src/favicon-16x16.png");
  eleventyConfig.addPassthroughCopy("src/favicon-32x32.png");
  eleventyConfig.addPassthroughCopy("src/apple-touch-icon.png");
  eleventyConfig.addPassthroughCopy("src/android-chrome-192x192.png");
  eleventyConfig.addPassthroughCopy("src/android-chrome-512x512.png");
  eleventyConfig.addPassthroughCopy("src/site.webmanifest");

  // ===== BUNDLES =====
  eleventyConfig.addBundle("css");
  eleventyConfig.addBundle("js");

  // ===== COLLECTIONS =====

  // Blog posts sorted by date descending
  eleventyConfig.addCollection("blog", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/blog/*.md")
      .sort((a, b) => b.date - a.date);
  });

  // Events collection shaped for the calendar plugin
  eleventyConfig.addCollection("calendarEvents", function (collectionApi) {
    const events = require("./src/_data/events.json");
    return events.map((event) => ({
      data: {
        title: event.title,
        start: event.date + "T" + event.time,
        end: event.date + "T" + event.endTime,
        description: event.description,
        location: event.location,
        slug: event.slug,
        category: event.category,
        status: event.status,
      },
      url: "/events/" + event.slug + "/",
    }));
  });

  // ===== FILTERS =====

  eleventyConfig.addFilter("dateDisplay", function (date) {
    const d = new Date(date);
    return d.toLocaleDateString("en-NZ", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  eleventyConfig.addFilter("dateShortMonth", function (date) {
    const d = new Date(date);
    return d.toLocaleDateString("en-NZ", { month: "short" }).toUpperCase();
  });

  eleventyConfig.addFilter("dateDay", function (date) {
    const d = new Date(date);
    return d.getDate().toString().padStart(2, "0");
  });

  eleventyConfig.addFilter("dateYear", function (date) {
    const d = new Date(date);
    return d.getFullYear();
  });

  eleventyConfig.addFilter("dateISO", function (date) {
    return new Date(date).toISOString().split("T")[0];
  });

  eleventyConfig.addFilter("limit", function (arr, limit) {
    return arr.slice(0, limit);
  });

  eleventyConfig.addFilter("where", function (arr, key, value) {
    return arr.filter((item) => item[key] === value);
  });

  eleventyConfig.addFilter("calendarDate", function (date, time) {
    const d = date.replace(/-/g, "");
    const t = time.replace(":", "") + "00";
    return d + "T" + t;
  });

  eleventyConfig.addFilter("urlencode", function (str) {
    return encodeURIComponent(str || "");
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
