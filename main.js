song="";
leftWristX="";
leftWristy="";
rightWristX="";
rightWristy="";
ScoreLeftWrist="";
ScoreRightWrist="";

function preload()
{
    song=loadSound("music.mp3");
   
}
function setup()
{
canva=createCanvas(500 , 500);
video=createCapture(VIDEO);
video.hide();
canva.position(500 , 200);

console.log(ml5.version);
poseNet= ml5.poseNet(video , modelLoaded);
poseNet.on("pose", gotPoses);

}
function draw()
{
 image(video , 0 , 0 , 500 , 500);
 fill(0 , 255 , 255);
 stroke(0 , 25 , 255);
 

 if (ScoreLeftWrist > 0.2)
 {
    circle(leftWristX ,leftWristy ,30);
    convert_number=Number(leftWristy);
    remove_decimal=floor(convert_number);
    volume=remove_decimal/500;
    song.setVolume(volume);

    document.getElementById("sound_Control").innerHTML=volume;
    
 }
if (ScoreRightWrist > 0.2)
{
    circle(rightWristX , rightWristy ,30);
    if (rightWristy > 0 && rightWristy <= 100)
    {
        song.rate(0.5);

        document.getElementById("sound_Control_2").innerHTML="Speed : 0.5x";
    }
    if (rightWristy > 100 && rightWristy <= 200)
    {
        song.rate(1);

        document.getElementById("sound_Control_2").innerHTML="Speed : 1x";
    }
    if (rightWristy > 200 && rightWristy <= 300)
    {
        song.rate(1.5);

        document.getElementById("sound_Control_2").innerHTML="Speed : 1.5x";
    }
    if (rightWristy > 300 && rightWristy <= 400)
    {
        song.rate(2);

        document.getElementById("sound_Control_2").innerHTML="Speed : 2x";
    }
    if (rightWristy > 400 && rightWristy <= 500)
    {
        song.rate(2.5);

        document.getElementById("sound_Control_2").innerHTML="Speed : 2.5x";
    }
}


 
}
function songPlay()
{
    song.play();
    song.setVolume(0.5);
    song.rate(1)
}
function songStop()
{
    song.stop()
}
function modelLoaded ()
{
    console.log("Model Was taking your device data (DANGER !) please do not touch the code ");
    console.log("Hey this website is very dangerous !!!!!");
}
function gotPoses (result)
{
   if (result.length > 0)
   {
      
    console.log(result); 

    leftWristX=result[0].pose.leftWrist.x;
    rightWristX=result[0].pose.rightWrist.x;
    leftWristy=result[0].pose.leftWrist.y;
    rightWristy=result[0].pose.leftWrist.y;


    ScoreLeftWrist=result[0].pose.keypoints[9].score;
    ScoreRightWrist=result[0].pose.keypoints[10].score;



     

    


   }

}