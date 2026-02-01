import { Bitmap } from '../Bitmap';

export abstract class BaseSource {
  protected canvas: HTMLCanvasElement;
  protected ctx: CanvasRenderingContext2D;
  private isInit: boolean;
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d')!;
    this.isInit = false;
  }
  protected abstract initCanvas(): void;
  protected abstract draw(): void;

  private init() {
    if (!this.isInit) {
      this.initCanvas();
      this.isInit = true;
    }
  }

  getBitmap(): Bitmap {
    this.init();
    this.draw();
    const { width, height } = this.canvas;
    const pixels = this.ctx.getImageData(0, 0, width, height).data;
    return new Bitmap(width, height, pixels);
  }
}
