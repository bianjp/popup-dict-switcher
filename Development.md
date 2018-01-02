# 开发

1. 将仓库目录链接到 `$HOME/.local/share/gnome-shell/extensions/popup-dict-switcher@bianjp.com`，以便测试
2. 修改代码后，重启 Gnome Shell 以生效
3. 查看扩展输出：`journalctl /usr/bin/gnome-shell`

## 发布

打包：

```bash
./package.sh
```

将压缩包上传到 https://extensions.gnome.org/upload/

## 参考资料

* [Gnome references](https://developer.gnome.org/references)
* [Gnome Shell Extensions](https://wiki.gnome.org/Projects/GnomeShell/Extensions)
* [Gjs](https://wiki.gnome.org/Projects/Gjs)
* [Gjs Docs](http://devdocs.baznga.org/)
* [Gjs source code](https://github.com/GNOME/gnome-shell/blob/master/js/)
* [St Docs](https://developer.gnome.org/st/stable/)
