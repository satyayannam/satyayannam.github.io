const asciiFrames = [
`  .     .     .
   \\___/     .
  --O--     /
   /   \\   .`,
`     .     .
    /   \\   .
  --O--     \\
   \\___/     .`,
`    .     / 
   .     --O--
    .    \\___/
          .`,
`     \\___/
  .     --O--
     /   \\   .`,
];

let frameIndex = 0;
const artBox = document.getElementById('ascii-art');

setInterval(() => {
  artBox.textContent = asciiFrames[frameIndex];
  frameIndex = (frameIndex + 1) % asciiFrames.length;
}, 400);
