import { BaseSource } from './BaseSource';

export class TextSource extends BaseSource {
  option: TextSourceOption;
  constructor(option: TextSourceOption) {
    super();
    this.option = option;
  }

  protected initCanvas(): void {
    this.canvas.width = this.option.text.length * this.option.fontSize;
    this.canvas.height = this.option.fontSize;
    this.ctx.font = `bold ${this.option.fontSize}px ${this.option.fontFamily}`;
    this.ctx.fillStyle = '#000';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
  }
  protected draw(): void {
    this.ctx.fillText(
      this.option.text,
      this.canvas.width / 2,
      this.canvas.height / 2
    );
  }
}

export type TextSourceOption = {
  text: string;
  fontSize: number;
  fontFamily: string;
};
