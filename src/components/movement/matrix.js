import { matrix } from 'mathjs';

const degreesToRads = (deg) => (deg * Math.PI) / 180.0;

const getTranslationMatrix = (a, b) => matrix([
  [1, 0, 0],
  [0, 1, 0],
  [a, b, 1],
]);

const getRotationMatrix = (angle) => {
  const radAngle = degreesToRads(angle);
  return matrix([
    [Math.cos(radAngle), Math.sin(radAngle), 0],
    [-Math.sin(radAngle), Math.cos(radAngle), 0],
    [0, 0, 1],
  ]);
};

export {
  getTranslationMatrix,
  getRotationMatrix,
};
