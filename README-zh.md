# text-image 库使用说明

![](./logo.png)

简体中文|[English](./README.md)

`text-image`可以将文字、图片、视频进行「文本化」

只需要通过简单的配置即可使用

## 体验地址

https://sunny-117.github.io/text-image/

## 开始

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
  </head>
  <body>
    <canvas id="demo"></canvas>
    <script src="./text-image/dist/text-image.iife.js"></script>
    <script>
      textImage.createTextImage({
        canvas: document.getElementById('demo'),
        source: {
          text: 'Text Image', // 绘制的文本是：Text Image
          fontFamily: 'Roboto Mono',
        },
      });
    </script>
  </body>
</html>
```

`text-image`打包了 3 个版本的文件：

1. `text-image.iife.js`：适用于传统的引入方式，将暴露一个全局变量`textImage`，包含方法`createTextImage`

2. `text-image.js`：适用于基于 ESM 的方式导入

   ```js
   import { createTextImage } from './dist/text-image.js'
   ```

3. `text-image.umd.cjs`：适用于基于 UMD 的方式导入

## 画文字

```js
textImage.createTextImage({
  // 必填，配置canvas元素，最终作画在其上完成
  canvas: document.querySelector('canvas'),
  // 可选，配置作画的文本，默认为'6'
  replaceText: '6',
  // 可选，配置作画半径，该值越大越稀疏，默认为 10
  raduis: 10,
  // 可选，配置是否灰度化，若开启灰度化则会丢失色彩，默认为 false
  isGray: false,
  // 必填，配置作画内容
  source: {
    // 必填，配置画什么文本
    text: 'Text Image',
    // 选填，配置文本使用的字体，CSS 格式，默认为微软雅黑
    fontFamily: 'Microsoft YaHei',
    // 选填，配置文本尺寸，默认为 200
    fontSize: 200
  },
})
```

## 画图片

```js
textImage.createTextImage({
  // 必填，配置canvas元素，最终作画在其上完成
  canvas: document.querySelector('canvas'),
  // 可选，配置作画的文本，默认为'6'
  replaceText: '6',
  // 可选，配置作画半径，该值越大越稀疏，默认为 10
  raduis: 10,
  // 可选，配置是否灰度化，若开启灰度化则会丢失色彩，默认为 false
  isGray: false,
  // 必填，配置作画内容
  source: {
    // 必填，配置画的图片路径
    img: 'path',
    // 选填，配置图片宽度，默认为图片自身宽度
    width: 500,
    // 选填，配置图片高度，默认为图片自身高度
    height: 300
  },
})
```



## 画视频

```js
textImage.createTextImage({
  // 必填，配置canvas元素，最终作画在其上完成
  canvas: document.querySelector('canvas'),
  // 可选，配置作画的文本，默认为'6'
  replaceText: '6',
  // 可选，配置作画半径，该值越大越稀疏，默认为 10
  raduis: 10,
  // 可选，配置是否灰度化，若开启灰度化则会丢失色彩，默认为 false
  isGray: false,
  // 必填，配置作画内容
  source: {
    // 必填，配置画的视频路径
    video: 'path',
    // 选填，配置视频宽度，默认为视频自身宽度
    width: 500,
    // 选填，配置视频高度，默认为视频自身高度
    height: 300
  },
})
```
