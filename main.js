// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!

const modal = document.getElementById('modal')

function hideModal() {
  modal.setAttribute('class', 'hidden')
}

function clickHeart(event) {
  let heart = event.target
  if (heart.innerHTML === EMPTY_HEART) {
    mimicServerCall()
    .then(server => {
      heart.innerHTML = FULL_HEART
      heart.setAttribute('class', 'activated-heart')
    })
    .catch((reason) => {
      modal.removeAttribute('class', 'hidden')
      modal.innerHTML = reason
      window.setTimeout(hideModal, 5000)
    })
  } else {
    heart.innerHTML = EMPTY_HEART
    heart.removeAttribute('class', 'activated-heart')
  }
}

hideModal()

document.addEventListener('DOMContentLoaded', () => {
  const likes = document.getElementsByClassName('like-glyph')
  for (const heart in likes) {
    if (likes.hasOwnProperty(heart)) {
      const element = likes[heart]
      element.addEventListener('click', clickHeart)
    }
  }
})

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
