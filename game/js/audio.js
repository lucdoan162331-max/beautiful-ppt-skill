import { SFX_LINES } from './config.js';

let audioCtx = null;

function getCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

export function playTone(freq, duration = 0.1, type = 'sine', volume = 0.15) {
  try {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = volume;
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (_) { /* silent */ }
}

export function playMatch() {
  playTone(523, 0.08);
  setTimeout(() => playTone(659, 0.08), 60);
  setTimeout(() => playTone(784, 0.12), 120);
}

export function playSwap() {
  playTone(400, 0.05, 'triangle', 0.1);
}

export function playInvalid() {
  playTone(200, 0.15, 'sawtooth', 0.1);
}

export function playPotThrow() {
  playTone(150, 0.1, 'square', 0.2);
  setTimeout(() => playTone(100, 0.2, 'square', 0.15), 80);
}

export function playCaffeine() {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => playTone(300 + i * 80, 0.06, 'sawtooth', 0.12), i * 50);
  }
}

export function playMeetingTap() {
  playTone(600 + Math.random() * 200, 0.04, 'square', 0.08);
}

export function playWin() {
  [523, 659, 784, 1047].forEach((f, i) => {
    setTimeout(() => playTone(f, 0.2, 'sine', 0.12), i * 120);
  });
}

export function randomSfxLine() {
  return SFX_LINES[Math.floor(Math.random() * SFX_LINES.length)];
}

export function showSfxToast(text) {
  const el = document.getElementById('sfx-toast');
  if (!el) return;
  el.textContent = `"${text}"`;
  el.classList.add('show');
  clearTimeout(el._timer);
  el._timer = setTimeout(() => el.classList.remove('show'), 1800);
}

export function resumeAudio() {
  try {
    const ctx = getCtx();
    if (ctx.state === 'suspended') ctx.resume();
  } catch (_) { /* silent */ }
}
