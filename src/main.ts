import * as fflate from "fflate";

// function randomColorGen(){
//     const r = Math.floor(Math.random()*256);
//     const g = Math.floor(Math.random()*256);
//     const b = Math.floor(Math.random()*256);

//     return `rgb(${r}, ${g}, ${b})`
// }
function drawFractalTree(
  x: number,
  y: number,
  length: number,
  depth: number,
  initialAngle: number,
  branchAngle: number,
  svg: SVGSVGElement,
  strokeWidth: number,
) {
  //base case check
  if (depth === 0) {
    return;
  }

  // const angle = -Math.PI/2;
  const x2 = x + length * Math.cos(initialAngle);
  const y2 = y + length * Math.sin(initialAngle);
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", String(x));
  line.setAttribute("y1", String(y));
  line.setAttribute("x2", String(x2));
  line.setAttribute("y2", String(y2));
  // line.setAttribute("stroke", depth > 5 ? "brown" : "green");
  line.setAttribute("stroke", "rgb(255, 255, 255)");
  line.setAttribute("stroke-width", String(strokeWidth));
  svg.appendChild(line);

  const childStrokeWidth = strokeWidth * 0.8;
  //recursively draw lines
  drawFractalTree(
    x2,
    y2,
    length * 0.7,
    depth - 1,
    initialAngle - branchAngle,
    branchAngle,
    svg,
    childStrokeWidth,
  );
  drawFractalTree(
    x2,
    y2,
    length * 0.7,
    depth - 1,
    initialAngle + branchAngle,
    branchAngle,
    svg,
    childStrokeWidth,
  );
}

function drawSVG() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", String(globalThis.innerWidth));
  svg.setAttribute("height", String(globalThis.innerHeight));
  svg.setAttribute("style", "background-color: black");
  //branch_angle = Math.PI/(Math.random() * (3 - 1 ) + 1);
  const lace = Math.PI / 6;
  const branch_angle = lace;
  drawFractalTree(
    globalThis.innerWidth / 2,
    globalThis.innerHeight,
    200,
    14,
    -Math.PI / 2,
    branch_angle,
    svg,
    8,
  );
  document.body.appendChild(svg);
}
drawSVG();

const buf = fflate.strToU8("Hello world");

// The default compression method is gzip
// Increasing mem may increase performance at the cost of memory
// The mem ranges from 0 to 12, where 4 is the default
const compressed = fflate.compressSync(buf, { level: 6, mem: 8 });
console.log(compressed);
