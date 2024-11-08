let L = 600; // Side length of the square Chladni plate
let resolution = 2; // Step size for grid (smaller values give higher detail)
let n = 1; // This will now be controlled by microphone volume
let m = 2; // Integer m
let mic; // Microphone input
let micbutt
let cnv

function setup() {

  cnv = createCanvas(L, L);
  let cx = (windowWidth-cnv.width)/2
  let cy = (windowHeight-cnv.height)/2
  cnv.position(cx,cy)
  pixelDensity(1);
  
  // Set up microphone input
  mic = new p5.AudioIn();
  mic.start(); // Start capturing audio
  micbutt = createButton("startAudio")
  micbutt.position(cx,cy+height+10)


  
  frameRate(15); // Slower frame rate for smoother updates
}

function draw() {
  background(0);
  
  // Get the current volume level from the microphone
  let vol = mic.getLevel();
  
  // Map the volume to n between 1 and 5 (adjust these numbers to suit your needs)
  n = map(vol, 0, 0.1, 1, 8); // Adjust max volume threshold as needed
  
  // Loop through the grid
  for (let x = 0; x <= L; x += resolution) {
    for (let y = 0; y <= L; y += resolution) {
      
      // Normalize x and y in the range of the plate side length
      let xn = x / L;
      let yn = y / L;
      
      // Calculate the equation for the standing wave zero condition
      let term1 = cos(n * PI * xn) * cos(m * PI * yn);
      let term2 = cos(m * PI * xn) * cos(n * PI * yn);
      let result = term1 - term2;
      
      // If the result is close to zero, plot the point
      if (abs(result) < 0.09) {
        strokeWeight(2);
        
        // Color based on how close to zero the result is
       // let colorValue = map(abs(result), 0, 0.01, 0, 255); // For HSB color
        stroke(255,255,0); // Set stroke color in HSB mode
        point(x, y); // Plot points at zero crossing
      }
    }
  }
}

function keyPressed() {
  // Change m with keys
  if (key === 'M') {
    m = (m % 5) + 1; // Cycle m between 1 and 5
  }
  redraw(); // Redraw the plot after changing m
}
