const content = document.querySelector(".content"),
Playimage = content.querySelector(".music-image img"),
musicName = content.querySelector(".music-titles .name"),
musicArtist = content.querySelector(".music-titles .artist"),
mainAudio = document.querySelector(".main-song"),
playBtn = content.querySelector(".play-pause"),
playBtnIcon = content.querySelector(".play-pause span"),
prevBtn = content.querySelector("#prev"),
nextBtn = content.querySelector("#next"),
progressBar = content.querySelector(".progress-bar"),
progressDetails = content.querySelector(".progress-details"),
repeatBtn = content.querySelector("#repeat"),
Shuffle = content.querySelector("#shuffle");

let index = 1; 

window.addEventListener("load", () =>{
    loadData(index);
   
});

function loadData(indexValue){
musicName.innerHTML = allMusic[indexValue - 1 ].name;
musicArtist.innerHTML = allMusic[indexValue - 1].artist;
Playimage.src = "images/" +allMusic[indexValue - 1].img; 
mainAudio.src = `songs/${allMusic[indexValue - 1].src}`;
}


playBtn.addEventListener("click", ()=>{
 const isMusicPaused = content.classList.contains("paused");
 if(isMusicPaused){
    pauseSong();
 }
 else{
    playSong();
 }
});

function playSong(){
    content.classList.add("paused");
    playBtnIcon.innerHTML  = "pause";
    mainAudio.play();


}
function pauseSong(){
   content.classList.remove("paused");
   playBtnIcon.innerHTML = "play_arrow"; 
 mainAudio.pause();
}

nextBtn.addEventListener("click", ()=>{
    nextSong();

});

prevBtn.addEventListener("click", ()=>{
    prevSong();

});

function nextSong(){
    index ++;
    if(index > allMusic.length){
        index = 1;
    }
    else{
        index = index;
    }
    loadData(index);
    playSong();
}

function prevSong(){
    index--;
    if(index <= 0){
        index = allMusic.length;
    }
    else{
        index = index;
    }
    loadData(index);
    playSong();


}

mainAudio.addEventListener("timeupdate", (e)=>{
    const initialTime = e.target.currentTime; 
    const finalTime = e.target.duration;
    let BarWidth = (initialTime / finalTime) * 100;
    progressBar.style.width = BarWidth+"% ";

   progressDetails.addEventListener("click", (e)=>{
     let progressValue = progressDetails.clientWidth;
     let clickedOffSetX = e.offsetX;
     let MusicDuration = mainAudio.duration;

    mainAudio.currentTime = (clickedOffSetX / progressValue) * MusicDuration;
   });

   //timer logic
   mainAudio.addEventListener("loadeddata", ()=>{
    let finalTimeData = content.querySelector(".final");

    //update finalduration

    let AudioDuration = mainAudio.duration;
    let finalMinutes = Math.floor(AudioDuration / 60);
    let finalSeconds = Math.floor(AudioDuration % 60);
    if(finalSeconds < 10){
        finalSeconds = "0"+finalSeconds;
    }
    finalTimeData.innerText = finalMinutes+":"+finalSeconds;
   });

   //update current duration
   let currentTimeData = content.querySelector(".current");
   let CurrentTime = mainAudio.currentTime;
   let currentMinutes = Math.floor(CurrentTime / 60);
   let currentSeconds = Math.floor(CurrentTime % 60);
   if(currentSeconds < 10){
    currentSeconds = "0"+currentSeconds;
   }
   currentTimeData.innerText = currentMinutes+":"+ currentSeconds;

   //repeatbutton
   repeatBtn.addEventListener("click", ()=>{
    mainAudio.currentTime = 0;
   });

});

//shuffle logic
Shuffle.addEventListener("click", ()=>{
var randIndex = Math.floor(Math.random() * allMusic.length) + 1;
loadData(randIndex);
playSong();
});

mainAudio.addEventListener("ended", ()=>{
    index++;
    if(index > allMusic.length){
        index = 1;
    }
    loadData(index);
    playSong();
})