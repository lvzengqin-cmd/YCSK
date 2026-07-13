import assert from "node:assert/strict";
import fs from "node:fs";

const root = new URL("../", import.meta.url);
const read = (path) => fs.readFileSync(new URL(path, root), "utf8");

const officialQuantUrl = "https://ceyi.yucebot.com";
const forbiddenPatterns = [
  "ceyi-event-contract-ai-quant.netlify.app",
  "ceyi-quant-latest.apk",
  "download.yucebot.com",
  "1.0.29",
  "10029",
  String.fromCodePoint(0x7edb, 0x6827)
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
const currentVersion = String(release.latestVersion || "");
const currentVersionCode = Number(release.latestVersionCode || 0);
const currentApk = `${officialQuantUrl}/downloads/ceyi-quant-${currentVersion}-${currentVersionCode}-release.apk`;
assert.match(currentVersion, /^\d+\.\d+\.\d+$/, "official-site mobile-release version must use semantic versioning");
assert.equal(currentVersionCode, currentVersion.split(".").reduce((code, value, index) => code + Number(value) * [10000, 100, 1][index], 0), "official-site mobile-release versionCode must match its version");
assert.equal(release.latestVersion, currentVersion, "official-site mobile-release latestVersion must match current app");
assert.equal(release.latestVersionCode, currentVersionCode, "official-site mobile-release versionCode must match current app");
assert.equal(release.apkUrl, currentApk, "official-site mobile-release APK URL must use the official quant subdomain");
assert.match(release.sha256, /^[a-f0-9]{64}$/i, "official-site APK sha must contain a SHA-256 digest");

const downloadHtml = read("download.html");
assert.ok(downloadHtml.includes(`${officialQuantUrl}/api/mobile/release`), "download page should read the quant release API first");
assert.ok(downloadHtml.includes(currentApk), "download page should include the current APK as fallback");
assert.ok(downloadHtml.includes(`${officialQuantUrl}/`), "download page should link to the official quant subdomain");
assert.ok(downloadHtml.includes(`${officialQuantUrl}/privacy.html`), "download page should link privacy policy on the official quant subdomain");
assert.ok(downloadHtml.includes(`${officialQuantUrl}/terms.html`), "download page should link terms on the official quant subdomain");
assert.ok(downloadHtml.includes("data-copy-success"), "download page should show a visible copy-success toast for invite codes");
assert.ok(downloadHtml.includes("data-web-entry"), "download page should expose the quant website entry");
assert.equal(downloadHtml.includes("branding.softwareName"), false, "official download page should not pretend the installed app name is dynamic per agent");

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
