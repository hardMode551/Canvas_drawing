import React from "react";
import { Point, Rect } from "../types/types";
import styles from '../styles/canvas.module.scss';

interface RectangleControlsProps {
  rect: Rect;
  blockIncrease: boolean;
  blockDecrease: boolean;
  otherRect: Rect;
  inputX: number;
  inputY: number;
  setInputX: React.Dispatch<React.SetStateAction<number>>;
  setInputY: React.Dispatch<React.SetStateAction<number>>;
  handleRectChange: (key: keyof Point, value: number) => void;
}

const RectangleControls: React.FC<RectangleControlsProps> = ({
  rect,
  blockIncrease,
  blockDecrease,
  inputX,
  inputY,
  setInputX,
  setInputY,
  handleRectChange,
}) => {
  return (
    <div className={styles.inputGroup}>
      <label className={styles.label}>
        Прямоугольник ({rect.position.x}, {rect.position.y}):
        <input
          type="number"
          value={inputX}
          onChange={(e) => {
            const value = +e.target.value;
            setInputX(value);
            handleRectChange("x", value);
          }}
          className={styles.input}
          disabled={(blockIncrease && inputX > rect.position.x) || (blockDecrease && inputX < rect.position.x)}
        />
        <input
          type="number"
          value={inputY}
          onChange={(e) => {
            const value = +e.target.value;
            setInputY(value);
            handleRectChange("y", value);
          }}
          className={styles.input}
          disabled={(blockIncrease && inputY > rect.position.y) || (blockDecrease && inputY < rect.position.y)}
        />
      </label>
    </div>
  );
};

export default RectangleControls;
