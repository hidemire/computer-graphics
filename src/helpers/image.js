/* eslint-disable no-param-reassign */
function rgb2cmyk({ r, g, b }) {
  let c = 1 - (r / 255);
  let m = 1 - (g / 255);
  let y = 1 - (b / 255);
  let k = Math.min(c, Math.min(m, y));

  c = (c - k) / (1 - k);
  m = (m - k) / (1 - k);
  y = (y - k) / (1 - k);

  c = Number.isNaN(c) ? 0 : c;
  m = Number.isNaN(m) ? 0 : m;
  y = Number.isNaN(y) ? 0 : y;
  k = Number.isNaN(k) ? 0 : k;

  return {
    c,
    m,
    y,
    k,
  };
}

function rgb2hsl({ r, g, b }) {
  const R = r / 255;
  const G = g / 255;
  const B = b / 255;

  const max = Math.max(R, G, B);
  const min = Math.min(R, G, B);
  const delta = max - min;

  const l = (max + min) / 2;
  let h = l;
  let s = l;

  if (!delta) {
    h = 0;
    s = 0;
  } else {
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

    // eslint-disable-next-line default-case
    switch (max) {
      case R: h = 60 * ((G - B) / delta) + (G < B ? 360 : 0); break;
      case G: h = 60 * ((B - R) / delta) + 120; break;
      case B: h = 60 * ((R - G) / delta) + 240; break;
    }
  }

  return { h, s, l };
}

function hue2rgb(p, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

function hsl2Rgb({ h, s, l }) {
  let r;
  let g;
  let b;

  const hk = h / 360;

  if (s === 0) {
    r = l;
    g = l;
    b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, hk + 1 / 3);
    g = hue2rgb(p, q, hk);
    b = hue2rgb(p, q, hk - 1 / 3);
  }

  return { r: r * 255, g: g * 255, b: b * 255 };
}

function readFileAsync(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
}

function pixelData2RGBA(data, i) {
  return {
    r: data[i],
    g: data[i + 1],
    b: data[i + 2],
    a: data[i + 3],
  };
}

function setRbgData(data, i, { r, g, b }) {
  data[i] = r;
  data[i + 1] = g;
  data[i + 2] = b;
}

function calculatePosition({ canvas, selectedImage }) {
  const wrh = selectedImage.width / selectedImage.height;
  let newWidth = canvas.width;
  let newHeight = newWidth / wrh;
  if (newHeight > canvas.height) {
    newHeight = canvas.height;
    newWidth = newHeight * wrh;
  }
  const xOffset = newWidth < canvas.width ? ((canvas.width - newWidth) / 2) : 0;
  const yOffset = newHeight < canvas.height ? ((canvas.height - newHeight) / 2) : 0;

  return {
    xOffset,
    yOffset,
    newWidth,
    newHeight,
  };
}

export {
  rgb2cmyk,
  rgb2hsl,
  hsl2Rgb,
  setRbgData,
  readFileAsync,
  pixelData2RGBA,
  calculatePosition,
};
