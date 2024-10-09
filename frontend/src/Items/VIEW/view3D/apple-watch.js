//Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/pin/three@v0.129.0-etawtYd3YiVcjRaPT4iS/mode=imports,min/optimized/three.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

//Create a Three.JS Scene
const scene = new THREE.Scene();
//create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);

//Keep track of the mouse position, so we can make the eye move
let mouseX = window.innerWidth / 1;
let mouseY = window.innerHeight / 1;

//Keep the 3D object on a global variable so we can access it later
let object;

//OrbitControls allow the camera to move around the scene
let controls;

//Set which object to render
let objToRender = 'apple watch';

//Instantiate a loader for the .gltf file
const loader = new GLTFLoader();

//Load the file
loader.load(
  `../View/${objToRender}/scene.gltf`,
  function (gltf) {
    //If the file is loaded, add it to the scene
    object = gltf.scene;
    scene.add(object);
  },
  function (xhr) {
    //While it is loading, log the progress
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    //If there is an error, log it
    console.error(error);
  }
);

//Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true }); //Alpha: true allows for the transparent background
renderer.setSize(window.innerWidth, window.innerHeight);

//Add the renderer to the DOM
document.getElementById("container3D").appendChild(renderer.domElement);

//Set how far the camera will be from the 3D model
camera.position.z = objToRender === "iphone" ? 0.2 : 0.3;

//Add lights to the scene, so we can actually see the 3D model

const topLight = new THREE.PointLight(0xffffff, 9.5); // (color, intensity)
topLight.position.set( 1.5, 2, 1.8); //top-left-ish
topLight.castShadow = true;
scene.add(topLight);

const light = new THREE.PointLight(0x4c4c4c, 9);
light.position.set( 1 , 1 , 1.4 );
scene.add(light);

const light1 = new THREE.PointLight(0x4c4c4c, 10);
light.position.set( 0 , 0 , 0 );
scene.add(light);





const ambientLight = new THREE.AmbientLight(0x333333, objToRender === "apple watch" ? 8: 8);
scene.add(ambientLight);


//This adds controls to the camera, so we can rotate / zoom it with the mouse
if (objToRender === "apple watch") {
  controls = new OrbitControls(camera, renderer.domElement);
}

//Render the scene
function animate() {
  requestAnimationFrame(animate);
  //Here we could add some code to update the scene, adding some automatic movement

  //Make the eye move
  if (object && objToRender === "eye") {
    //I've played with the constants here until it looked good 
    object.rotation.y = -3 + mouseX / window.innerWidth * 3;
    object.rotation.x = -1.2 + mouseY * 2.5 / window.innerHeight;
  }
  renderer.render(scene, camera);
}

//Add a listener to the window, so we can resize the window and the camera
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

//add mouse position listener, so we can make the eye move
document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

//Start the 3D rendering
animate();