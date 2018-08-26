export default class Scene {
  private readonly sceneWidth: number = 20;
  private readonly sceneHeight: number = 20;
  private scenePixels: boolean[][];

  // TODO: can we refactor seed into an array of Pixels?
  constructor(seed: any[]) {
    this.scenePixels = Array.from({length: this.sceneWidth}, () => Array.from({length: this.sceneHeight}, () => false));

    for (const pixel of seed) {
      this.setPixel(pixel.x, pixel.y, pixel.live);
    }
  }

  get width(): number {
    return this.sceneWidth;
  }

  get height(): number {
    return this.sceneHeight;
  }

  get pixels(): boolean[][] {
    return this.scenePixels;
  }

  public setPixel(x: number, y: number, live: boolean): void {
    window.console.log('set pixel', x, y, live, this.scenePixels[x]);
    this.scenePixels[x][y] = live;
  }

  public getNeighbours(x: number, y: number): any[] {
    const neighbours: boolean[] = [];

    /*
         X X X
         X O X
         X X X
     */

    if (y > 0) {
      neighbours.push(this.pixels[x][y - 1]);
    }

    if (y < this.height - 1) {
      neighbours.push(this.pixels[x][y + 1]);
    }

    if (x > 0) {
      neighbours.push(this.pixels[x - 1][y]);

      if (y > 0) {
        neighbours.push(this.pixels[x - 1][y - 1]);
      }

      if (y < this.height - 1) {
        neighbours.push(this.pixels[x - 1][y + 1]);
      }
    }

    if (x < this.width - 1) {
      neighbours.push(this.pixels[x + 1][y]);

      if (y > 0) {
        neighbours.push(this.pixels[x + 1][y - 1]);
      }

      if (y < this.height - 1) {
        neighbours.push(this.pixels[x + 1][y + 1]);
      }
    }

    window.console.log(x, y, neighbours);

    return neighbours;
  }
}
