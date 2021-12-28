import writeDialogue from '/js-modules/dialogues.js'
import playSong from '/js-modules/songsPlayer.js'
import startSequence from '/js-modules/sequence.js'

const dialogue = {
    sans : "Do you wanna hear a joke about voltage?\n On five............\nJumped ten!!!",
    tv : "*Some program about fat cats with depression is playing*\n *the announcer named Jack tell that fat means sad :CCCC",
    napstablook : "Entering........\nNext........\nDemention........",
    temmie:"HOI i w il l l   meow you.......\n TO DEATH\n :DDD\n meow meow meow\nmeow meow meow\nmeow meow meow\nmeow meow meow\nmeow meow meow\nmeow meow meow\nMEEEEEEEEEEOW :DDDDD\n I KNOW IM NOT CAT :DDDDDDDDDDDDDDD",
    computer: "*there is Sims 4 playing\n You see some people doing...\n very, very inapropiete stuff 0____o*",
    fridge: "there is smietanka and eurocreme",
    web: "there is spider\n you come closer\n and closer\n and even closer\nyou hear only\n OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO TYPIE\n OH NO ITS NOT A SPIDER ITS HETERO BULL!!! ",
    papyrusIntro : "*you come to window when suddenly you hear...",
    papyrus : "NYAHAHAHAHAHAH YOU WALKED INTO MY TRAP!!!\n YOU WILL BE TORMENTED FOR ETERNINTY\n BY MEOWING !!!!!!!!!!!!!!!!",
}

const icon = {
    sans : "url('resources/sprites/sans-head.png')",
    napstablook : "url('resources/sprites/napsta-sprite.jpg'",
    temmie : "url('resources/sprites/temmie.gif'",
    papyrus : "none",
    none : "none"
}

const audio = {
    sans : new Audio('resources/sounds/voice_sans.mp3'),
    temmie : new Audio('resources/sounds/voice_temmie.wav'),
    default : new Audio('resources/sounds/voice_default.wav'),
    cd1 : new Audio('resources/sounds/cd1.mp3'),
    cd2 : new Audio('resources/sounds/cd2.mp3'),
    cd3 : new Audio('resources/sounds/cd3.mp3'),
    ambient : new Audio('resources/sounds/demention.mp3'),
    papyrus : "none",
    papyrusSong : new Audio('resources/sounds/catstrousle.mp3'),
    none: "none"
}

let backgroundMusic = document.createElement("div")
document.body.appendChild(backgroundMusic)

let titleScreen = document.querySelector('.title-screen');
titleScreen.addEventListener('click',()=>{
    document.body.removeChild(titleScreen)
    backgroundMusic.innerHTML = '<audio autoplay loop><source src="resources/sounds/background.mp3" type="audio/wav">Your browser does not support the audio element.</audio>'
    document.body.appendChild(backgroundMusic)
})

document.querySelector('.interaction#sans').addEventListener('click',async ()=>{
        document.body.style.fontFamily = "Undertale Sans"
        await writeDialogue(dialogue.sans,audio.sans,icon.sans);
        document.body.style.fontFamily = "undertale"
})

document.querySelector('.interaction#tv').addEventListener('click',async ()=>{
    await writeDialogue(dialogue.tv,audio.default,icon.none);
})

document.querySelector('.interaction#web').addEventListener('click',async ()=>{
    await writeDialogue(dialogue.web,audio.default,icon.none);
})

document.querySelector('.interaction#computer').addEventListener('click',async ()=>{
    await writeDialogue(dialogue.computer,audio.default,icon.none);
})

document.querySelector('.interaction#fridge').addEventListener('click',async ()=>{
    await writeDialogue(dialogue.fridge,audio.default,icon.none);
})

document.querySelector('.interaction#temmie').addEventListener('click',async ()=>{
    await writeDialogue(dialogue.temmie,audio.temmie,icon.temmie);
})

document.querySelector('.interaction#napstablook').addEventListener('click',async ()=>{
    writeDialogue(dialogue.napstablook,audio.default,icon.napstablook);
    await startSequence(audio.ambient)
})

document.querySelector('.interaction#cd-1').addEventListener('click',async ()=>{
    writeDialogue("playing first cd",audio.none,icon.none);
    await playSong(audio.cd1)
})

document.querySelector('.interaction#cd-2').addEventListener('click',async ()=>{
    writeDialogue("Playing second cd\n'Ode to meow'",audio.default,icon.none);
    await playSong(audio.cd2)
})

document.querySelector('.interaction#cd-3').addEventListener('click',async ()=>{
    writeDialogue("playing third cd",audio.none,icon.none);
    await playSong(audio.cd3)
})


document.querySelector('.interaction#papyrus').addEventListener('click',async ()=>{
    await writeDialogue(dialogue.papyrusIntro,audio.default,icon.none);
    //font papyrus
    await writeDialogue(dialogue.papyrus,audio.papyrus,icon.papyrus);
    //font default
    await playSong(audio.papyrusSong)
})