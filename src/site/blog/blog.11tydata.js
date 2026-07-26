require("dotenv").config();
const settings = require("../../helpers/constants");

const allSettings = settings.ALL_NOTE_SETTINGS;

module.exports = {
  tags: ["note"],
  templateEngineOverride: "md",
  eleventyComputed: {
    layout: () => "layouts/note.njk",
    permalink: (data) => `/blog/${data.page.fileSlug}/`,
    basesNotes: (data) => {
      if (!data.collections || !data.collections.blog) return [];
      return data.collections.blog.map((item) => ({
        path: item.filePathStem.replace("/blog/", ""),
        url: item.url,
        metadata: item.data,
        fileSlug: item.fileSlug,
      }));
    },
    settings: (data) => {
      const noteSettings = {};
      allSettings.forEach((setting) => {
        const pageSetting = data[setting];
        const globalSetting = process.env[setting];

        noteSettings[setting] =
          pageSetting !== undefined
            ? pageSetting
            : globalSetting !== undefined
              ? globalSetting === "true"
              : true;
      });
      return noteSettings;
    },
  },
};
