require("dotenv").config();
const fs = require("fs");
const settings = require("../../helpers/constants");

const allSettings = settings.ALL_NOTE_SETTINGS;
const rtlLanguages = new Set(["ar", "fa", "he", "ur"]);

const getContentLanguage = (data) => {
  const configuredLanguage = data.lang || data.language;
  if (configuredLanguage) return configuredLanguage;

  return data.page?.fileSlug?.endsWith("-urdu") ? "ur" : undefined;
};

module.exports = {
  eleventyComputed: {
    layout: (data) => {
      if (data.tags.indexOf("gardenEntry") != -1) {
        return "layouts/index.njk";
      }
      return "layouts/note.njk";
    },
    permalink: (data) => {
      if (data.tags.indexOf("gardenEntry") != -1) {
        return "/";
      }
      if (data.page.filePathStem && data.page.filePathStem.startsWith("/notes/v1/")) {
        return `/v1/${data.page.fileSlug}/`;
      }
      return `/${data.page.fileSlug}/`;
    },
    contentLanguage: getContentLanguage,
    contentDirection: (data) => {
      const configuredDirection = data.dir || data.direction;
      if (configuredDirection) return configuredDirection;

      const language = getContentLanguage(data)?.toLowerCase().split("-")[0];
      return rtlLanguages.has(language) ? "rtl" : undefined;
    },
    basesNotes: (data) => {
      if (!data.collections || !data.collections.note) return [];
      return data.collections.note.map((item) => {
        return {
          path: item.filePathStem.replace("/notes/", ""),
          url: item.url,
          metadata: item.data,
          fileSlug: item.fileSlug,
          inputPath: item.inputPath,
        };
      });
    },
    settings: (data) => {
      const noteSettings = {};
      allSettings.forEach((setting) => {
        let noteSetting = data[setting];
        let globalSetting = process.env[setting];

        let settingValue =
          noteSetting !== undefined
            ? noteSetting
            : globalSetting !== undefined
            ? globalSetting === "true"
            : true;
        noteSettings[setting] = settingValue;
      });
      return noteSettings;
    },
  },
};
