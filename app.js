//import writeDialogue from '/js-modules/dialogues.js'
//import playSong from '/js-modules/songsPlayer.js'
//import startSequence from '/js-modules/sequence.js'

////////////////
function userClick() {
  return new Promise((resolve) => {
    document.querySelector('.dialogue-box').style.cursor = 'pointer'
    document.querySelector('.dialogue-box').addEventListener('click', () => {
      document.querySelector('.dialogue-box').style.cursor = 'default'
      resolve()
    })
  })
}

function writePart(dialogue, i, text, audio) {
  return new Promise((resolve) => {
    let int = setInterval(() => {
      if (audio !== 'none') audio.play()
      text.innerHTML = text.innerHTML + dialogue[i]
      i++
      if (dialogue[i] == '\n') {
        i++
        clearInterval(int)
        resolve(i)
      } else if (i == dialogue.length) {
        clearInterval(int)
        resolve(i)
      }
    }, 100)
  })
}

function writeDialogue(dialogue, audio, icon) {
  let dialogueWrapper = document.createElement('div')
  let cover = document.createElement('div')
  cover.className = 'cover-map'
  dialogueWrapper.innerHTML =
    '<div class="dialogue-box"><div class="character-image"></div><div class="text"></div></div>'
  document.querySelector('.game-wrapper').appendChild(dialogueWrapper)
  if (icon == 'none') {
    document.querySelector('.character-image').style.display = 'none'
    document.querySelector('.text').style.width = '500px'
    document.querySelector('.text').style.marginLeft = '50px'
  } else {
    document.querySelector('.character-image').style.backgroundImage = icon
  }

  document.body.appendChild(cover)
  let text = document.querySelector('.text')

  return new Promise(async (resolve) => {
    let i = 0
    while (i < dialogue.length) {
      i = await writePart(dialogue, i, text, audio)
      await userClick()
      text.innerHTML = ''
      if (i == dialogue.length) {
        document.body.removeChild(cover)
        document.querySelector('.game-wrapper').removeChild(dialogueWrapper)
      }
    }
    resolve()
  })
}
function playSong(song) {
  return new Promise((resolve) => {
    let cover = document.createElement('div')
    document.querySelector('audio').pause()
    cover.className = 'cover-map'
    cover.addEventListener('click', () => {
      document.body.removeChild(cover)
      song.pause()

      setTimeout(() => {
        document.querySelector('audio').play()
        resolve()
      }, 10)
    })
    document.body.appendChild(cover)
    song.play()
  })
}
function startSequence(song) {
  return new Promise((resolve) => {
    let cover = document.createElement('div')
    document.querySelector('audio').pause()
    cover.className = 'sequence-map'
    cover.addEventListener('click', () => {
      document.querySelector('.sequence-map').style.opacity = '0'
      setTimeout(() => {
        document.body.removeChild(cover)
        song.pause()
        document.querySelector('audio').play()
        resolve()
      }, 15000)
    })

    document.body.appendChild(cover)
    setTimeout(() => {
      document.querySelector('.sequence-map').style.opacity = '1'
    }, 1000)
    song.play()
  })
}

//
const dialogue = {
  sans: 'Do you wanna hear a joke about voltage?\nOn five............\nJumped ten!!!\nhehehehehehehe\nhehehehe\nhe\nIt is funny you just need to be smart\n*wink*',
  tv: 'You start watching program about therapy for fat, depressed cats\nYou hear about diagnosing your cat with depression\n How to spot dark void in their eyes...\nYou start to wonder...\nWho could come up with idea for such insightful program',
  napstablook: 'Entering........\nNext........\nDemention........',
  temmie:
    'HOI HOI I WILL MEOW...\nYOU TO DEATH\n:DDDDDDDDDD\nmeow meow meow\nmeow meow meow\nmeow meow meow\nmeow meow meow\nmeow meow meow\nmeow meow meow\nMEEEEEEEEEEOW\n:DDDDDDDDDDDDD',
  computer:
    'There is open window with SIMS 4\n You see some sims looking odly familiar\nThey are doing...\nVery, very inappropriate stuff 0_o',
  fridge:
    'You open the fridge wondering what is inside...\nInside you find bread, sweet cream and eurocrem\nYou feel intrigued by this revelation',
  web: 'You spot something moving\nYou come closer...\nAnd closer...\nAnd even closer...\nYou are starting to hear some sound...\nOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOH\nTYPE\nThis is not a spider...\nIt is a bully!!!',
  papyrusIntro: 'You come to the window when suddenly you hear...',
  papyrus:
    'NYEHEHEHEHEHE\nHUMAN YOU WALKED INTO MY EXTRAORDINARY TRAP\n ME, THE GREAT PAPYRUS, WILL NOW TORMENT YOUR SOUL\n WITH THE POWER OF THOUSAND MEOWS!!!',
}

const icon = {
  sans: "url('resources/sprites/sans-head.png')",
  napstablook: "url('resources/sprites/napsta-sprite.jpg'",
  temmie: "url('resources/sprites/temmie.gif'",
  papyrus: "url('resources/sprites/papyrus.png'",
  none: 'none',
}

const audio = {
  sans: new Audio('resources/sounds/voice_sans.mp3'),
  temmie: new Audio('resources/sounds/voice_temmie.wav'),
  default: new Audio('resources/sounds/voice_default.wav'),
  cd1: new Audio('resources/sounds/cd1.mp3'),
  cd2: new Audio('resources/sounds/cd2.mp3'),
  cd3: new Audio('resources/sounds/cd3.mp3'),
  ambient: new Audio('resources/sounds/demention.mp3'),
  papyrus: new Audio('resources/sounds/voice_papyrus.mp3'),
  papyrusSong: new Audio('resources/sounds/catstrousle.mp3'),
  none: 'none',
}

let backgroundMusic = document.createElement('div')
document.body.appendChild(backgroundMusic)

let titleScreen = document.querySelector('.title-screen')
titleScreen.addEventListener('click', () => {
  document.body.removeChild(titleScreen)
  backgroundMusic.innerHTML =
    '<audio autoplay loop><source src="resources/sounds/background.mp3" type="audio/wav">Your browser does not support the audio element.</audio>'
  document.body.appendChild(backgroundMusic)
})

document.querySelector('.interaction#sans').addEventListener('click', async () => {
  document.body.style.fontFamily = 'Undertale Sans'
  await writeDialogue(dialogue.sans, audio.sans, icon.sans)
  document.body.style.fontFamily = 'undertale'
})

document.querySelector('.interaction#tv').addEventListener('click', async () => {
  await writeDialogue(dialogue.tv, audio.default, icon.none)
})

document.querySelector('.interaction#web').addEventListener('click', async () => {
  await writeDialogue(dialogue.web, audio.default, icon.none)
})

document.querySelector('.interaction#computer').addEventListener('click', async () => {
  await writeDialogue(dialogue.computer, audio.default, icon.none)
})

document.querySelector('.interaction#fridge').addEventListener('click', async () => {
  await writeDialogue(dialogue.fridge, audio.default, icon.none)
})

document.querySelector('.interaction#temmie').addEventListener('click', async () => {
  await writeDialogue(dialogue.temmie, audio.temmie, icon.temmie)
})

document.querySelector('.interaction#napstablook').addEventListener('click', async () => {
  writeDialogue(dialogue.napstablook, audio.default, icon.napstablook)
  await startSequence(audio.ambient)
})

document.querySelector('.interaction#cd-1').addEventListener('click', async () => {
  writeDialogue('playing first cd', audio.none, icon.none)
  await playSong(audio.cd1)
})

document.querySelector('.interaction#cd-2').addEventListener('click', async () => {
  writeDialogue("Playing second cd\n'Ode to meow'", audio.default, icon.none)
  await playSong(audio.cd2)
})

document.querySelector('.interaction#cd-3').addEventListener('click', async () => {
  writeDialogue('playing third cd', audio.none, icon.none)
  await playSong(audio.cd3)
})

document.querySelector('.interaction#papyrus').addEventListener('click', async () => {
  await writeDialogue(dialogue.papyrusIntro, audio.default, icon.none)
  document.body.style.fontFamily = 'Undertale Papyrus'
  writeDialogue(dialogue.papyrus, audio.papyrus, icon.papyrus)

  await playSong(audio.papyrusSong)
  await writeDialogue(
    '........\nHOW THE HELL YOU ESCAPED MY TRAP!!!\nYOU SHOULD NOT BE ALLOWED TO DO THAT!!!',
    audio.papyrus,
    icon.papyrus
  )
  document.body.style.fontFamily = 'undertale'
})
