# 策弈量化百度收录提交材料

## 已准备的收录入口

- 官网首页：https://www.yucebot.com/
- 软件下载页：https://www.yucebot.com/download
- 软件下载页直链：https://www.yucebot.com/download.html
- 下载子域名：https://download.yucebot.com/
- 白皮书：https://www.yucebot.com/baipishu
- 用户手册：https://www.yucebot.com/shouce
- 付款说明：https://www.yucebot.com/payment
- Sitemap：https://www.yucebot.com/sitemap.xml
- Robots：https://www.yucebot.com/robots.txt

## 百度搜索资源平台提交步骤

1. 登录百度搜索资源平台：https://ziyuan.baidu.com/
2. 添加站点 `https://www.yucebot.com/`。
3. 按平台提示完成站点验证。
4. 提交 sitemap：`https://www.yucebot.com/sitemap.xml`。
5. 在“普通收录”中提交 `baidu-urls.txt` 里的 URL。

## API 推送说明

若百度站长平台提供了该站点的主动推送 token，可执行：

```bash
BAIDU_PUSH_TOKEN=你的百度推送token node scripts/baidu-submit.mjs
```

或使用 curl：

```bash
curl -H "Content-Type:text/plain" --data-binary @baidu-urls.txt "https://data.zz.baidu.com/urls?site=https://www.yucebot.com&token=你的百度推送token"
```

当前仓库未发现百度主动推送 token，因此不能声称已通过 API 提交。页面、robots、sitemap、URL 清单、主动推送脚本和结构化数据已经准备好，完成百度站点验证后即可提交。普通收录可以缩短百度发现链接的时间，但不保证一定收录或即时展示。

## 重点搜索关键词

- 策弈量化
- 策弈量化软件
- 策弈量化软件下载
- 策弈量化APP
- 策弈量化app
- 策弈量化app下载
- 事件合约量化
- 事件合约全自动下单软件
- 事件合约AI量化
- BTCUSDT信号提醒
- AI量化辅助工具
