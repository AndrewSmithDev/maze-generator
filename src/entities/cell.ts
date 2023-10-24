import { graphics } from "../core/graphics";
import { Line } from "./line";

export class Cell {
  private walls: [Line, Line, Line, Line];
  private showWalls: [boolean, boolean, boolean, boolean];
  private visited = false;

  constructor(
    public readonly x: number,
    public readonly y: number,
    private readonly size: number
  ) {
    const xPos = x * size;
    const yPox = y * size;

    const top = new Line({ x: xPos, y: yPox }, { x: xPos + size, y: yPox });
    const bottom = new Line({ x: xPos, y: yPox + size }, { x: xPos + size, y: yPox + size });
    const left = new Line({ x: xPos, y: yPox }, { x: xPos, y: yPox + size });
    const right = new Line({ x: xPos + size, y: yPox }, { x: xPos + size, y: yPox + size });

    this.walls = [top, right, bottom, left];
    this.showWalls = [true, true, true, true];
  }

  private mapWallToIndex(wall: "top" | "right" | "bottom" | "left"): 0 | 1 | 2 | 3 {
    switch (wall) {
      case "top":
        return 0;
      case "right":
        return 1;
      case "bottom":
        return 2;
      case "left":
        return 3;
    }
  }

  visit(): void {
    this.visited = true;
  }

  isVisited(): boolean {
    return this.visited;
  }

  removeWall(wall: "top" | "right" | "bottom" | "left"): void {
    const index = this.mapWallToIndex(wall);
    this.showWalls[index] = false;
  }

  private drawRect(color: number): void {
    const { x, y, size } = this;
    graphics.lineStyle({ width: 0 });
    graphics.beginFill(color);
    graphics.drawRect(x * size, y * size, size, size);
    graphics.endFill();
  }

  draw(): void {
    const [top, right, bottom, left] = this.walls;
    const [showTop, showRight, showBottom, showLeft] = this.showWalls;

    if (this.visited) {
      this.drawRect(0x1e90ff);
    }

    if (showTop) top.draw();
    if (showRight) right.draw();
    if (showBottom) bottom.draw();
    if (showLeft) left.draw();
  }

  drawAsCurrent(): void {
    this.drawRect(0xff8800);
  }
}
