# MAME 小霸王

一款新的 MAME GUI 前端。

# 下载地址

## 天翼网盘

https://cloud.189.cn/t/faqYVneMBBJb (访问码:3usd)

## 百度网盘

链接：https://pan.baidu.com/s/1RvLOfJNVyor-A7BbTRV7Dw
提取码：w6zv

# 模拟器核心

MAME-0.237
https://www.mamedev.org/

# 使用教程

## 基础

- 解压运行 my-app.exe
- 双击右侧游戏名称运行游戏
- 上下左右，WSAD, 按键，J K U I
- 数字键 5 投币，数字键 1 开始
- F12:游戏快照

## 改建

游戏内按 TAB 键

## 添加游戏

- 1.下载对应的 rom 放到 /resources/app/roms 或 mame/roms/
- 2.编辑 /resources/app/src/roms.json 文件 3.

```json
{
  "key": "kf2k2mp", //游戏rom名称
  "title": "拳皇2002魔法加强", //前端界面显示标题
  "describer": "拳皇2002魔法加强2" //游戏附加描述
}
```

# 界面

![](./img/1.png)
![](./img/2.png)
