var a, b, g, xDir, yDir, zDir;
if (window.DeviceOrientationEvent) {
    console.log("DeviceOrientationEvent supports.");
    window.addEventListener("deviceorientation", function(event) {
        a = event.alpha;
        b = event.beta;
        g = event.gamma;
    });
} else {
    window.alert("DeviceOrientationEvent not supported!!!");
}

if (window.DeviceMotionEvent) {
    console.log("DeviceMotionEvent supported");
    window.addEventListener("devicemotion", function(event) {
        xDir = event.acceleration.x;
        yDir = event.acceleration.y;
        zDir = event.acceleration.z;
    });
} else {
    window.alert("DeviceMotionEvent doesn't supported!!!")
}

if (true) {
    
} else {
    
}

function setup() {
    // body...
    createCanvas(window.innerWidth, window.innerHeight, WEBGL);
}

function draw() {
    background(205, 100);
    var yaw = -a * .02;
    var pitch = -b * .02;
    var roll = g * .02;
    translate(-xDir, -yDir, -zDir);
    push();
    rotateX(pitch);
    rotateY(roll);
    rotateZ(yaw);
    fill(100, 210);
    box(120, 60, 5);
    pop();
}

function rotation() {
    var x = rotationX * .02;
    rotateX(-x);
    var y = rotationY * .02;
    rotateY(y);
    var z = rotationZ * .02;
    rotateZ(-z);
}