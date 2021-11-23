/*
Name: Tej Parekh
ID: 144914207
Email: tpparekh@myseneca.ca
*/
const image1  = document.querySelector("#slideshow1");
const image2  = document.querySelector("#slideshow2");
const image3  = document.querySelector("#slideshow3");
const image4  = document.querySelector("#slideshow4");
const image5  = document.querySelector("#slideshow5");
const image6  = document.querySelector("#slideshow6");

const SIZE = 6; 
const filePathsArray = [];

for (let i = 1; i <= SIZE; ++i) 
  filePathsArray.push(`img/banner/imgBanner`+i+`.jpg`);

let count1=0;
let count2=1;
let count3=2;
let count4=3;
let count5=4;
let count6=5;

const changePic = ()=>
{
    
    image1.src=filePathsArray[count1];
    image2.src=filePathsArray[count2];
    image3.src=filePathsArray[count3];
    image4.src=filePathsArray[count4];
    image5.src=filePathsArray[count5];
    image6.src=filePathsArray[count6];

    

    count1++;
    count2++;
    count3++;
    count4++;
    count5++;
    count6++;

    
    if(count1==filePathsArray.length)
    {
      count1=0;
    }

    if(count2==filePathsArray.length)
    {
      count2=0;
    }

    if(count3==filePathsArray.length)
    {
      count3=0;
    }

    if(count4==filePathsArray.length)
    {
      count4=0;
    }

    if(count5==filePathsArray.length)
    {
      count5=0;
    }

    if(count6==filePathsArray.length)
    {
      count6=0;
    }
}


setInterval(changePic, 800);



const divPara = document.querySelector(`#pVideoDiv`);

const functClose =()=>{
    const showVideo = document.querySelector(`#videoID`);

    if (showVideo.style.display != "none"){
      showVideo.style.display = "none";
    } 

    else {}
}

divPara.addEventListener(`click`, functClose);