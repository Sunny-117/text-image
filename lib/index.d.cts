type TextImageOption = {
    canvas: HTMLCanvasElement;
    replaceText?: string;
    raduis?: number;
    source: any;
    isDynamic?: boolean;
    isGray?: boolean;
};
declare function createTextImage(options: TextImageOption): Promise<{
    start(): void;
    stop(): void;
}>;

export { type TextImageOption, createTextImage };
