export default function startSequence(song){
    return new Promise(resolve =>{
        let cover = document.createElement("div")
        document.querySelector("audio").pause();
        cover.className = "sequence-map"
        cover.addEventListener('click',()=>{
            document.querySelector('.sequence-map').style.opacity = "0"
            setTimeout(()=>{            
                document.body.removeChild(cover)
                song.pause()
                document.querySelector("audio").play();
                resolve()},15000)
        })
        
        document.body.appendChild(cover)
        setTimeout(()=>{
            document.querySelector('.sequence-map').style.opacity = "1"
        },1000)
        song.play()
    })
}