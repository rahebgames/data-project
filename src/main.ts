import * as fflate from "fflate";

const buf = fflate.strToU8(
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce laoreet felis at magna aliquet ullamcorper. Vivamus mauris odio, tempus a luctus eget, consequat malesuada nulla. Praesent vestibulum sed leo ut imperdiet. Fusce interdum ipsum id ipsum semper, vitae lacinia elit aliquam. Cras cursus odio et dignissim ornare. Phasellus est felis, laoreet sed mi non, pretium pellentesque orci. Duis id tellus non purus posuere vulputate at vitae mi. Suspendisse finibus lectus sem, ac luctus metus facilisis in. Praesent eget diam a nulla tincidunt volutpat. Integer finibus consequat purus, maximus eleifend lorem bibendum quis. Integer volutpat dictum sem sed tempus. Pellentesque vitae lectus in turpis vulputate congue. Vivamus dignissim diam mi, a tristique quam mattis vitae. Pellentesque non cursus nisl. Aenean et gravida nibh. Morbi interdum est at erat condimentum faucibus. Curabitur sit amet turpis libero. Sed varius luctus rutrum. Vivamus laoreet volutpat lectus, non eleifend metus ultrices non. Proin lobortis bibendum dolor et malesuada. Quisque at quam lectus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec odio elit, lobortis vitae magna ut, dapibus rutrum diam. Vestibulum dolor nulla, vulputate non volutpat vel, lobortis sit amet ligula. Sed eget purus auctor, aliquam nunc id, iaculis erat. Fusce in auctor urna. Etiam quis sapien molestie, cursus ex id, hendrerit eros. Morbi maximus sem id fringilla iaculis. Vestibulum fringilla arcu vitae ipsum hendrerit, sed mattis nisl vulputate. In ornare nisl vitae nulla condimentum, at fringilla sapien molestie. Donec gravida vitae massa non mattis. Integer tincidunt massa in dapibus mattis. Pellentesque porttitor purus lacus, eget molestie nunc mollis eu. In fringilla ex orci, sit amet dignissim risus sagittis sit amet. Maecenas faucibus lectus a pharetra egestas. Nunc tincidunt vel libero a tristique. Curabitur eu semper augue, ac mattis est. Curabitur a aliquam elit. In sagittis tempus ligula, eget interdum sem fermentum auctor. Maecenas blandit nisi neque, sit amet pharetra ligula feugiat eget. Suspendisse potenti. Phasellus dictum augue sit amet erat sagittis, pellentesque egestas tortor facilisis. Morbi cursus metus et ligula molestie, ut lobortis est lobortis. Ut metus erat, aliquet a leo eu, sodales luctus turpis. Nunc commodo, nisi vel dignissim eleifend, libero nunc sollicitudin felis, ut ultricies magna quam sit amet mauris. Vestibulum condimentum egestas sem, vitae tincidunt velit scelerisque in. Vestibulum at sem tortor. Integer ac tortor lectus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus venenatis turpis libero, et porta leo malesuada id. Nam nisl arcu, fermentum at tempus ut, condimentum quis nisi. Donec eu mauris eu nisl varius scelerisque. Nulla ut magna vel tellus convallis facilisis nec id dolor. Aliquam pellentesque odio ac gravida mollis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec quis elit vehicula, facilisis orci id, vestibulum velit. Proin sed iaculis metus. Pellentesque id nisi tristique, fermentum tortor sed, rutrum odio. Nam tincidunt euismod diam vel ornare. Quisque convallis metus molestie, ultrices nisi id, iaculis magna. Phasellus tempus in nulla nec vulputate. Phasellus semper, quam sit amet varius pretium, libero enim elementum turpis, eget.",
);
const compressed = fflate.compressSync(buf, { level: 6, mem: 8 });
console.log(compressed);

const branches_left = { num: compressed.length };
const byte_index = { i: 0 };

function drawFractalTree(
  x: number,
  y: number,
  length: number,
  depth: number,
  baseAngle: number,
  branchSpread: number,
  svg: SVGSVGElement,
  strokeWidth: number,
  b_left: { num: number },
  bytes: Uint8Array,
  index: { i: number },
) {
  if (depth === 0 || b_left.num <= 0) return;

  // compute endpoint
  const x2 = x + length * Math.cos(baseAngle);
  const y2 = y + length * Math.sin(baseAngle);

  // draw the branch
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", String(x));
  line.setAttribute("y1", String(y));
  line.setAttribute("x2", String(x2));
  line.setAttribute("y2", String(y2));
  line.setAttribute("stroke", "rgb(255,255,255)");
  line.setAttribute("stroke-width", String(strokeWidth));
  svg.appendChild(line);

  b_left.num -= 1;

  // Use next byte to influence angle variation
  // Wrap around if we exceed compressed length
  const byte = bytes[index.i % bytes.length];
  index.i++;

  // Map byte (0–255) to -branchSpread/2 .. +branchSpread/2 variation
  const variation = ((byte / 255) - 0.5) * branchSpread;

  const leftAngle = baseAngle - branchSpread / 2 + variation;
  const rightAngle = baseAngle + branchSpread / 2 - variation;

  const childLength = length * 0.7;
  const childStroke = strokeWidth * 0.8;

  drawFractalTree(
    x2,
    y2,
    childLength,
    depth - 1,
    leftAngle,
    branchSpread,
    svg,
    childStroke,
    b_left,
    bytes,
    index,
  );

  drawFractalTree(
    x2,
    y2,
    childLength,
    depth - 1,
    rightAngle,
    branchSpread,
    svg,
    childStroke,
    b_left,
    bytes,
    index,
  );
}

function getNeededBranches(size: number) {
  let sigma = 0;
  let i = 0;
  while (sigma - 1 < size) {
    sigma += 2 ** i;
    i++;
  }
  return i;
}

function createUI() {
  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.top = "10px";
  container.style.left = "50%";
  container.style.transform = "translateX(-50%)";
  container.style.display = "flex";
  container.style.gap = "8px";
  container.style.zIndex = "100";
  container.style.background = "rgba(0, 0, 0, 0.5)";
  container.style.padding = "10px 16px";
  container.style.borderRadius = "12px";

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Enter a word...";
  input.style.width = "240px";
  input.style.padding = "6px 10px";
  input.style.borderRadius = "8px";
  input.style.border = "1px solid #888";
  input.style.background = "#111";
  input.style.color = "#fff";

  container.appendChild(input);
  document.body.appendChild(container);

  return input;
}

function drawSVG(text: string) {
  document.querySelectorAll("svg").forEach((el) => el.remove());

  const buf = fflate.strToU8(text);
  const compressed = fflate.compressSync(buf, { level: 6, mem: 8 });
  const branches_left = { num: compressed.length };
  const byte_index = { i: 0 };

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", String(globalThis.innerWidth));
  svg.setAttribute("height", String(globalThis.innerHeight));
  svg.setAttribute("style", "background-color:black");

  const baseSpread = Math.PI / 2.5; // max spread angle between left/right
  const depth = getNeededBranches(compressed.length);

  drawFractalTree(
    globalThis.innerWidth / 2, // start X
    globalThis.innerHeight, // start Y
    300, // trunk length
    depth, // depth based on data size
    -Math.PI / 2, // start pointing up
    baseSpread, // maximum branch angle spread
    svg,
    8, // base thickness
    branches_left,
    compressed,
    byte_index,
  );

  document.body.appendChild(svg);
}

function main() {
  const input = createUI();
  drawSVG("Hello world");

  const update = () => {
    const text = input.value.trim() || "Hello world";
    drawSVG(text);
  };

  // Generate on button click or Enter key
  //button.addEventListener("click", update);
  input.addEventListener("input", update);
}

main();
