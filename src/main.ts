import { graphics } from "./core/graphics";
import { setupPIXIApplication } from "./core/pixi-setup";
import { Grid } from "./entities/grid";

const height = 801; // plus one for the border
const width = 801; // plus one for the border
const cellSize = 20;

const app = setupPIXIApplication({ height, width, graphics, background: 0x222222 });

const grid = new Grid({ cellSize, height, width });

app.ticker.add(() => {
  graphics.clear();
  grid.draw();
});

setInterval(() => {
  grid.depthFirstSearch();
}, 1000 / 120);
