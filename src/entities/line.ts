import { graphics } from "../core/graphics";
import { Vector } from "../types/vector";

/**
 * A line is a line segment between two points. The line is responsible for drawing itself.
 */
export class Line {
  /**
   * Creates a new Line. The line is responsible for drawing itself.
   *
   * @param start the start position of the line
   * @param end the end position of the line
   * @param alpha the alpha of the line used for transparency when drawing the line (default: 1)
   */
  constructor(
    public start: Vector,
    public end: Vector,
    private readonly alpha = 1
  ) {}

  /**
   * Draws the line
   */
  draw(): void {
    graphics.lineStyle({
      width: 1,
      color: 0xffffff,
      alpha: this.alpha,
    });
    graphics.moveTo(this.start.x, this.start.y);
    graphics.lineTo(this.end.x, this.end.y);
  }
}
