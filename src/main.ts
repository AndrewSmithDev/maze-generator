import { graphics } from "./core/graphics";
import { setupPIXIApplication } from "./core/pixi-setup";
import { Grid } from "./entities/grid";

const height = 601; // plus one for the border
const width = 601; // plus one for the border
const cellSize = 40;

const app = setupPIXIApplication({ height, width, graphics, background: 0x222222 });

const grid = new Grid({ cellSize, height, width });

app.ticker.add(() => {
  grid.draw();
  grid.depthFirstSearch();
});
