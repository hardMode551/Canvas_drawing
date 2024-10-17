import React, { useEffect, useRef, useState } from "react";
import { ConnectionPoint, Point, Rect } from "../types/types";
import { dataConverter } from "../utils/dataConverter";
import { checkRectanglesOverlap, drawPath } from "../utils/canvasUtils";
import Rectangle from "./Rectangle";
import RectangleControls from "./RectangleControls";
import styles from "../styles/canvas.module.scss";

const CanvasComponent: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [rect1, setRect1] = useState<Rect>({
    position: { x: 100, y: 100 },
    size: { width: 50, height: 80 },
  });
  const [rect2, setRect2] = useState<Rect>({
    position: { x: 300, y: 200 },
    size: { width: 60, height: 90 },
  });

  const [prevRect1X, setPrevRect1X] = useState(rect1.position.x);
  const [prevRect1Y, setPrevRect1Y] = useState(rect1.position.y);
  const [prevRect2X, setPrevRect2X] = useState(rect2.position.x);
  const [prevRect2Y, setPrevRect2Y] = useState(rect2.position.y);

  const [blockRect1XIncrease] = useState(false);
  const [blockRect1XDecrease] = useState(false);

  const [blockRect2XIncrease] = useState(false);
  const [blockRect2XDecrease] = useState(false);

  const [inputRect1X, setInputRect1X] = useState(rect1.position.x);
  const [inputRect1Y, setInputRect1Y] = useState(rect1.position.y);
  const [inputRect2X, setInputRect2X] = useState(rect2.position.x);
  const [inputRect2Y, setInputRect2Y] = useState(rect2.position.y);

  const [cPoint1] = useState<ConnectionPoint>({
    point: { x: 100, y: 140 },
    angle: 90,
  });
  const [cPoint2] = useState<ConnectionPoint>({
    point: { x: 330, y: 200 },
    angle: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const overlap = checkRectanglesOverlap(rect1, rect2);
        Rectangle({ ctx, rect: rect1, overlap });
        Rectangle({ ctx, rect: rect2, overlap });

        try {
          if (!overlap) {
            const points = dataConverter(rect1, rect2, cPoint1, cPoint2);
            drawPath(ctx, points);
          }
        } catch (err: unknown) {
          if (err instanceof Error) {
            alert(err.message);
      
            // Восстановление предыдущих значений
            setRect1((prev) => ({ ...prev, position: { x: prevRect1X, y: prevRect1Y } }));
            setRect2((prev) => ({ ...prev, position: { x: prevRect2X, y: prevRect2Y } }));
            setInputRect1X(prevRect1X);
            setInputRect1Y(prevRect1Y);
            setInputRect2X(prevRect2X);
            setInputRect2Y(prevRect2Y);
          } else {
            alert("Произошла неизвестная ошибка.");
          }
        }
      }
    }
  }, [rect1, rect2, cPoint1, cPoint2]);

  const handleRectChange = (
    rectId: "rect1" | "rect2",
    key: keyof Point,
    value: number
  ) => {
    if (rectId === "rect1") {
      setPrevRect1X(rect1.position.x);
      setPrevRect1Y(rect1.position.y);
      setRect1((prev) => ({
        ...prev,
        position: { ...prev.position, [key]: value },
      }));
    } else {
      setPrevRect2X(rect2.position.x);
      setPrevRect2Y(rect2.position.y);
      setRect2((prev) => ({
        ...prev,
        position: { ...prev.position, [key]: value },
      }));
    }
  };

  return (
    <div className={styles.canvasContainer}>
      <canvas
        ref={canvasRef}
        width={500}
        height={400}
        className={styles.canvas}
      />
      <div className={styles.controlsContainer}>
      <RectangleControls
        rect={rect1}
        blockIncrease={blockRect1XIncrease}
        blockDecrease={blockRect1XDecrease}
        otherRect={rect2}
        inputX={inputRect1X}
        inputY={inputRect1Y}
        setInputX={setInputRect1X}
        setInputY={setInputRect1Y}
        handleRectChange={(key, value) => handleRectChange("rect1", key, value)} // Specify rect1
      />
      <RectangleControls
        rect={rect2}
        blockIncrease={blockRect2XIncrease}
        blockDecrease={blockRect2XDecrease}
        otherRect={rect1}
        inputX={inputRect2X}
        inputY={inputRect2Y}
        setInputX={setInputRect2X}
        setInputY={setInputRect2Y}
        handleRectChange={(key, value) => handleRectChange("rect2", key, value)} // Specify rect2
      />
      </div>
    </div>
  );
};

export default CanvasComponent;
