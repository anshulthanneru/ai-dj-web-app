var song = "";
var rightWristX = 0;
var rightWristY = 0;
var leftWristX = 0;
var leftWristY = 0;
var leftWristScore = 0;
var rightWristScore = 0;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600,500);
    canvas.position(1150,200);
    video = createCapture(VIDEO);
    // video.position(600,500);
    video.hide();
    posenet = ml5.poseNet(video,modelLoaded);
    posenet.on('pose',gotPoses);
}

function modelLoaded() {
    console.log("PoseNet model is loaded");
}

function draw() {
    image(video,0,0,600,500);
    stroke("red");
    fill("red");
    if(rightWristScore > 0.2) {
        circle(rightWristX,rightWristY,30);
        if(rightWristY > 0 && rightWristY <= 100) {
            song.rate(0.5);
            document.getElementById("speed").innerHTML="Speed: 0.5x"
        }
        else if(rightWristY > 100 && rightWristY <= 200) {
            song.rate(1);
            document.getElementById("speed").innerHTML="Speed: 1x"
        }
        else if(rightWristY > 200 && rightWristY <= 300) {
            song.rate(1.5);
            document.getElementById("speed").innerHTML="Speed: 1.5x"
        }
        else if(rightWristY > 300 && rightWristY <= 400) {
            song.rate(2);
            document.getElementById("speed").innerHTML="Speed: 2x"
        }
        else if(rightWristY > 400) {
            song.rate(2.5);
            document.getElementById("speed").innerHTML="Speed: 2.5x"
        }
    }
    if(leftWristScore > 0.2) {
        circle(leftWristX,leftWristY,30);
        newLeftWristY = Number(leftWristY);
        newNewLeftWristY = floor((newLeftWristY)/1000);
        document.getElementById("volume").innerHTML="Volume: "+newNewLeftWristY;
        song.setVolume(newNewLeftWristY);
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1.0);
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        leftWristScore = results[0].keypoints[9].score;
        rightWristScore = results[0].keypoints[10].score;
        console.log(leftWristScore);
        console.log(rightWristScore);
        console.log(leftWristX);
        console.log(rightWristX);
        console.log(leftWristY);
        console.log(rightWristY);
    }
}