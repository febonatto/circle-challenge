import './styles.css';
import { useEffect, useRef } from 'react';

interface CircleProps {
  posX: number;
  posY: number;
  color: string;
}

export function Circle(props: CircleProps) {
  const { posX, posY, color } = props;

  const circleRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if(circleRef.current) {
      const { current: circle } = circleRef;

      circle.style.left = `${posX - 12}px`;
      circle.style.top = `${posY - 12}px`;
      circle.style.background = color;
      circle.style.animation = 'create 250ms linear forwards';
    }
  }, []);

  return (
    <span ref={circleRef} className="circle" />
  );
}
