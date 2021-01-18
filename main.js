status="";
objects=[];

function preload()
{

}

function setup()
{
    canvas=createCanvas(480,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(480,380);  
    video.hide(); 
}

function start()
{
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status - Detecting Objects...";
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status=true;
}

function gotResult(error,results)
{
    if (error)
    {
        console.log(error);
    }
    console.log(results);
    objects=results;
}

function draw()
{
    image(video,0,0,480,380);
    if (status!="")
    {
        objectDetector.detect(video, gotResult);
        for (i=0; i<objects.length; i++)
        {
            document.getElementById("status").innerHTML="Status - Objects Detected!";
            document.getElementById("numberOfObjects").innerHTML="Number Of Objects Are "+objects.length;
            fill("#00FFFF");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%", objects[i].x, objects[i].y);
            noFill();
            stroke("#00FFFF");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        }
    }
}