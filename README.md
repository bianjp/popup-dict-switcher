# popup-dict-switcher

Gnome 扩展，一键开关 [popup-dict](https://github.com/bianjp/popup-dict/)

点击状态栏图标即可切换状态

![on](./screenshots/on.png)
![off](./screenshots/off.png)

## 安装

确保已安装 [popup-dict](https://github.com/bianjp/popup-dict/)，且 `popup-dict` 命令在用户的 `PATH` 中

### 在线安装（推荐）

https://extensions.gnome.org/extension/1349/popup-dict-switcher/

在线安装方式便于升级

__目前尚未通过审核，暂无法通过此方式安装__

### 手动

1. 下载文件并移动/链接到用户扩展目录（`~/.local/share/gnome-shell/extensions/`）：

    ```bash
    EXTENSION_DIR="$HOME/.local/share/gnome-shell/extensions/popup-dict-switcher@bianjp.com"
    rm -rf "$EXTENSION_DIR"

    # 下载压缩包，解压到扩展目录
    curl -Lo popup-dict-switcher-master.zip https://github.com/bianjp/popup-dict-switcher/archive/master.zip
    unzip popup-dict-switcher-master.zip
    mv popup-dict-switcher-master "$EXTENSION_DIR"
    rm popup-dict-switcher-master.zip

    # 或 clone 仓库，链接到扩展目录
    git clone https://github.com/bianjp/popup-dict-switcher.git
    ln -s "${PWD}/popup-dict-switcher" "$EXTENSION_DIR"
    ```

2. 重启 Gnome Shell（`Alt + F2`，输入 `r`，回车）；

3. 启用扩展。可通过以下方式：
    * Gnome Tweak Tool
    * https://extensions.gnome.org/local/
    * 命令行: `gnome-shell-extension-tool -e popup-dict-switcher@bianjp.com`

## Todo

* 优化 icon 样式
* logging

## Licenses

This project is licensed under the terms of the MIT license.
