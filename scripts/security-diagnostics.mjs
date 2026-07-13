import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const rootDir = path.resolve(import.meta.dirname, "..");
const read = (file) => fs.readFileSync(path.join(rootDir, file), "utf8");
const git = (...args) => execFileSync("git", args, { cwd: rootDir, encoding: "utf8" }).trim();

const trackedFiles = git("ls-files").split(/\r?\n/).filter(Boolean);
const forbiddenTracked = [
  { re: /^\.env(?:\.|$)/i, reason: "environment files must not be tracked" },
  { re: /(^|\/)\.netlify(\/|$)/i, reason: "Netlify local/cache state must not be tracked" },
  { re: /\.(?:jks|keystore|p12|pfx|pem|key)$/i, reason: "signing keys and private keys must not be tracked" },
  { re: /(^|\/).*service-account.*\.json$/i, reason: "service account credentials must not be tracked" }
];

for (const file of trackedFiles) {
  for (const rule of forbiddenTracked) {
    assert.equal(rule.re.test(file), false, `${file}: ${rule.reason}`);
  }
}

const netlifyConfig = read("netlify.toml");
for (const required of [
  "Content-Security-Policy",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "X-Robots-Tag = \"noindex, nofollow, noarchive\"",
  "Cache-Control = \"no-store\"",
  "https://identity.netlify.com",
  "https://api.netlify.com"
]) {
  assert.ok(netlifyConfig.includes(required), `netlify.toml should include ${required}`);
}

const robots = read("robots.txt");
for (const path of ["/admin/", "/data/", "/admin/config.yml"]) {
  assert.ok(robots.includes(`Disallow: ${path}`), `robots.txt should disallow ${path}`);
}

const dangerousPatterns = [
  { re: /dangerouslySetInnerHTML/, label: "React raw HTML escape hatch" },
  { re: /\.\s*innerHTML\s*=/, label: "direct innerHTML assignment" },
  { re: /\.\s*outerHTML\s*=/, label: "direct outerHTML assignment" },
  { re: /insertAdjacentHTML\s*\(/, label: "HTML parser sink insertAdjacentHTML" },
  { re: /document\.write(?:ln)?\s*\(/, label: "document.write sink" },
  { re: /\beval\s*\(/, label: "eval execution sink" },
  { re: /new\s+Function\s*\(/, label: "new Function execution sink" },
  { re: /set(?:Timeout|Interval)\s*\(\s*["'`]/, label: "string timer execution sink" },
  { re: /setAttribute\s*\(\s*["']on/i, label: "string event handler assignment" },
  { re: /postMessage\s*\([^,]+,\s*["']\*/i, label: "wildcard postMessage targetOrigin" }
];

const scanFiles = trackedFiles.filter((file) =>
  /\.(?:html|js|mjs|json|toml|yml|yaml|css)$/i.test(file) &&
  file !== "scripts/security-diagnostics.mjs"
);
for (const file of scanFiles) {
  const source = read(file);
  for (const pattern of dangerousPatterns) {
    assert.equal(pattern.re.test(source), false, `${file}: contains ${pattern.label}`);
  }
}

const download = read("download.html");
assert.ok(download.includes("https://ceyi.yucebot.com/api/mobile/release"), "download page should load release metadata from quant subdomain");
assert.ok(download.includes("https://ceyi.yucebot.com/downloads/ceyi-quant-1.0.47-10047-release.apk"), "download page should keep versioned APK fallback");
assert.equal(download.includes("ceyi-event-contract-ai-quant.netlify.app"), false, "download page should not expose old Netlify app domain");

console.log("YCSK official security diagnostics passed");
