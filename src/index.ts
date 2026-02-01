import { createSource } from './core/source';
import { Painter, PainterOptions } from './core/Painter';

export type TextImageOption = {
  canvas: HTMLCanvasElement;
  replaceText?: string;
  raduis?: number;
  source: any;
  isDynamic?: boolean;
  isGray?: boolean;
};

function normalizeOptions(options: TextImageOption) {
  if (!options) {
    throw new Error('require options');
  }
  if (!options.canvas) {
    throw new Error('require "canvas" option');
  }
  options.replaceText = options.replaceText || '6';
  options.raduis = options.raduis || 10;
  options.isDynamic = !!options.isDynamic;
  options.isGray = !!options.isGray;
  if (!options.source) {
    throw new Error('require "source" option');
  }
}

function createImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function () {
      resolve(img);
    };
    img.onerror = function (e) {
      reject(e);
    };
    img.src = src;
  });
}

function createVideo(src: string): Promise<HTMLVideoElement> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.oncanplay = function () {
      resolve(video);
    };
    video.onerror = function (e) {
      reject(e);
    };
    video.src = src;
  });
}

export async function createTextImage(options: TextImageOption) {
  normalizeOptions(options);
  let painter: Painter;
  let painterOption = { ...options };
  if (options.source.text) {
    painterOption.source = createSource({
      fontFamily: options.source.fontFamily || 'Microsoft YaHei',
      text: options.source.text,
      fontSize: options.source.fontSize || 200,
    });
  } else if (options.source.img) {
    const img = await createImage(options.source.img);
    let width = options.source.width || img.width,
      height = options.source.height || img.height;
    if (options.source.width && !options.source.height) {
      height = (width / img.width) * img.height;
    } else if (options.source.height && !options.source.width) {
      width = (height / img.height) * img.width;
    }
    painterOption.source = createSource({
      img,
      width,
      height,
    });
  } else if (options.source.video) {
    const video = await createVideo(options.source.video);
    let width = options.source.width || video.videoWidth,
      height = options.source.height || video.videoHeight;
    if (options.source.width && !options.source.height) {
      height = (width / video.videoWidth) * video.videoHeight;
    } else if (options.source.height && !options.source.width) {
      width = (height / video.videoHeight) * video.videoWidth;
    }
    painterOption.source = createSource({
      video,
      width,
      height,
    });
    painterOption.isDynamic = true;
  }
  painter = new Painter(painterOption as PainterOptions);
  painter.fps();
  return {
    start() {
      painter.fps();
    },
    stop() {
      painter.stop();
    },
  };
}
