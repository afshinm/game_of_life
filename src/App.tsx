import * as React from 'react';
import Game from './lib/game';

class App extends React.Component {
  private width: number;
  private height: number;
  private game: Game;

  constructor(props?: any) {
    super(props);

    const game = new Game([
      {x: 10, y: 10, live: true},
      {x: 10, y: 11, live: true},
      {x: 10, y: 12, live: true},
      {x: 11, y: 12, live: true},
      {x: 12, y: 12, live: true},
      {x: 12, y: 13, live: true},
      {x: 12, y: 14, live: true},
    ]);
    this.game = game;
    this.width = game.scene.width;
    this.height = game.scene.height;

    this.state = {
      pixels: game.scene.pixels
    };
  }

  public generateNext(): void {
    setTimeout(() => {
      this.setState({pixels: this.game.nextGeneration()});
      this.generateNext();
    }, 100);
  }

  public componentDidMount() {
    this.generateNext();
  }

  public renderPixels() {
    const pixels = [];
    const size = 10;
    const state: any = this.state;

    for (let x = 0; x < this.width;x++) {
      for (let y = 0; y < this.height;y++) {
        const pixel = state.pixels[x][y];
        pixels.push(<rect fill={pixel ? 'black' : 'white'} width={size} height={size} x={x * size} y={y * size} />);
      }
    }

    return (
      <svg height={500} width={500}>
        {pixels}
      </svg>
    );
  }

  public render() {
    return (
      <div className="App">
        {this.renderPixels()}
      </div>
    );
  }
}

export default App;
