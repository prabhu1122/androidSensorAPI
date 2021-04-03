var a, b, g, xDir, yDir, zDir, milis, maxX, sec;
var vInt = 0;
var vFin = 0;
var Barcode_list_suppprted = [];
var accMax = [];
var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

d = new Date();
date = d.getDate();
din = weekday[d.getDay()];
mon = d.getMonth();
m = d.getMinutes();
hr = d.getHours();
sec = d.getSeconds();

function autoReload() {
    // body..
    document.getElementById("date").innerHTML = din + ", " + date + "/" + (mon + 1) + "/2021";
    document.getElementById("time").innerHTML = hr + ":" + m + ":" + sec;
}
window.setInterval(function() {
    autoReload();
}, 1000);

if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", function(event) {
        a = event.alpha.toFixed(1);
        b = event.beta.toFixed(1);
        g = event.gamma.toFixed(1);
        document.getElementById("xDeg").innerHTML = "degX: " + b;
        document.getElementById("yDeg").innerHTML = "degY: " + g;
        document.getElementById("zDeg").innerHTML = "degZ: " + a;
    });
} else {
    window.alert("DeviceOrientationEvent not supported!!!");
}

if (window.DeviceMotionEvent) {
    date = d.getDate();
    din = weekday[d.getDay()];
    mon = d.getMonth();
    sec = d.getSeconds();
    m = d.getMinutes();
    hr = d.getHours();
    window.addEventListener("devicemotion", function(event) {
        xDir = event.acceleration.x.toFixed(2);
        yDir = event.acceleration.y.toFixed(2);
        zDir = event.acceleration.z.toFixed(2);

        document.getElementById("xAcc").innerHTML = "xAcc: " + xDir;
        document.getElementById("yAcc").innerHTML = "yAcc: " + yDir;
        document.getElementById("zAcc").innerHTML = "zAcc: " + zDir;

        document.getElementById("vel").innerHTML = vFin;
    });
} else {
    window.alert("DeviceMotionEvent doesn't supported!!!")
}

// battery manager
navigator.getBattery().then(function(battery) {
    function updateAllBatteryInfo() {
        updateChargeInfo();
        updateLevelInfo();
        updateChargingInfo();
        updateDischargingInfo();
    }
    updateAllBatteryInfo();

    battery.addEventListener('chargingchange', function() {
        updateChargeInfo();
    });

    function updateChargeInfo() {
        console.log("Battery charging? " +
            (battery.charging ? "Yes" : "No"));
    }

    battery.addEventListener('levelchange', function() {
        updateLevelInfo();
    });

    function updateLevelInfo() {
        console.log("Battery level: " +
            battery.level * 100 + "%");
    }

    battery.addEventListener('chargingtimechange', function() {
        updateChargingInfo();
    });

    function updateChargingInfo() {

        console.log(time);
        console.log("Battery charging time: " +
            battery.chargingTime + " seconds");
    }

    battery.addEventListener('dischargingtimechange', function() {
        updateDischargingInfo();
    });

    function updateDischargingInfo() {
        console.log("Battery discharging time: " +
            battery.dischargingTime + " seconds");
    }
});

function readBatteryLevel() {
    var $target = document.getElementById('target');

    if (!('bluetooth' in navigator)) {
        $target.innerText = 'Bluetooth API not supported.';
        return;
    }
    navigator.bluetooth.requestDevice({
            filters: [{
                services: ['battery_service']
          }]
        })
        .then(function(device) {
            return device.gatt.connect();
        })
        .then(function(server) {
            return server.getPrimaryService('battery_service');
        })
        .then(function(service) {
            return service.getCharacteristic('battery_level');
        })
        .then(function(characteristic) {
            return characteristic.readValue();
        })
        .then(function(value) {
            $target.innerHTML = 'Battery percentage is ' + value.getUint8(0) + '.';
        })
        .catch(function(error) {
            $target.innerText = error;
        });
    console.log("support")
}

function setup() {
    // body...
    createCanvas(window.innerWidth, window.innerHeight - 60, WEBGL);
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