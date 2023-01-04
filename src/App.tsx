import { useEffect, useRef, useState } from 'react';

import { Circle } from './components/Circle';

interface CircleProps {
  posX: number;
  posY: number;
  color: string;
}

export function App() {
  const [circles, setCircles] = useState<CircleProps[]>([]);
  const [removedCircles, setRemovedCircles] = useState<CircleProps[]>([]);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if(containerRef.current) {
      const { current: container } = containerRef;

      container.addEventListener('click', onClick);
    }

    return () => {
      if(containerRef.current) {
        const { current: container } = containerRef;

        container.removeEventListener('click', onClick);
      }
    };
  });

  function onClick(event: MouseEvent) {
    const newCircle = {
      posX: event.clientX,
      posY: event.clientY,
      color: randomColor(),
    };
    setCircles([
      ...circles,
      newCircle
    ]);
  }

  function undo() {
    if(circles.length === 0) {
      return;
    }
    const undoCircle = circles.pop() as CircleProps;
    setRemovedCircles([
      ...removedCircles,
      undoCircle,
    ]);
    setCircles(circles);
  }

  function redo() {
    if(removedCircles.length === 0) {
      return;
    }
    const redoCircle = removedCircles.pop() as CircleProps;
    setCircles([
      ...circles,
      redoCircle,
    ]);
    setRemovedCircles(removedCircles);
  }

  function randomColor(): string {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  return (
    <>
      <div ref={containerRef} className="container">
        {
          circles &&
          circles.length > 0 &&
          circles.map((circle, index) => (
            <Circle
              key={index}
              posX={circle.posX}
              posY={circle.posY}
              color={circle.color}
            />
          ))
        }
      </div>
      <div className="actions">
        <button type="button" onClick={() => undo()}>⏪</button>
        <button type="button" onClick={() => redo()}>⏩</button>
      </div>
    </>
  );
}
