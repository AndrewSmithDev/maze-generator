import { Cell } from "./cell";

export class Grid {
  private readonly cells: Cell[];
  private readonly stack: number[] = [];
  private indexOfCurrentCell = 0;
  private rowCount: number;
  private columnCount: number;

  constructor({ cellSize, height, width }: { cellSize: number; height: number; width: number }) {
    this.cells = [];

    this.rowCount = Math.floor(height / cellSize);
    this.columnCount = Math.floor(width / cellSize);

    const yCount = height / cellSize - 1;
    const xCount = width / cellSize - 1;
    for (let y = 0; y < yCount; y += 1) {
      for (let x = 0; x < xCount; x += 1) {
        this.cells.push(new Cell(x, y, cellSize));
      }
    }
  }

  coordinatesToIndex(x: number, y: number): number {
    if (x < 0) return -1;
    if (y < 0) return -1;
    if (x >= this.columnCount) return -1;
    if (y >= this.rowCount) return -1;
    return y * this.columnCount + x;
  }

  depthFirstSearch(): void {
    this.cells[this.indexOfCurrentCell].visit();
    const currentCell = this.cells[this.indexOfCurrentCell];
    const nextIndex = this.getRandomNeighbor(this.indexOfCurrentCell);

    if (nextIndex !== undefined) {
      const nextCell = this.cells[nextIndex];
      nextCell.visit();
      this.removeWallBetween(currentCell, nextCell);
      this.indexOfCurrentCell = nextIndex;
      this.stack.push(this.indexOfCurrentCell);
    } else {
      const nextIndex = this.stack.pop();
      if (nextIndex !== undefined) {
        this.indexOfCurrentCell = nextIndex;
      } else {
        this.indexOfCurrentCell = 0;
      }
    }
  }

  private getUnvisitedNeighbors(index: number): number[] {
    const neighbors: number[] = [];
    const { x, y } = this.cells[index];

    const top = this.coordinatesToIndex(x, y - 1);
    const right = this.coordinatesToIndex(x + 1, y);
    const bottom = this.coordinatesToIndex(x, y + 1);
    const left = this.coordinatesToIndex(x - 1, y);

    if (this.cells[top] && !this.cells[top].isVisited()) neighbors.push(top);
    if (this.cells[right] && !this.cells[right].isVisited()) neighbors.push(right);
    if (this.cells[bottom] && !this.cells[bottom].isVisited()) neighbors.push(bottom);
    if (this.cells[left] && !this.cells[left].isVisited()) neighbors.push(left);

    return neighbors;
  }

  private getRandomNeighbor(index: number): number | undefined {
    const neighbors = this.getUnvisitedNeighbors(index);
    if (neighbors.length === 0) return undefined;

    const randomIndex = Math.floor(Math.random() * neighbors.length);
    return neighbors[randomIndex];
  }

  private removeWallBetween(currentCell: Cell, nextCell: Cell): void {
    const xDiff = currentCell.x - nextCell.x;
    const yDiff = currentCell.y - nextCell.y;

    if (xDiff === 1) {
      currentCell.removeWall("left");
      nextCell.removeWall("right");
    } else if (xDiff === -1) {
      currentCell.removeWall("right");
      nextCell.removeWall("left");
    } else if (yDiff === 1) {
      currentCell.removeWall("top");
      nextCell.removeWall("bottom");
    } else if (yDiff === -1) {
      currentCell.removeWall("bottom");
      nextCell.removeWall("top");
    }
  }

  draw(): void {
    this.cells.forEach((cell) => cell.draw());
    this.cells[this.indexOfCurrentCell].drawAsCurrent();
  }
}
