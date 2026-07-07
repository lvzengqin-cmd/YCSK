import { readFileSync } from "node:fs";

const site = process.env.BAIDU_SITE || "https://www.yucebot.com";
const token = process.env.BAIDU_PUSH_TOKEN;
const urlsFile = process.env.BAIDU_URLS_FILE || new URL("../baidu-urls.txt", import.meta.url);

if (!token) {
  console.error("Missing BAIDU_PUSH_TOKEN. Get it from Baidu Search Resource Platform after site verification.");
  process.exit(1);
}

const urls = readFileSync(urlsFile, "utf8")
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter(Boolean)
  .join("\n");

const endpoint = `https://data.zz.baidu.com/urls?site=${encodeURIComponent(site)}&token=${encodeURIComponent(token)}`;
const response = await fetch(endpoint, {
  method: "POST",
  headers: { "Content-Type": "text/plain" },
  body: urls
});

const body = await response.text();
console.log(body);

if (!response.ok) {
  process.exitCode = 1;
}
