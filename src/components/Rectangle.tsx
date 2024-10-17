import { Rect } from "../types/types";

const Rectangle = ({ ctx, rect, overlap }: { ctx: CanvasRenderingContext2D; rect: Rect; overlap: boolean }) => {
    // Устанавливаем цвет заливки в зависимости от состояния наложения
    ctx.fillStyle = overlap ? "red" : "rgba(28, 156, 234, 0.5)"; 
    // Устанавливаем цвет границы
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2; // Устанавливаем толщину границы (можете изменить по своему усмотрению)

    // Рисуем залитый прямоугольник
    ctx.fillRect(rect.position.x - rect.size.width / 2, rect.position.y - rect.size.height / 2, rect.size.width, rect.size.height);
    
    // Рисуем границу
    ctx.strokeRect(rect.position.x - rect.size.width / 2, rect.position.y - rect.size.height / 2, rect.size.width, rect.size.height);
};

export default Rectangle;
