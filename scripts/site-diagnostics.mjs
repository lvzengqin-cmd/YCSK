import assert from "node:assert/strict";
import fs from "node:fs";

const root = new URL("../", import.meta.url);
const read = (path) => fs.readFileSync(new URL(path, root), "utf8");

const currentVersion = "1.0.33";
const currentVersionCode = 10033;
const officialQuantUrl = "https://ceyi.yucebot.com";
const currentApk = `${officialQuantUrl}/downloads/ceyi-quant-1.0.33-10033-release.apk`;
const forbiddenPatterns = [
  "ceyi-event-contract-ai-quant.netlify.app",
  "ceyi-quant-latest.apk",
  "download.yucebot.com",
  "1.0.29",
  "10029",
  "策奕",
  "打开网页端",
  "登录系统"
];

const filesToScan = [
  "download.html",
  "index.html",
  "mobile-release.json",
  "sitemap.xml",
  "baidu-submit.md",
  "baidu-urls.txt"
];

const release = JSON.parse(read("mobile-release.json"));
assert.equal(release.latestVersion, currentVersion, "official-site mobile-release latestVersion must match current app");
assert.equal(release.latestVersionCode, currentVersionCode, "official-site mobile-release versionCode must match current app");
assert.equal(release.apkUrl, currentApk, "official-site mobile-release APK URL must use the official quant subdomain");

const downloadHtml = read("download.html");
assert.ok(downloadHtml.includes(`${officialQuantUrl}/api/mobile/release`), "download page should read the quant release API first");
assert.ok(downloadHtml.includes(currentApk), "download page should include the current APK as fallback");
assert.ok(downloadHtml.includes(`${officialQuantUrl}/`), "download page should link to the official quant subdomain");
assert.ok(downloadHtml.includes(`${officialQuantUrl}/privacy.html`), "download page should link privacy policy on the official quant subdomain");
assert.ok(downloadHtml.includes(`${officialQuantUrl}/terms.html`), "download page should link terms on the official quant subdomain");
assert.ok(downloadHtml.includes("data-copy-success"), "download page should show a visible copy-success toast for invite codes");
assert.equal(downloadHtml.includes("branding.softwareName"), false, "official download page should not pretend the installed app name is dynamic per agent");
assert.equal(downloadHtml.includes("登录系统"), false, "official download page should not include a web login entry");
assert.equal(downloadHtml.includes("打开网页端"), false, "official download page should stay focused on app download only");

const indexHtml = read("index.html");
assert.ok(indexHtml.includes(currentApk), "homepage direct APK download should use the current APK URL");

const sitemap = read("sitemap.xml");
assert.ok(sitemap.includes(`${officialQuantUrl}/download.html`), "sitemap should include the current quant download page");

for (const file of filesToScan) {
  const source = read(file);
  for (const pattern of forbiddenPatterns) {
    assert.ok(!source.includes(pattern), `${file} must not contain stale value: ${pattern}`);
  }
}

console.log("YCSK official site diagnostics passed");
