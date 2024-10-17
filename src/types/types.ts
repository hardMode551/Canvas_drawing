export interface Point {
  x: number;
  y: number;
}

export interface Rect {
  position: Point;
  size: { width: number; height: number };
}

export interface ConnectionPoint {
  point: Point;
  angle: number;
}
