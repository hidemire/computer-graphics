import {
  Point,
  drawLines,
} from 'helpers/canvas';

const ang90 = Math.PI / 2; // 90
const ang45 = Math.PI / 4; // 45
const ang30 = Math.PI / 6; // 30

let lines = [];

function drawTree(ctx, x, y, iterations, size, angle) {
  if (iterations > 0) {
    const nIteration = iterations - 1;
    const nSize = size * 0.7;
    const nx = Math.round(x + size * Math.cos(angle));
    const ny = Math.round(y + size * Math.sin(angle));

    lines.push({ p1: new Point({ x, y }), p0: new Point({ x: nx, y: ny }) });

    drawTree(ctx, nx, ny, nIteration, nSize, angle + ang45);
    drawTree(ctx, nx, ny, nIteration, nSize, angle - ang30);
  }
}

function treeDrawer(ctx, { iterations }) {
  lines = [];

  ctx.beginPath();
  // ctx.arc(0, 0, iterations, 0, 2 * Math.PI);
  // ctx.fill();

  drawTree(ctx, 0, -200, iterations, 200, ang90);

  drawLines(ctx, lines);

  ctx.closePath();
}

export default treeDrawer;
