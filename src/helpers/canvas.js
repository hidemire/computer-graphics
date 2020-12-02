/* eslint-disable no-bitwise */
function Point({ x, y }) {
  this.x = x;
  this.y = y;
}

function drawLine(ctx, a, b) {
  ctx.moveTo(a.x, -a.y);
  ctx.lineTo(b.x, -b.y);

  ctx.stroke();
}

function drawLines(ctx, lines) {
  for (let i = 0; i < lines.length; i += 1) {
    const { p1, p0 } = lines[i];
    ctx.moveTo(p1.x, -p1.y);
    ctx.lineTo(p0.x, -p0.y);
  }

  ctx.stroke();
}

export {
  Point,
  drawLine,
  drawLines,
};
