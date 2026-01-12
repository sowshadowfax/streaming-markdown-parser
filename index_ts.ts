// src/index.ts
// Demo script that simulates streaming markdown text

import { MarkdownParser } from './MarkdownParser';

// Sample markdown text to stream
const sampleMarkdown = `Here is some normal text with an inline code block: \`console.log("hello")\` and more text.

This is a code block:
\`\`\`javascript
function greet(name) {
  return "Hello, " + name;
}
\`\`\`

More text here. Another inline code: \`x = 42\` followed by regular text.

Here's another code block:
\`\`\`python
def calculate(x, y):
    return x + y
\`\`\`

Testing edge cases: \`incomplete code and \`complete code\` in same line.

Final code block:
\`\`\`
No language specified
Just plain code
\`\`\`

The end!`;

// Initialize
const outputDiv = document.getElementById('output') as HTMLElement;
const parser = new MarkdownParser(outputDiv);

let streamInterval: ReturnType<typeof setInterval> | null = null;
let currentIndex = 0;
let streamSpeed = 50;

// Controls
const startBtn = document.getElementById('startBtn') as HTMLButtonElement;
const resetBtn = document.getElementById('resetBtn') as HTMLButtonElement;
const speedSlider = document.getElementById('speedSlider') as HTMLInputElement;
const speedValue = document.getElementById('speedValue') as HTMLSpanElement;

startBtn.addEventListener('click', () => {
  if (streamInterval) {
    stopStream();
    startBtn.textContent = 'Start Stream';
  } else {
    startStream();
    startBtn.textContent = 'Pause Stream';
  }
});

resetBtn.addEventListener('click', () => {
  stopStream();
  parser.reset();
  currentIndex = 0;
  startBtn.textContent = 'Start Stream';
});

speedSlider.addEventListener('input', (e) => {
  streamSpeed = parseInt((e.target as HTMLInputElement).value);
  speedValue.textContent = streamSpeed + 'ms';
  
  // Restart stream with new speed if currently streaming
  if (streamInterval) {
    stopStream();
    startStream();
  }
});

function startStream(): void {
  streamInterval = setInterval(() => {
    if (currentIndex < sampleMarkdown.length) {
      // Stream in chunks of 1-3 characters to simulate real streaming
      const chunkSize = Math.floor(Math.random() * 3) + 1;
      const chunk = sampleMarkdown.slice(currentIndex, currentIndex + chunkSize);
      parser.processChunk(chunk);
      currentIndex += chunkSize;
    } else {
      stopStream();
      startBtn.textContent = 'Start Stream';
    }
  }, streamSpeed);
}

function stopStream(): void {
  if (streamInterval) {
    clearInterval(streamInterval);
    streamInterval = null;
  }
}

// Auto-start on load
setTimeout(() => {
  startStream();
  startBtn.textContent = 'Pause Stream';
}, 500);