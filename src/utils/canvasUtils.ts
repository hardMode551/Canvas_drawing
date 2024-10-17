import { Point, Rect } from "../types/types";

// Функция для проверки пересечения прямоугольников
export const checkRectanglesOverlap = (rect1: Rect, rect2: Rect): boolean => {
    const rect1Left = rect1.position.x - rect1.size.width / 2;
    const rect1Right = rect1.position.x + rect1.size.width / 2;
    const rect1Top = rect1.position.y - rect1.size.height / 2;
    const rect1Bottom = rect1.position.y + rect1.size.height / 2;

    const rect2Left = rect2.position.x - rect2.size.width / 2;
    const rect2Right = rect2.position.x + rect2.size.width / 2;
    const rect2Top = rect2.position.y - rect2.size.height / 2;
    const rect2Bottom = rect2.position.y + rect2.size.height / 2;

    // Проверка, что прямоугольники не пересекаются
    return !(rect1Right < rect2Left || rect1Left > rect2Right || rect1Bottom < rect2Top || rect1Top > rect2Bottom);
};

  

export const drawRect = (ctx: CanvasRenderingContext2D, rect: Rect, color: string) => {
  ctx.beginPath();
  const x = rect.position.x - rect.size.width / 2;
  const y = rect.position.y - rect.size.height / 2;
  ctx.strokeStyle = color;
  ctx.rect(x, y, rect.size.width, rect.size.height);
  ctx.stroke();
};

export const drawPath = (ctx: CanvasRenderingContext2D, points: Point[]) => {
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.stroke();

  ctx.fillStyle = 'red';
  ctx.beginPath();
  ctx.arc(points[0].x, points[0].y, 3, 0, 3 * Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(points[points.length - 1].x, points[points.length - 1].y, 3, 0, 3 * Math.PI);
  ctx.fill();
};
