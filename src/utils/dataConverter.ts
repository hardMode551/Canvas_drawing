import { ConnectionPoint, Point, Rect } from "../types/types";

export function isPointOnRectEdge(rect: Rect, point: Point): boolean {
  const { x, y } = point;
  const rectLeft = rect.position.x - rect.size.width / 2;
  const rectRight = rect.position.x + rect.size.width / 2;
  const rectTop = rect.position.y - rect.size.height / 2;
  const rectBottom = rect.position.y + rect.size.height / 2;

  return (
    ((x === rectLeft || x === rectRight) && y >= rectTop && y <= rectBottom) ||
    ((y === rectTop || y === rectBottom) && x >= rectLeft && x <= rectRight)
  );
}

// Функция для проверки, пересекает ли линия прямоугольник
function isLineCrossingRect(start: Point, end: Point, rect: Rect): boolean {
  const { x: x1, y: y1 } = start;
  const { x: x2, y: y2 } = end;

  const rectLeft = rect.position.x - rect.size.width / 2;
  const rectRight = rect.position.x + rect.size.width / 2;
  const rectTop = rect.position.y - rect.size.height / 2;
  const rectBottom = rect.position.y + rect.size.height / 2;

  // Проверка, что линия пересекает прямоугольник по осям x и y
  return (
    (x1 <= rectRight && x2 >= rectLeft && y1 >= rectTop && y1 <= rectBottom) || // Горизонтальная линия пересекает прямоугольник
    (y1 <= rectBottom && y2 >= rectTop && x1 >= rectLeft && x1 <= rectRight) // Вертикальная линия пересекает прямоугольник
  );
}

function isAnglePerpendicular(angle: number): boolean {
  return [0, 90, 180, 270].includes(angle % 360);
}

// Построение ломаной линии с обходом
export const dataConverter = (
  rect1: Rect,
  rect2: Rect,
  cPoint1: ConnectionPoint,
  cPoint2: ConnectionPoint
): Point[] => {
  // Проверки, что точки соединения корректны
  if (!isPointOnRectEdge(rect1, cPoint1.point)) {
    throw new Error(
      "Точка подсоединения cPoint1 не лежит на грани прямоугольника rect1."
    );
  }
  if (!isPointOnRectEdge(rect2, cPoint2.point)) {
    throw new Error(
      "Точка подсоединения cPoint2 не лежит на грани прямоугольника rect2."
    );
  }
  if (!isAnglePerpendicular(cPoint1.angle)) {
    throw new Error("Угол подсоединения cPoint1 не перпендикулярен.");
  }
  if (!isAnglePerpendicular(cPoint2.angle)) {
    throw new Error("Угол подсоединения cPoint2 не перпендикулярен.");
  }

  const points: Point[] = [cPoint1.point];

  // Вычисление ломаной линии
  // Ломаная линия проходит через промежуточную точку, чтобы избежать прямого пересечения
  let midPoint: Point;

  // Пытаемся построить прямую линию между точками соединения
  if (
    cPoint1.point.x === cPoint2.point.x ||
    cPoint1.point.y === cPoint2.point.y
  ) {
    // Прямая линия по оси x или y
    points.push(cPoint2.point);
  } else {
    // Добавляем промежуточную точку для ломаной линии
    midPoint = { x: cPoint1.point.x, y: cPoint2.point.y };

    // Проверяем, не пересекает ли промежуточная точка оба прямоугольника
    if (
      isLineCrossingRect(cPoint1.point, midPoint, rect1) ||
      isLineCrossingRect(midPoint, cPoint2.point, rect2)
    ) {
      // Если пересекает, меняем стратегию - строим обход вокруг прямоугольников
      midPoint = { x: cPoint2.point.x, y: cPoint1.point.y };
    }

    points.push(midPoint);
    points.push(cPoint2.point);
  }

  return points;
};
