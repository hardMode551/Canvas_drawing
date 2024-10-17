import { dataConverter } from "../utils/dataConverter";

describe("dataConverter", () => {
  it("should return points for two rectangles that overlap", () => {
    const rect1 = {
      position: { x: 0, y: 0 },
      size: { width: 100, height: 100 },
    };
    console.log('rect1', rect1)
    const rect2 = {
      position: { x: 50, y: 50 },
      size: { width: 100, height: 100 },
    };
    const cPoint1 = {
      point: { x: 50, y: 50 },
      angle: 0,
    };
    const cPoint2 = {
      point: { x: 100, y: 100 },
      angle: 0,
    };
  
    const points = dataConverter(rect1, rect2, cPoint1, cPoint2);
    console.log('points:', points);
  
    expect(points.length).toBe(3); 
    expect(points[0].x).toBe(50);
    expect(points[0].y).toBe(50);
    expect(points[1].x).toBe(100);
    expect(points[1].y).toBe(50); 
    expect(points[2].x).toBe(100);
    expect(points[2].y).toBe(100);
  });

  it("should return points for two rectangles that don't overlap", () => {
    const rect1 = {
      position: { x: 0, y: 0 },
      size: { width: 100, height: 100 },
    };
    const rect2 = {
      position: { x: 200, y: 200 },
      size: { width: 100, height: 100 },
    };
    const cPoint1 = {
      point: { x: 50, y: 50 },
      angle: 0,
    };
    const cPoint2 = {
      point: { x: 250, y: 250 },
      angle: 0,
    };
  
    const points = dataConverter(rect1, rect2, cPoint1, cPoint2);
    console.log('points:', points);
  
    expect(points.length).toBe(3);
    expect(points[0].x).toBe(50);
    expect(points[0].y).toBe(50);
    expect(points[1].x).toBe(250);
    expect(points[1].y).toBe(50);
    expect(points[2].x).toBe(250);
    expect(points[2].y).toBe(250);
  });
});