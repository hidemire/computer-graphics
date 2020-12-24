const degreesToRads = (deg) => (deg * Math.PI) / 180.0;

function getPoint(x1, y1, dx, dy, angle) {
  const alpha = degreesToRads(angle);

  const xp = Number(x1) + Math.cos(alpha) * dx + Math.sin(alpha) * dy;
  const yp = Number(y1) + Math.sin(-alpha) * dx + Math.cos(alpha) * dy;

  return { x: Math.round(xp), y: Math.round(yp) };
}

function getThirdPoint({ x: x1, y: y1 }, { x: x2, y: y2 }) {
  const dx = Number(x2) - Number(x1);
  const dy = Number(y2) - Number(y1);

  return [
    getPoint(x1, y1, dx, dy, 60),
    getPoint(x1, y1, dx, dy, -60),
  ];
}

function getCenter(points) {
  const [P1, P2, P3] = points;

  return { x: (+P1.x + +P2.x + +P3.x) / 3, y: (+P1.y + +P2.y + +P3.y) / 3 };
}

export {
  getThirdPoint,
  getCenter,
};
