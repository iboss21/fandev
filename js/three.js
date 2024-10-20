const scene = new THREE.Scene();
let countIsOpened = false;
const header = document.getElementById('header')

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 3;
camera.position.x = 1;
camera.position.y = 1.5;
camera.rotation.y = Math.PI / 2;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container").appendChild(renderer.domElement);

let isDragging = false;
let previousMouseX = 0;
let rotationSpeed = 0;
const inertiaDelay = 600;
let inertiaTimeout;
let isMouseEventsEnabled = true;

function onMouseDown(event) {
  if (!isMouseEventsEnabled) return;
  isDragging = true;
  previousMouseX = event.clientX;
  rotationSpeed = 0;
  clearTimeout(inertiaTimeout);
}

function onMouseMove(event) {
  if (!isMouseEventsEnabled) return;

  if (isDragging) {
    const currentMouseX = event.clientX;
    const deltaX = currentMouseX - previousMouseX;
    previousMouseX = currentMouseX;
    rotationSpeed = deltaX * 0.001;
  }
}

function onMouseUp() {
  if (!isMouseEventsEnabled) return;

  isDragging = false;
  clearTimeout(inertiaTimeout);
  inertiaTimeout = setTimeout(() => {
    rotationSpeed = 0;
  }, inertiaDelay);
}

function handleResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

handleResize();
window.addEventListener("resize", handleResize);

const loader = new THREE.GLTFLoader();
loader.load(
  'assets/garage/scene.gltf',
  function (gltf) {
    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

const rickLoader = new THREE.GLTFLoader();
let rickModel;
let secondModel;
let thirdModel;
let fourthModel;

rickLoader.load(
  'assets/hand/scene.gltf',
  function (gltf2) {
    rickModel = gltf2.scene;
    rickModel.position.set(-1.8, 1.5, -0.05);
    rickModel.rotation.z = 0.4;
    rickModel.rotation.y = -1.5;
    scene.add(rickModel);

    rickModel.traverse(function (child) {
      if (child.isMesh) {
        child.userData.defaultMaterial = child.material;
      }
    });

    renderer.domElement.addEventListener('mousemove', onHover);
    renderer.domElement.addEventListener('click', onClick);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

const secondModelLoader = new THREE.GLTFLoader();
secondModelLoader.load(
  'assets/tech/test.gltf',
  function (gltf) {
    secondModel = gltf.scene;
    secondModel.position.set(-3.5, 1, 3.7);
    secondModel.rotation.z = 0;
    secondModel.rotation.y = 2;
    scene.add(secondModel);

    const mixer = new THREE.AnimationMixer(secondModel);
    gltf.animations.forEach((clip) => {
      const action = mixer.clipAction(clip);
      action.setLoop(THREE.LoopRepeat);
      action.clampWhenFinished = true;
      action.play();
    });

    secondModel.traverse(function (child) {
      if (child.isMesh) {
        child.userData.defaultMaterial = child.material;
      }
    });


    function animate() {
      requestAnimationFrame(animate);
      mixer.update(0.020);
      renderer.render(scene, camera);
    }
    animate();

    renderer.domElement.addEventListener('mousemove', onHover);
    renderer.domElement.addEventListener('click', onClick);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

const thirdModelLoader = new THREE.GLTFLoader();
thirdModelLoader.load(
  'assets/sea/scene.gltf',
  function (gltf) {
    thirdModel = gltf.scene;
    thirdModel.position.set(0.4, 1.4, 0.3);
    thirdModel.rotation.y = 0;
    scene.add(thirdModel);

    thirdModel.traverse(function (child) {
      if (child.isMesh) {
        child.userData.defaultMaterial = child.material;
      }
    });

    const loading = document.getElementById('loading')
    loading.classList.add('loadingDone')
    setTimeout(() => {
      loading.style.display = 'none'
    }, 700);

    renderer.domElement.addEventListener('mousemove', onHover);
    renderer.domElement.addEventListener('click', onClick);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

const fourthModelLoader = new THREE.GLTFLoader();
fourthModelLoader.load(
  'assets/alien/scene.gltf',
  function (gltf) {
    fourthModel = gltf.scene;
    fourthModel.position.set(0.2, 0.6, 5.0);
    fourthModel.rotation.y = 1.5;
    scene.add(fourthModel);

    fourthModel.traverse(function (child) {
      if (child.isMesh) {
        child.userData.defaultMaterial = child.material;
      }
    });

    renderer.domElement.addEventListener('mousemove', onHover);
    renderer.domElement.addEventListener('click', onClick);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

function onHover(event) {
  event.preventDefault();

  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  if (rickModel) {
    const intersectsRick = raycaster.intersectObject(rickModel, true);

    rickModel.traverse(function (child) {
      if (child.isMesh) {
        child.material = child.userData.defaultMaterial;
        child.material.opacity = 1;
        child.material.transparent = false;
        child.material.needsUpdate = true;
      }
    });

    if (intersectsRick.length > 0) {
      rickModel.traverse(function (child) {
        if (child.isMesh) {
          child.material.opacity = 0.5;
          child.material.transparent = true;
          child.material.needsUpdate = true;
        }
      });
    }
  }

  if (secondModel) {
    const intersectsSecond = raycaster.intersectObject(secondModel, true);

    secondModel.traverse(function (child) {
      if (child.isMesh) {
        child.material = child.userData.defaultMaterial;
        child.material.opacity = 0.9;
        child.material.transparent = true;
        child.material.needsUpdate = true;
      }
    });

    if (intersectsSecond.length > 0) {
      secondModel.traverse(function (child) {
        if (child.isMesh) {
          child.material.opacity = 0.5;
          child.material.transparent = true;
          child.material.needsUpdate = true;
        }
      });
    }
  }

  if (thirdModel) {
    const intersectsThird = raycaster.intersectObject(thirdModel, true);

    thirdModel.traverse(function (child) {
      if (child.isMesh) {
        child.material = child.userData.defaultMaterial;
        child.material.opacity = 1;
        child.material.transparent = false;
        child.material.needsUpdate = true;
      }
    });

    if (intersectsThird.length > 0) {
      thirdModel.traverse(function (child) {
        if (child.isMesh) {
          child.material.opacity = 0.5;
          child.material.transparent = true;
          child.material.needsUpdate = true;
        }
      });
    }
  }

  if (fourthModel) {
    const intersectsFourth = raycaster.intersectObject(fourthModel, true);

    fourthModel.traverse(function (child) {
      if (child.isMesh) {
        child.material = child.userData.defaultMaterial;
        child.material.opacity = 1;
        child.material.transparent = true;
        child.material.needsUpdate = true;
      }
    });

    if (intersectsFourth.length > 0) {
      fourthModel.traverse(function (child) {
        if (child.isMesh) {
          child.material.opacity = 0.5;
          child.material.transparent = true;
          child.material.needsUpdate = true;
        }
      });
    }
  }
}

let flag = 1;


function onClick(event) {
  event.preventDefault();

  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  if (rickModel) {
    const intersectsRick = raycaster.intersectObject(rickModel, true);

    if (intersectsRick.length > 0) {
      header.classList.add('headerTransition')
      const aboutSound = new Audio();
      aboutSound.src = 'assets/sounds/AI Sounds/OpeningAbout.mp3'
      aboutSound.play();
      isMouseEventsEnabled = false;
      const about = document.getElementById('aboutMeSection');
      setTimeout(() => {
        about.classList.add('aboutZoom');
      }, 500);

      about.style.display = 'flex';

      new TWEEN.Tween(camera.position)
        .to({ x: -1.2, y: 1.7, z: 1 }, 1500)
        .easing(TWEEN.Easing.Quadratic.Out)
        .start();

      new TWEEN.Tween(camera.rotation)
        .to({ y: 0.5, z: 0 }, 1500)
        .easing(TWEEN.Easing.Quadratic.Out)
        .start();


    }
  }

  if (secondModel) {
    const intersectsSecond = raycaster.intersectObject(secondModel, true);

    if (intersectsSecond.length > 0) {
      header.classList.add('headerTransition')
      const techOpen = new Audio();
      techOpen.src = 'assets/sounds/AI Sounds/openingTech.mp3'
      techOpen.play();
      isMouseEventsEnabled = false;
      const tech = document.getElementById('techSection');
      setTimeout(() => {
        tech.classList.add('techopen');
      }, 500);

      tech.style.display = 'flex';

      new TWEEN.Tween(camera.position)
        .to({ x: -2.5, y: 1.2, z: 3 }, 1500)
        .easing(TWEEN.Easing.Quadratic.Out)
        .start();

      new TWEEN.Tween(camera.rotation)
        .to({ y: 2, z: 0 }, 1500)
        .easing(TWEEN.Easing.Quadratic.Out)
        .start();
    }
  }
  const projectAlert = document.getElementById('projectsAlert');


  if (thirdModel) {
    const intersectsThird = raycaster.intersectObject(thirdModel, true);

    if (intersectsThird.length > 0) {
      header.classList.add('headerTransition')
      const projectsOpening = new Audio();
      projectsOpening.src = 'assets/sounds/AI Sounds/openingProjects.mp3'
      projectsOpening.play();
      isMouseEventsEnabled = false;
      openedCheck();
     
      function ifopened() {
        if (!countIsOpened) {
          setTimeout(() => {
            projectAlert.classList.add('projectsWarningOpen');
          }, 1000);
          setTimeout(() => {
            countdown(5);
          }, 500);
          countIsOpened = true;
        }
        requestAnimationFrame(ifopened)
      }

      ifopened();

      new TWEEN.Tween(camera.position)
        .to({ x: 0.7, y: 1.5, z: 1.4 }, 1500)
        .easing(TWEEN.Easing.Quadratic.Out)
        .start();

      new TWEEN.Tween(camera.rotation)
        .to({ y: 0.2, z: 0 }, 1500)
        .easing(TWEEN.Easing.Quadratic.Out)
        .start();
    }
  }

  function countdown(seconds) {
    var countdownElement = document.getElementById("countdown");
    countdownElement.innerHTML = seconds + "...";
  
    if (seconds >= 0) {
      setTimeout(function() {
        countdown(seconds - 1);
      }, 1000); 
    } else {
      countdownElement.innerHTML = "Opening Projects!";
      setTimeout(() => {
        projectAlert.classList.remove('projectsWarningOpen')
        const projects = document.getElementById('projects')
        projects.style.display = 'flex'
        setTimeout(() => {
          projects.classList.add('projectsComein')
        }, 100);
      }, 600);
    }
  }

  document.getElementById('xBtnProjects').addEventListener('click', () => {
    document.getElementById('projects').classList.remove('projectsComein')
  })

  function openedCheck() {
    if (countIsOpened) {
      setTimeout(() => {
        projects.classList.add('projectsComein')
      }, 100);
    }
  }
  

  if (fourthModel) {
    const intersectsFourth = raycaster.intersectObject(fourthModel, true);

    if (intersectsFourth.length > 0) {
      header.classList.add('headerTransition')
      const contactOpening = new Audio();
      contactOpening.src = 'assets/sounds/AI Sounds/openingContacts.mp3'
      contactOpening.play();
      isMouseEventsEnabled = false;
      const contact = document.getElementById('contactMain');
      setTimeout(() => {
        contact.classList.add('contactComeIn');
      }, 500);

      contact.style.display = 'flex'

      new TWEEN.Tween(camera.position)
        .to({ x: 0.8, y: 1.2, z: 4.5 }, 1500)
        .easing(TWEEN.Easing.Quadratic.Out)
        .start();

      new TWEEN.Tween(camera.rotation)
        .to({ y: 3, z: 0 }, 1500)
        .easing(TWEEN.Easing.Quadratic.Out)
        .start();
    }
  }
}

function animate() {
  requestAnimationFrame(animate);
  camera.rotation.y += rotationSpeed;
  renderer.render(scene, camera);
  TWEEN.update();
}

animate();

const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

document.querySelectorAll('.XBtn').forEach(buttons => {
  buttons.addEventListener('click', () => {
    cameraDefaultPositionTween() 
    isMouseEventsEnabled = true
    header.classList.remove('headerTransition')
  })
})

function cameraDefaultPositionTween() {
  new TWEEN.Tween(camera.position)
    .to({ x: 1, y: 1.5, z: 3 }, 1500)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start();

  new TWEEN.Tween(camera.rotation)
    .to({ y: Math.PI / 2, z: 0 }, 1500)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start();
}


document.addEventListener("mousedown", onMouseDown);
document.addEventListener("mousemove", onMouseMove);
document.addEventListener("mouseup", onMouseUp);


const rangeInput = document.getElementById('rangeMusic');

rangeInput.addEventListener('mousedown', function() {
  const value = rangeInput.value;
  isMouseEventsEnabled = false;
});
rangeInput.addEventListener('mouseup', function() {
  const value = rangeInput.value;
  isMouseEventsEnabled = true;
});

document.addEventListener("touchstart", onTouchStart);
document.addEventListener("touchmove", onTouchMove);
document.addEventListener("touchend", onTouchEnd);
let previousTouchX = 0;
let isTouchEventsEnabled = true;


function onTouchStart(event) {
  if (!isTouchEventsEnabled) return;
  isDragging = true;
  previousTouchX = event.touches[0].clientX;
  rotationSpeed = 0;
  clearTimeout(inertiaTimeout);
}

function onTouchMove(event) {
  if (!isTouchEventsEnabled) return;

  if (isDragging) {
    const currentTouchX = event.touches[0].clientX;
    const deltaX = currentTouchX - previousTouchX;
    previousTouchX = currentTouchX;
    rotationSpeed = deltaX * 0.001;
  }
}

function onTouchEnd() {
  if (!isTouchEventsEnabled) return;

  isDragging = false;
  clearTimeout(inertiaTimeout);
  inertiaTimeout = setTimeout(() => {
    rotationSpeed = 0;
  }, inertiaDelay);
}