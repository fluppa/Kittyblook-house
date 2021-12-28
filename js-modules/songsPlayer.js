export default function playSong(song) {
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
