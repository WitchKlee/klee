# 我的博客

使用 Hexo 8、NexT 8 和 GitHub Pages 的独立博客。

- 源码仓库：https://github.com/WitchKlee/klee
- 正式网址：https://witchklee.github.io/klee/
- 本地预览：http://localhost:4000/

## 日常写作

在包含 `package.json` 的项目目录打开 PowerShell。

```powershell
npm.cmd run new -- "文章标题"
npm.cmd start
```

文章位于 `source/_posts/文章标题.md`。修改顶部的标题、日期、分类、标签，
在第二条 `---` 下方写正文。图片放在同名附件文件夹，引用方式：

```markdown
![照片说明](文章标题/照片.webp)
```

保存文章后刷新浏览器即可查看；修改配置文件后重启预览。
按 `Ctrl+C` 停止自己在终端启动的预览。端口被占用时，可运行：

```powershell
npm.cmd start -- --port 4001
```

项目还提供 VS Code 任务：打开本项目文件夹后，通过「终端 → 运行任务」
选择「博客：新建文章」「博客：本地预览」或「博客：发布前检查」。

## 修改站点

| 内容 | 文件 |
| --- | --- |
| 名称、副标题、简介、作者、正式网址 | `_config.yml` |
| 菜单、头像、侧栏、字体和评论配置 | `_config.next.yml` |
| 关于、项目、资源、友链页面 | `source/` 下的相应 `index.md` |
| 本地预览地址和根路径 | `_config.local.yml` |

本地预览读取两份配置，始终使用 `/` 根路径；正式发布使用 Pages 提供的网址，
自动适配 `/klee/` 子目录。站点暂无文章时，`scripts/empty-site.js` 提供首页、
归档和空订阅；添加文章后自动切换到正常文章列表。

当前没有原站文章、照片或友链；评论、统计和站点验证均已关闭。
`LICENSE.md` 保留上游源代码的许可与署名，依赖和主题保留各自许可证。

## 检查与发布

```powershell
npm.cmd run check
npm.cmd run build:pages
npm.cmd run verify

git add .
git commit -m "更新博客"
git push
```

Git 提交前会自动优化已暂存的图片并处理中文排版。
推送到 `main` 后，GitHub Actions 检查内容、生成网页并发布。
可以在仓库的 Actions 页面查看结果：
https://github.com/WitchKlee/klee/actions

首次发布需要在仓库 Settings → Pages 中把 Source 设置为 GitHub Actions。
不要手工修改 `public/`：它是生成目录，下一次构建会重建。

## 新电脑安装

安装 Git 和 Node.js 22.23.1 或兼容的新版本后：

```powershell
git clone https://github.com/WitchKlee/klee.git
cd klee
npm.cmd ci
npm.cmd start
```

首次 `git push` 如果提示 GitHub 登录，使用 WitchKlee 账号完成官方授权即可。
