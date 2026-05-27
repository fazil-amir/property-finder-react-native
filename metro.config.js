const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

// #region agent log
try {
  const rootBabelPreset = require("babel-preset-expo/package.json").version;
  fetch("http://127.0.0.1:7251/ingest/88e0710b-a109-4f7f-a911-4d1982d0d08b", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "5c01ff" },
    body: JSON.stringify({
      sessionId: "5c01ff",
      runId: "post-fix",
      hypothesisId: "A",
      location: "metro.config.js:startup",
      message: "babel-preset-expo version at metro startup",
      data: { rootBabelPreset, expoSdk: require("expo/package.json").version },
      timestamp: Date.now(),
    }),
  }).catch(() => {});
} catch (e) {
  fetch("http://127.0.0.1:7251/ingest/88e0710b-a109-4f7f-a911-4d1982d0d08b", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "5c01ff" },
    body: JSON.stringify({
      sessionId: "5c01ff",
      runId: "post-fix",
      hypothesisId: "A",
      location: "metro.config.js:startup",
      message: "failed to read babel-preset-expo version",
      data: { error: String(e) },
      timestamp: Date.now(),
    }),
  }).catch(() => {});
}
// #endregion

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: "./global.css" });