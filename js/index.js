const icons = document.querySelectorAll('.htmlIcon');

icons.forEach(icon => {
  icon.addEventListener('mouseover', () => {
    document.getElementById('names').textContent = icon.getAttribute('value');
  });
});

document.getElementById('xBtnTech').addEventListener('click', () => {
  document.getElementById('techSection').classList.remove('techopen')
})
document.getElementById('xBtnCont').addEventListener('click', () => {
  document.getElementById('contactMain').classList.remove('contactComeIn')
})
document.getElementById('xBtnabout').addEventListener('click', () => {
  document.getElementById('aboutMeSection').classList.remove('aboutZoom')
})

document.getElementById('aboutButton').addEventListener('click', () => {
  document.getElementById('aboutMainContent').classList.add('aboutTransformLeft')
  setTimeout(() => {
    document.getElementById('aboutInfo').classList.add('aboutTextContentShow')
  }, 500);
  document.getElementById('aboutInfo').style.display = 'block'
})

document.getElementById('goBack').addEventListener('click', () => {
  document.getElementById('aboutInfo').classList.remove('aboutTextContentShow')
  document.getElementById('aboutMainContent').classList.remove('aboutTransformLeft')
})

document.getElementById('xBtnaboutContent').addEventListener('click', () => {
  document.getElementById('aboutMeSection').classList.remove('aboutZoom')
  document.getElementById('aboutInfo').classList.remove('aboutTextContentShow')
  document.getElementById('aboutMainContent').classList.remove('aboutTransformLeft')
})

document.getElementById('certificatesOpenButton').addEventListener('click', () => {
  setTimeout(() => {
    document.getElementById('certificatesSection').classList.add('certificatesOpen')
  }, 300);
  document.getElementById('certificatesSection').style.display = 'flex'
  document.getElementById('aboutInfo').classList.remove('aboutTextContentShow')
})

document.getElementById('goBackCert').addEventListener('click', () => {
  document.getElementById('aboutInfo').classList.add('aboutTextContentShow')
  document.getElementById('certificatesSection').classList.remove('certificatesOpen')
  setTimeout(() => {
    document.getElementById('certificatesSection').style.display = 'none';
  }, 500);
})

document.getElementById('xBtncertClose').addEventListener('click', () => {
  document.getElementById('aboutMeSection').classList.remove('aboutZoom')
  document.getElementById('aboutInfo').classList.remove('aboutTextContentShow')
  document.getElementById('aboutMainContent').classList.remove('aboutTransformLeft')
  document.getElementById('certificatesSection').classList.remove('certificatesOpen')
})

const select = document.getElementById('select');
const image = document.getElementById('certificateimage');
const link = document.querySelector('.certificatelink');

select.addEventListener('change', () => {
  const selectedOption = select.value;

  switch (selectedOption) {
    case 'developer':
      image.src = './assets/certificates/1.png';
      link.href = 'https://www.coursera.org/account/accomplishments/verify/FEELGJKX2M6L';
      break;
    case 'js':
      image.src = './assets/certificates/2.png';
      link.href = 'https://www.coursera.org/account/accomplishments/verify/6QNL25VMT7L6';
      break;
    case 'depth':
      image.src = './assets/certificates/3.png';
      link.href = 'https://www.coursera.org/account/accomplishments/verify/W5VM32DCXGN4';
      break;
    case 'control':
      image.src = './assets/certificates/4.png';
      link.href = 'https://www.coursera.org/account/accomplishments/verify/ZN8HFCWXRZWT';
      break;
    case 'react':
      image.src = './assets/certificates/5.png';
      link.href = 'https://www.coursera.org/account/accomplishments/verify/BE9GSRWS5GAH';
      break;
    default:
      image.src = '';
      link.href = '#';
  }
});

document.addEventListener('contextmenu', function (event) {
  event.preventDefault();
});

const projectCards = document.querySelectorAll('.projectCard');
const prevButton = document.getElementById('prevBtn');
const nextButton = document.getElementById('nextBtn');
let currentIndex = 0;

function showCurrentCard() {
  projectCards.forEach((card, index) => {
    if (index === currentIndex) {
      card.style.display = 'flex'
      setTimeout(() => {
        card.style.transform = 'translateX(0)';
        card.style.opacity = '1';
      }, 100);
    } else {
      card.style.display = 'none'
      setTimeout(() => {
        card.style.transform = 'translateX(-100%)';
        card.style.opacity = '0';
      }, 100);
    }
  });
}

function showPrevCard() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = projectCards.length - 1;
  }
  showCurrentCard();
}

function showNextCard() {
  currentIndex++;
  if (currentIndex >= projectCards.length) {
    currentIndex = 0;
  }
  showCurrentCard();
}

prevButton.addEventListener('click', () => {
  showPrevCard();
});

nextButton.addEventListener('click', () => {
  showNextCard();
});

showCurrentCard();

const mainMusic = new Audio();
mainMusic.src = 'assets/sounds/mainMusic.mp3';
mainMusic.loop = true;


let playing = false;
const musicBtn = document.getElementById('mainMusicButton')
const volumeSlider = document.getElementById('rangeMusic');

mainMusic.volume = volumeSlider.value;

musicBtn.addEventListener('click', () => {
  if (!playing) {
    mainMusic.play();
    musicBtn.textContent = 'Pause Music';
    playing = true;
  } else {
    mainMusic.pause();
    musicBtn.textContent = `Let's Play Music`;
    playing = false;
  }
});

volumeSlider.addEventListener('input', () => {
  mainMusic.volume = volumeSlider.value;
  muteBtn.textContent = 'Mute'
  muted = false
});

const volBtn = document.getElementById('volume')
let volShow = false;
volBtn.addEventListener('click', () => {
  if (!volShow) {
    document.getElementById('rangeMusic').classList.add('volumeShow')
    document.getElementById('mute').classList.add('muteShow')
    volShow = true;
  } else {
    volShow = false;
    document.getElementById('rangeMusic').classList.remove('volumeShow')
    document.getElementById('mute').classList.remove('muteShow')
  }
})

var muted = false;

const muteBtn = document.getElementById('mute')
muteBtn.addEventListener('click', () => {
  if (!muted) {
    mainMusic.volume = 0;
    muteBtn.textContent = 'Unmute'
    muted = true;
  } else {
    mainMusic.volume = volumeSlider.value;
    muted = false;
    muteBtn.textContent = 'Mute'
  }
})

const welcomeContainer = document.getElementById('welcomeContainer')
document.getElementById('skip').addEventListener('click', () => {
  welcomeContainer.classList.add('welcomeDisplayNone')
  setTimeout(() => {
    welcomeContainer.style.display = 'none';
  }, 700);
})

const tutorialoneSection = document.getElementById('tutorial1')
document.getElementById('tutorial').addEventListener('click', () => {
  tutorialoneSection.style.display = 'flex'
  setTimeout(() => {
    tutorialoneSection.classList.add('tutorialDisplay')
  }, 500);
  document.getElementById('choose').classList.add('displayNoneTutorialwarning')
})

const tutorial2 = document.getElementById('tutorial2')
document.getElementById('gotItButton').addEventListener('click', () => {
  tutorialoneSection.style.display = 'none'
  setTimeout(() => {
  //  tutorialoneSection.classLists.remove('tutorialDisplay')
  }, 500);
  tutorial2.style.display = 'flex'
  setTimeout(() => {
    tutorial2.classList.add('tutorial2Show')
  }, 500);
})


const tutorialDoneWindow = document.getElementById('tutorial3')
const welcomeSounds = new Audio()
welcomeSounds.src = 'assets/sounds/AI Sounds/learningFast.mp3'

document.getElementById('understood').addEventListener('click', () => {
  tutorial2.classList.remove('tutorial2Show')
  setTimeout(() => {
    tutorial2.style.display = 'none'
  }, 500);
  tutorialDoneWindow.style.display = 'flex'
  setTimeout(() => {
    tutorialDoneWindow.classList.add('tutorial3')
    setTimeout(() => {
      welcomeSounds.play();
      welcomeSounds.loop = false;
      welcomeSounds.volume = 1;
    }, 600);
  }, 500);
  setTimeout(() => {
    welcomeContainer.classList.add('welcomeContainerHide')
  }, 3500);
})


let burgerOpened = false;
const burgerBtn = document.getElementById('Button_Nav')
const headerBurger = document.getElementById('header')
function Toggle_Menu() {
  if (!burgerOpened) {
    burgerBtn.addEventListener('click', () => {
      burgerBtn.classList.add('btn-x')
      headerBurger.classList.add('headerBurger')
    })
    burgerOpened = true;
  } else {
    burgerBtn.addEventListener('click', () => {
      burgerBtn.classList.remove('btn-x')
      headerBurger.classList.remove('headerBurger')
    })
    burgerOpened = false;
  }
}

addEventListener('resize', () => {
  if (window.innerWidth >= 556) {
    burgerBtn.classList.remove('btn-x')
    headerBurger.classList.remove('headerBurger')
  }
})