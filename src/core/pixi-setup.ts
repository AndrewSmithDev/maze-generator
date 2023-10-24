import * as PIXI from "pixi.js";

type SetupOptions = {
  /** The width of the canvas */
  width: number;
  /** The height of the canvas */
  height: number;
  /** the PIXI.Graphics used to draw */
  graphics: PIXI.Graphics;
  /** The background color to use e.g. 0x222222 */
  background?: number;
};

/**
 * Sets up the PIXI.Application and adds the PIXI.Graphics to the stage.
 *
 * @param width the width of the canvas
 * @param height the height of the canvas
 * @param graphics the PIXI.Graphics used to draw the game
 * @returns the PIXI.Application
 */
export const setupPIXIApplication = ({ width, height, graphics, background }: SetupOptions) => {
  const app = new PIXI.Application<HTMLCanvasElement>({ background, width, height });
  app.stage.eventMode = "static";
  app.stage.hitArea = app.screen;
  app.stage.addChild(graphics);
  document.body.appendChild(app.view);
  return app;
};
