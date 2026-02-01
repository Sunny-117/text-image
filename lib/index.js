// src/core/Bitmap.ts
var Bitmap = class {
  width;
  height;
  pixels;
  constructor(width, height, pixels) {
    this.width = width;
    this.height = height;
    this.pixels = pixels;
  }
  /**
   * 获取某个坐标的像素点信息
   */
  getPixelAt(x, y) {
    const i = y * this.width * 4 + x * 4;
    return [
      this.pixels[i],
      this.pixels[i + 1],
      this.pixels[i + 2],
      +(this.pixels[i + 3] / 255).toFixed(2)
    ];
  }
};

// src/core/source/BaseSource.ts
var BaseSource = class {
  canvas;
  ctx;
  isInit;
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.isInit = false;
  }
  init() {
    if (!this.isInit) {
      this.initCanvas();
      this.isInit = true;
    }
  }
  getBitmap() {
    this.init();
    this.draw();
    const { width, height } = this.canvas;
    const pixels = this.ctx.getImageData(0, 0, width, height).data;
    return new Bitmap(width, height, pixels);
  }
};

// src/core/source/ImgSource.ts
var ImgSource = class extends BaseSource {
  img;
  width;
  height;
  constructor(option) {
    super();
    this.img = option.img;
    this.width = option.width;
    this.height = option.height;
  }
  initCanvas() {
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }
  draw() {
    this.ctx.drawImage(
      this.img,
      0,
      0,
      this.img.width,
      this.img.height,
      0,
      0,
      this.width,
      this.height
    );
  }
};

// src/core/source/TextSource.ts
var TextSource = class extends BaseSource {
  option;
  constructor(option) {
    super();
    this.option = option;
  }
  initCanvas() {
    this.canvas.width = this.option.text.length * this.option.fontSize;
    this.canvas.height = this.option.fontSize;
    this.ctx.font = `bold ${this.option.fontSize}px ${this.option.fontFamily}`;
    this.ctx.fillStyle = "#000";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
  }
  draw() {
    this.ctx.fillText(
      this.option.text,
      this.canvas.width / 2,
      this.canvas.height / 2
    );
  }
};

// src/core/source/VideoSource.ts
var VideoSource = class extends BaseSource {
  video;
  width;
  height;
  constructor(option) {
    super();
    this.video = option.video;
    this.width = option.width;
    this.height = option.height;
    this.video.muted = this.video.loop = true;
    this.video.play();
  }
  initCanvas() {
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }
  draw() {
    this.ctx.drawImage(
      this.video,
      0,
      0,
      this.video.videoWidth,
      this.video.videoHeight,
      0,
      0,
      this.width,
      this.height
    );
  }
};

// src/core/source/index.ts
function createSource(sourceOption) {
  if (sourceOption.text) {
    return new TextSource(sourceOption);
  } else if (sourceOption.img) {
    return new ImgSource(sourceOption);
  } else if (sourceOption.video) {
    return new VideoSource(sourceOption);
  }
  throw new TypeError("invalid source options");
}

// src/core/Painter.ts
var Painter = class {
  replaceText;
  raduis;
  source;
  isDynamic;
  canvas;
  ctx;
  textIndex;
  isGray;
  raqId;
  constructor(options) {
    this.replaceText = options.replaceText;
    this.raduis = options.raduis;
    this.source = options.source;
    this.isGray = options.isGray;
    this.isDynamic = options.isDynamic;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.textIndex = 0;
    this.raqId = 0;
    this.initContext();
  }
  fps() {
    if (this.isDynamic) {
      this.raqId = requestAnimationFrame(() => {
        this.draw();
        this.fps();
      });
    } else {
      this.draw();
    }
  }
  stop() {
    cancelAnimationFrame(this.raqId);
    this.raqId = 0;
  }
  initContext() {
    this.ctx.font = `bold 12px 'Roboto Mono' 'Microsoft YaHei' '\u5FAE\u8F6F\u96C5\u9ED1' 'sans-serif'`;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
  }
  drawText(x, y, rgba) {
    let [r, g, b, a] = rgba;
    if (!a) {
      return;
    }
    if (this.isGray) {
      r = g = b = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    }
    this.ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
    const c = this.replaceText[this.textIndex];
    this.textIndex = (this.textIndex + 1) % this.replaceText.length;
    this.ctx.fillText(c, x, y);
  }
  draw() {
    const bitmap = this.source.getBitmap();
    this.canvas.width = bitmap.width;
    this.canvas.height = bitmap.height;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let y = 0; y < bitmap.height; y += this.raduis) {
      for (let x = 0; x < bitmap.width; x += this.raduis) {
        const rgba = bitmap.getPixelAt(x, y);
        this.drawText(x, y, rgba);
      }
    }
  }
};

// src/index.ts
function normalizeOptions(options) {
  if (!options) {
    throw new Error("require options");
  }
  if (!options.canvas) {
    throw new Error('require "canvas" option');
  }
  options.replaceText = options.replaceText || "6";
  options.raduis = options.raduis || 10;
  options.isDynamic = !!options.isDynamic;
  options.isGray = !!options.isGray;
  if (!options.source) {
    throw new Error('require "source" option');
  }
}
function createImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function() {
      resolve(img);
    };
    img.onerror = function(e) {
      reject(e);
    };
    img.src = src;
  });
}
function createVideo(src) {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.oncanplay = function() {
      resolve(video);
    };
    video.onerror = function(e) {
      reject(e);
    };
    video.src = src;
  });
}
async function createTextImage(options) {
  normalizeOptions(options);
  let painter;
  let painterOption = { ...options };
  if (options.source.text) {
    painterOption.source = createSource({
      fontFamily: options.source.fontFamily || "Microsoft YaHei",
      text: options.source.text,
      fontSize: options.source.fontSize || 200
    });
  } else if (options.source.img) {
    const img = await createImage(options.source.img);
    let width = options.source.width || img.width, height = options.source.height || img.height;
    if (options.source.width && !options.source.height) {
      height = width / img.width * img.height;
    } else if (options.source.height && !options.source.width) {
      width = height / img.height * img.width;
    }
    painterOption.source = createSource({
      img,
      width,
      height
    });
  } else if (options.source.video) {
    const video = await createVideo(options.source.video);
    let width = options.source.width || video.videoWidth, height = options.source.height || video.videoHeight;
    if (options.source.width && !options.source.height) {
      height = width / video.videoWidth * video.videoHeight;
    } else if (options.source.height && !options.source.width) {
      width = height / video.videoHeight * video.videoWidth;
    }
    painterOption.source = createSource({
      video,
      width,
      height
    });
    painterOption.isDynamic = true;
  }
  painter = new Painter(painterOption);
  painter.fps();
  return {
    start() {
      painter.fps();
    },
    stop() {
      painter.stop();
    }
  };
}
export {
  createTextImage
};
