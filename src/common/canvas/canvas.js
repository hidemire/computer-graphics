import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';

import Emitter from 'core/events';
import { EVENTS } from 'core/constants';

const moveStep = 10;
const zoomStep = 0.7;

function Canvas(props) {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    radius: 1,
  });
  const parentRef = useRef(null);
  const canvasRef = useRef(null);
  const { draw, name } = props;

  const onOpenImageCallback = useCallback(async () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    const currentData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const compositeOperation = ctx.globalCompositeOperation;

    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // const blob = await new Promise((resolve) => canvas.toBlob(resolve));
    // const url = URL.createObjectURL(blob);
    // window.open(url, '_blank');

    const link = document.createElement('a');
    const image = canvas.toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    link.download = `${name}.png`;
    link.href = image;
    link.click();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.putImageData(currentData, 0, 0);
    ctx.globalCompositeOperation = compositeOperation;
    ctx.restore();
  }, []);

  useEffect(() => {
    const event = `${name}:${EVENTS.OPEN_CANVAS_IMAGE}`;
    Emitter.on(event, onOpenImageCallback);
    return () => Emitter.off(event, onOpenImageCallback);
  });

  const d = useCallback(async () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.restore();
    context.fillStyle = 'white';

    await draw({
      context,
      position,
    });
  }, [draw]);

  useEffect(d, [draw, d]);

  const resized = () => {
    const canvas = canvasRef.current;
    const ratio = (window.devicePixelRatio || 1) / position.radius;

    canvas.width = parentRef.current.clientWidth * ratio * position.radius;
    canvas.height = parentRef.current.clientHeight * ratio * position.radius;

    canvas.style.width = `${parentRef.current.clientWidth}px`;
    canvas.style.height = `${parentRef.current.clientHeight}px`;

    const ctx = canvas.getContext('2d');
    ctx.scale(ratio, ratio);
    ctx.lineWidth = 1 * position.radius;

    const w = Math.floor(((parentRef.current.clientWidth + position.x) / 2));
    const h = Math.floor(((parentRef.current.clientHeight + position.y) / 2));

    ctx.translate(w, h);

    d();
  };

  const onKeyHandler = (e) => {
    if (e.keyCode === 38 || e.keyCode === 87 /* UP | w */) {
      setPosition((p) => ({ ...p, y: position.y - moveStep * position.radius * 2 }));
    } else if (e.keyCode === 40 || e.keyCode === 83 /* DOWN | s  */) {
      setPosition((p) => ({ ...p, y: position.y + moveStep * position.radius * 2 }));
    } else if (e.keyCode === 37 || e.keyCode === 65 /* LEFT | a  */) {
      setPosition((p) => ({ ...p, x: position.x - moveStep * position.radius * 2 }));
    } else if (e.keyCode === 39 || e.keyCode === 68 /* RIGHT | d  */) {
      setPosition((p) => ({ ...p, x: position.x + moveStep * position.radius * 2 }));
    } else if (e.keyCode === 189 || e.keyCode === 173 || e.keyCode === 109 /* - | _  */) {
      setPosition((p) => ({ ...p, radius: position.radius / zoomStep }));
    } else if (e.keyCode === 187 || e.keyCode === 61 || e.keyCode === 107 /* = | +  */) {
      setPosition((p) => ({ ...p, radius: position.radius * zoomStep }));
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    window.addEventListener('resize', resized);
    canvas.addEventListener('keydown', onKeyHandler);
    return () => {
      window.removeEventListener('resize', resized);
      canvas.removeEventListener('keydown', onKeyHandler);
    };
  });

  useEffect(() => {
    resized();
  }, [position]);

  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <div
      ref={parentRef}
      style={{
        height: '100%', maxHeight: '100%', maxWidth: '100%', width: '100%',
      }}
    >
      <canvas tabIndex="0" ref={canvasRef} style={{ height: '100%', width: '100%' }} />
    </div>
  );
}

export default Canvas;
