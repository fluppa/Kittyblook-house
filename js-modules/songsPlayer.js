export default function playSong(song){
    return new Promise(resolve =>{
        let cover = document.createElement("div")
        document.querySelector("audio").pause();
        cover.className = "cover-map"
        cover.addEventListener('click',()=>{
            document.body.removeChild(cover)
            song.pause()
            document.querySelector("audio").play();
            resolve()
        })
        document.body.appendChild(cover)
        song.play()
    })
}