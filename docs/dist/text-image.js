var x = Object.defineProperty;
var l = (t, i, h) => i in t ? x(t, i, { enumerable: !0, configurable: !0, writable: !0, value: h }) : t[i] = h;
var s = (t, i, h) => (l(t, typeof i != "symbol" ? i + "" : i, h), h);
class g {
  constructor(i, h, e) {
    s(this, "width");
    s(this, "height");
    s(this, "pixels");
    this.width = i, this.height = h, this.pixels = e;
  }
  getPixelAt(i, h) {
    const e = h * this.width * 4 + i * 4;
    return [
      this.pixels[e],
      this.pixels[e + 1],
      this.pixels[e + 2],
      +(this.pixels[e + 3] / 255).toFixed(2)
    ];
  }
}
class d {
  constructor() {
    s(this, "canvas");
    s(this, "ctx");
    s(this, "isInit");
    this.canvas = document.createElement("canvas"), this.ctx = this.canvas.getContext("2d"), this.isInit = !1;
  }
  init() {
    this.isInit || (this.initCanvas(), this.isInit = !0);
  }
  getBitmap() {
    this.init(), this.draw();
    const { width: i, height: h } = this.canvas, e = this.ctx.getImageData(0, 0, i, h).data;
    return new g(i, h, e);
  }
}
class w extends d {
  constructor(h) {
    super();
    s(this, "img");
    s(this, "width");
    s(this, "height");
    this.img = h.img, this.width = h.width, this.height = h.height;
  }
  initCanvas() {
    this.canvas.width = this.width, this.canvas.height = this.height;
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
}
class v extends d {
  constructor(h) {
    super();
    s(this, "option");
    this.option = h;
  }
  initCanvas() {
    this.canvas.width = this.option.text.length * this.option.fontSize, this.canvas.height = this.option.fontSize, this.ctx.font = `bold ${this.option.fontSize}px ${this.option.fontFamily}`, this.ctx.fillStyle = "#000", this.ctx.textAlign = "center", this.ctx.textBaseline = "middle";
  }
  draw() {
    this.ctx.fillText(
      this.option.text,
      this.canvas.width / 2,
      this.canvas.height / 2
    );
  }
}
class f extends d {
  constructor(h) {
    super();
    s(this, "video");
    s(this, "width");
    s(this, "height");
    this.video = h.video, this.width = h.width, this.height = h.height, this.video.muted = this.video.loop = !0, this.video.play();
  }
  initCanvas() {
    this.canvas.width = this.width, this.canvas.height = this.height;
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
}
function n(t) {
  if (t.text)
    return new v(t);
  if (t.img)
    return new w(t);
  if (t.video)
    return new f(t);
  throw new TypeError("invalid source options");
}
class m {
  constructor(i) {
    s(this, "replaceText");
    s(this, "raduis");
    s(this, "source");
    s(this, "isDynamic");
    s(this, "canvas");
    s(this, "ctx");
    s(this, "textIndex");
    s(this, "isGray");
    s(this, "raqId");
    this.replaceText = i.replaceText, this.raduis = i.raduis, this.source = i.source, this.isGray = i.isGray, this.isDynamic = i.isDynamic, this.canvas = i.canvas, this.ctx = this.canvas.getContext("2d"), this.textIndex = 0, this.raqId = 0, this.initContext();
  }
  fps() {
    this.isDynamic ? this.raqId = requestAnimationFrame(() => {
      this.draw(), this.fps();
    }) : this.draw();
  }
  stop() {
    cancelAnimationFrame(this.raqId), this.raqId = 0;
  }
  initContext() {
    this.ctx.font = "bold 12px 'Roboto Mono' 'Microsoft YaHei' '\u5FAE\u8F6F\u96C5\u9ED1' 'sans-serif'", this.ctx.textAlign = "center", this.ctx.textBaseline = "middle";
  }
  drawText(i, h, e) {
    let [r, a, c, o] = e;
    if (!o)
      return;
    this.isGray && (r = a = c = 0.2126 * r + 0.7152 * a + 0.0722 * c), this.ctx.fillStyle = `rgba(${r},${a},${c},${o})`;
    const u = this.replaceText[this.textIndex];
    this.textIndex = (this.textIndex + 1) % this.replaceText.length, this.ctx.fillText(u, i, h);
  }
  draw() {
    const i = this.source.getBitmap();
    this.canvas.width = i.width, this.canvas.height = i.height, this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let h = 0; h < i.height; h += this.raduis)
      for (let e = 0; e < i.width; e += this.raduis) {
        const r = i.getPixelAt(e, h);
        this.drawText(e, h, r);
      }
  }
}
function y(t) {
  if (!t)
    throw new Error("require options");
  if (!t.canvas)
    throw new Error('require "canvas" option');
  if (t.replaceText = t.replaceText || "6", t.raduis = t.raduis || 10, t.isDynamic = !!t.isDynamic, t.isGray = !!t.isGray, !t.source)
    throw new Error('require "source" option');
}
function I(t) {
  return new Promise((i, h) => {
    const e = new Image();
    e.onload = function() {
      i(e);
    }, e.onerror = function(r) {
      h(r);
    }, e.src = t;
  });
}
function T(t) {
  return new Promise((i, h) => {
    const e = document.createElement("video");
    e.oncanplay = function() {
      i(e);
    }, e.onerror = function(r) {
      h(r);
    }, e.src = t;
  });
}
async function q(t) {
  y(t);
  let i, h = { ...t };
  if (t.source.text)
    h.source = n({
      fontFamily: t.source.fontFamily || "Microsoft YaHei",
      text: t.source.text,
      fontSize: t.source.fontSize || 200
    });
  else if (t.source.img) {
    const e = await I(t.source.img);
    let r = t.source.width || e.width, a = t.source.height || e.height;
    t.source.width && !t.source.height ? a = r / e.width * e.height : t.source.height && !t.source.width && (r = a / e.height * e.width), h.source = n({
      img: e,
      width: r,
      height: a
    });
  } else if (t.source.video) {
    const e = await T(t.source.video);
    let r = t.source.width || e.videoWidth, a = t.source.height || e.videoHeight;
    t.source.width && !t.source.height ? a = r / e.videoWidth * e.videoHeight : t.source.height && !t.source.width && (r = a / e.videoHeight * e.videoWidth), h.source = n({
      video: e,
      width: r,
      height: a
    }), h.isDynamic = !0;
  }
  return i = new m(h), i.fps(), {
    start() {
      i.fps();
    },
    stop() {
      i.stop();
    }
  };
}
export {
  q as createTextImage
};
