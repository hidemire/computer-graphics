import {
  Point,
  drawLines,
} from 'helpers/canvas';

let lines = [];

function drawSnowFlake(ctx, p0, p1, limit) {
  // setImmediate(() => {
  const dx = p1.x - p0.x;
  const dy = p1.y - p0.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const unit = dist / 3;
  const angle = Math.atan2(dy, dx); // угол поворота линии
  const pA = new Point({ // координаты треугольника
    x: p0.x + dx / 3,
    y: p0.y + dy / 3,
  });
  const pB = new Point({ // вершина треугольника
    x: pA.x + Math.cos(angle - Math.PI / 3) * unit,
    y: pA.y + Math.sin(angle - Math.PI / 3) * unit,
  });
  const pC = new Point({
    x: p1.x - dx / 3,
    y: p1.y - dy / 3,
  });

  if (limit > 1) {
    drawSnowFlake(ctx, p0, pA, limit - 1);
    drawSnowFlake(ctx, pA, pB, limit - 1);
    drawSnowFlake(ctx, pB, pC, limit - 1);
    drawSnowFlake(ctx, pC, p1, limit - 1);
  } else {
    // tasks.push(() => setTimeout(() => drawLine(ctx, p0, p1), 0));
    lines.push({ p0, p1 });
    // drawQueue.add(() => lines.push({ p0, p1 }));
  }
  // });
}

function snowflakeDrawer(ctx, { iterations }) {
  lines = [];

  ctx.beginPath();
  drawSnowFlake(ctx, new Point({ x: -180, y: 200 }), new Point({ x: 0, y: -180 }), iterations);
  drawSnowFlake(ctx, new Point({ x: 0, y: -180 }), new Point({ x: 200, y: 200 }), iterations);
  drawSnowFlake(ctx, new Point({ x: 200, y: 200 }), new Point({ x: -180, y: 200 }), iterations);

  drawLines(ctx, lines);

  ctx.closePath();
}

export default snowflakeDrawer;
