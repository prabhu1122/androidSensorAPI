var a, b, g, xDir, yDir, zDir;
var Barcode_list_suppprted = [];
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

// battery manager
navigator.getBattery().then(function(battery) {
  function updateAllBatteryInfo(){
    updateChargeInfo();
    updateLevelInfo();
    updateChargingInfo();
    updateDischargingInfo();
  }
  updateAllBatteryInfo();

  battery.addEventListener('chargingchange', function(){
    updateChargeInfo();
  });
  function updateChargeInfo(){
    console.log("Battery charging? "
                + (battery.charging ? "Yes" : "No"));
  }

  battery.addEventListener('levelchange', function(){
    updateLevelInfo();
  });
  function updateLevelInfo(){
    console.log("Battery level: "
                + battery.level * 100 + "%");
  }

  battery.addEventListener('chargingtimechange', function(){
    updateChargingInfo();
  });
  function updateChargingInfo(){
    console.log("Battery charging time: "
                 + battery.chargingTime + " seconds");
  }

  battery.addEventListener('dischargingtimechange', function(){
    updateDischargingInfo();
  });
  function updateDischargingInfo(){
    console.log("Battery discharging time: "
                 + battery.dischargingTime + " seconds");
  }

});

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