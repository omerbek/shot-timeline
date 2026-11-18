'use strict';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const mint = '#9ef4dc';
const amber = '#ffcb7d';
const ink = '#152129';
const duration = 8;

function rect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function label(value, x, y, size = 24, color = mint) {
  ctx.fillStyle = color;
  ctx.font = `600 ${size}px system-ui`;
  ctx.fillText(value, x, y);
}

function dot(x, y, radius, color = mint) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}


function render(t) {
  const cuts = [0, 2, 5, 8];
  const plan = cuts.findIndex((cut, i) => i > 0 && t < cut) - 1;
  const active = plan < 0 ? 2 : plan;
  ['İstasyon', 'Akış', 'Ölçüm'].forEach((name, i) => {
    const x = 48 + 211 * i;
    rect(x, 145, 198, 110, i === active ? '#26564f' : '#22313a');
    label(name, x + 14, 204);
    label(`Kare ${cuts[i] * 30}`, x, 285, 17);
  });
  rect(48, 312, 620, 3, '#40535a');
  dot(48 + t / 8 * 620, 314, 7, amber);
}

const seek = document.querySelector('#seek');
const play = document.querySelector('#play');
const time = document.querySelector('#time');
let position = 0;
let playing = false;
let previous = null;
let animationId = null;

function draw() {
  rect(0, 0, canvas.width, canvas.height, ink);
  render(position);
  seek.value = position;
  time.value = `${position.toFixed(2)} sn`;
}

function frame(timestamp) {
  if (!playing) return;
  if (previous !== null) position = (position + (timestamp - previous) / 1000) % duration;
  previous = timestamp;
  draw();
  animationId = requestAnimationFrame(frame);
}

play.addEventListener('click', () => {
  playing = !playing;
  play.textContent = playing ? 'Duraklat' : 'Oynat';
  if (playing) {
    previous = null;
    animationId = requestAnimationFrame(frame);
  } else {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
});

seek.addEventListener('input', () => {
  position = Number(seek.value);
  draw();
});

draw();
