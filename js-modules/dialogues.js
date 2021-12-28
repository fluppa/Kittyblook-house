function userClick(){
    return new Promise( resolve =>{
        document.querySelector(".dialogue-box").style.cursor = "pointer"
        document.querySelector(".dialogue-box").addEventListener('click',()=>{
            document.querySelector(".dialogue-box").style.cursor = "default"
            resolve();
        })
    })
}

function writePart(dialogue,i,text,audio){
    return new Promise (resolve =>{
        let int = setInterval(() => {
            if(audio !== "none")
                audio.play()
            text.innerHTML = text.innerHTML + dialogue[i]
            i++;
            if(dialogue[i]=='\n'){
                i++;
                clearInterval(int)
                resolve(i)
            }
            else if(i == dialogue.length){
                clearInterval(int)
                resolve(i)
            }
        }, 100);
    })
}

export default function writeDialogue(dialogue,audio,icon){
    let dialogueWrapper = document.createElement("div");
    let cover = document.createElement("div")
    cover.className = "cover-map"
    dialogueWrapper.innerHTML = '<div class="dialogue-box"><div class="character-image"></div><div class="text"></div></div>'
    document.querySelector('.game-wrapper').appendChild(dialogueWrapper);
    if(icon == "none")
    {
        document.querySelector('.character-image').style.display = "none"
        document.querySelector('.text').style.width = "500px"
        document.querySelector('.text').style.marginLeft = "50px"
    }
    else{
        document.querySelector('.character-image').style.backgroundImage = icon;
    }
    
    document.body.appendChild(cover);
    let text = document.querySelector('.text');

    return new Promise( async(resolve) =>{
        let i = 0;
        while(i < dialogue.length){
            i = await writePart(dialogue,i,text,audio);
            await userClick();
            text.innerHTML = "";
            if(i == dialogue.length){
                document.body.removeChild(cover)
                document.querySelector('.game-wrapper').removeChild(dialogueWrapper);
            }
        }
        resolve()
    })
}
