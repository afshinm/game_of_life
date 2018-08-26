import Scene from './scene';

export default class Game {
  private gameScene: Scene;

  constructor(seed: any[]) {
    this.gameScene = new Scene(seed);
  }

  get scene(): Scene {
    return this.gameScene;
  }

  public nextGeneration(): boolean[][] {
    for (let x = 0; x < this.scene.width; x++) {
      for (let y = 0; y < this.scene.height; y++) {
        const pixel = this.scene.pixels[x][y];
        const neighbours: boolean[] = this.scene.getNeighbours(x, y);
        const lives: number = neighbours.filter(k => k).length;

        // window.console.log('lives', lives)

        if (pixel && lives < 2) {
          this.scene.setPixel(x, y, false);
          continue;
        }

        if (pixel && (lives === 2 || lives === 3)) {
          this.scene.setPixel(x, y, true);
          continue;
        }

        if (pixel && lives > 3) {
          this.scene.setPixel(x, y, false);
          continue;
        }

        if (!pixel && lives === 3) {
          this.scene.setPixel(x, y, true);
        }
      }
    }

    return this.scene.pixels;
  }
}
