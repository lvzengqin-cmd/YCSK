# 策弈量化百度收录提交材料

## 已准备的收录入口

- 官网首页：https://www.yucebot.com/
- 软件下载页：https://www.yucebot.com/download
- 下载子域名：https://download.yucebot.com/
- 白皮书：https://www.yucebot.com/baipishu
- 用户手册：https://www.yucebot.com/shouce
- Sitemap：https://www.yucebot.com/sitemap.xml
- Robots：https://www.yucebot.com/robots.txt

## 百度搜索资源平台提交步骤

1. 登录百度搜索资源平台：https://ziyuan.baidu.com/
2. 添加站点 `https://www.yucebot.com/`。
3. 按平台提示完成站点验证。
4. 提交 sitemap：`https://www.yucebot.com/sitemap.xml`。
5. 在“普通收录”中提交以下 URL：

```text
https://www.yucebot.com/
https://www.yucebot.com/download
https://download.yucebot.com/
https://www.yucebot.com/baipishu
https://www.yucebot.com/shouce
https://www.yucebot.com/payment
```

## API 推送说明

若百度站长平台提供了该站点的主动推送 token，可使用如下命令提交：

```bash
BAIDU_PUSH_TOKEN=你的百度推送token node scripts/baidu-submit.mjs
```

或使用 curl：

```bash
curl -H "Content-Type:text/plain" --data-binary @baidu-urls.txt "https://data.zz.baidu.com/urls?site=https://www.yucebot.com&token=你的百度推送token"
```

当前仓库未发现百度主动推送 token，因此不能伪称已通过 API 提交。页面、robots、sitemap、URL 清单、主动推送脚本和结构化数据已经准备好，完成百度站点验证后即可提交。百度官方普通收录可缩短爬虫发现链接时间，但不保证一定收录；上线后建议持续保持官网内容更新和外链入口。

## 搜索关键词建议

- 策弈量化
- 策弈量化
- 策弈量化软件
- 策弈量化软件
- 策弈量化软件下载
- 策弈量化软件下载
- 策弈量化APP
- 策弈量化app
- 策弈量化app
- 事件合约量化
- 事件合约全自动下单软件
- 事件合约AI量化
- 策弈事件合约AI量化系统
