//import com.hamoid.*;
// uncomment the video export stuff to record in processing 3 only
float Lw;
float Lh;
float n = 1;
float m =4;
int resolution = 1;
int i =1;
//VideoExport videoExport;
void setup() {
  size(800, 800);
  Lw = width;
  Lh = height;
  //frameRate(60);
 // videoExport = new VideoExport(this);
 // videoExport.startMovie();
}




void draw() {
  //background(255,255,0);



  // Map the volume to n between 1 and 5 (adjust these numbers to suit your needs)

  // change the vol mapping to 0 , 0.5 or 0, 1, to have a less sensitive mic
  //m = map(vol, 0,0.1,1,4)
  // Loop through the grid

  background(0);
  n=n+0.1;
  //m=m+1;
  //println(n);
  for (int x = 0; x <= Lw; x += resolution) {
    for (int y = 0; y <= Lh; y += resolution) {

      // Normalize x and y in the range of the plate side length
      float xn = x / Lw;
      float yn = y / Lh;

      // Calculate the equation for the standing wave zero condition
      float term1 = cos(n * PI * xn) * cos(m * PI * yn);
      float term2 = cos(m * PI * xn) * cos(n * PI * yn);
      float result = term1 - term2;


      //fill(0, 255*abs(result))
      fill(255, 165, 0, 255*abs(result));
      noStroke(); // Set stroke color in HSB mode
      rect(x, y, resolution, resolution); // Plot points at zero crossing
    }
  }


  if (n>20) {
    n=1;
    //noLoop();
  } else {
    //saveFrame("SoundM20-######.png");;
  }
 // videoExport.saveFrame();
}

void keyPressed() {
  if (key == 'q') {
   // videoExport.endMovie();
    exit();
  }
}
