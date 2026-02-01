export class Bitmap {
  width: number;
  height: number;
  pixels: Uint8ClampedArray;

  constructor(width: number, height: number, pixels: Uint8ClampedArray) {
    this.width = width;
    this.height = height;
    this.pixels = pixels;
  }

  /**
   * 获取某个坐标的像素点信息
   */
  getPixelAt(x: number, y: number): [number, number, number, number] {
    const i = y * this.width * 4 + x * 4;
    return [
      this.pixels[i],
      this.pixels[i + 1],
      this.pixels[i + 2],
      +(this.pixels[i + 3] / 255).toFixed(2),
    ];
  }
}
