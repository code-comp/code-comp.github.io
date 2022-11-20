import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

// Get the hero canvas element
const container = document.querySelector("#hero");

// Setup the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x081c45);
renderer.setSize(innerWidth, innerHeight);
container.appendChild(renderer.domElement);

// Create a camera
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.zoom = innerWidth / 1000;
camera.position.setZ(10);

// Create a scene
const scene = new THREE.Scene();

// Add illumination
const spotlight = new THREE.SpotLight(0xffffff);
spotlight.castShadow = true;
spotlight.position.set(30, 60, 60);
scene.add(spotlight);

// Create tablets
const tablets = [];
let i = 0;
while (i < 15) {
	addTablet(`hsl(${Math.random() * 360}, 100%, 80%)`);
	i++;
}

// Resize the canvas when the window is resized
addEventListener("resize", () => {
	renderer.setSize(container.clientWidth, container.clientHeight);
	camera.aspect = container.clientWidth / container.clientHeight;
	camera.zoom = innerWidth / 1000;
	camera.updateProjectionMatrix();
});

// Move tablets based on mouse movement
addEventListener("pointermove", ({ movementX, movementY }) => {
	tablets.forEach(tablet => moveTablet(tablet, movementX, movementY));
});

addEventListener("scroll", () => {
	// Zoom camera in and out based on mouse wheel
	camera.position.setZ(10 - scrollY / 100);
	renderer.render(scene, camera);
});

/**
 * Create and add a tablet to the scene
 * @param {string} color The color of the tablet
 * @returns {THREE.Group} The tablet
 */
function addTablet(color) {
	const group = new THREE.Group();

	const geometry = new THREE.BoxGeometry();
	geometry.scale(1, 1, 0.1);
	const material = new THREE.MeshBasicMaterial({ color });
	const rectangle = new THREE.Mesh(geometry, material);

	// Draw text
	new FontLoader().load("../assets/Lato_Regular.json", font => {
		const material = new THREE.MeshLambertMaterial({ color: 0x000000 });
		const geometry = new TextGeometry(">_", {
			font: font,
			size: 0.25,
			height: 0.05,
		});
		const text = new THREE.Mesh(geometry, material);
		text.position.set(-0.5, 0.25, 0);
		group.add(text);

		renderer.render(scene, camera);
	});
	group.add(rectangle);
	group.position.set(
		(Math.random() * innerWidth - innerWidth / 2) / 50,
		(Math.random() * innerHeight - innerHeight / 1.25) / 50,
		(Math.random() * innerWidth - innerWidth / 2) / 50,
	);

	scene.add(group);
	renderer.render(scene, camera);
	tablets.push(group);

	return group;
}

/**
 * Move a tablet based on mouse movement
 * @param {THREE.Group} tablet The tablet to move
 * @param {THREE.Vector3} x The x movement
 * @param {THREE.Vector3} y The y movement
 */
function moveTablet(tablet, x, y) {
	tablet.position.applyQuaternion(new THREE.Quaternion().setFromEuler(new THREE.Euler(y / 100, x / 100, 0, "XYZ")));
	renderer.render(scene, camera);
}

const action = ["Compete", "Play", "Learn", "Explore"];
const noun = ["with strangers", "on your own", "with your friends", "with your family", "with your colleagues"];
const verb = ["in a tournament", "in a game", "in a lesson", "in a challenge"];

const actionElement = document.querySelector("#action");
const nounElement = document.querySelector("#noun");
const verbElement = document.querySelector("#verb");

let actionIndex = 0;
let nounIndex = 0;
let verbIndex = 0;

/**
 * Update the text on the hero
 */
function updateText() {
	actionIndex = (actionIndex + 1) % action.length;
	nounIndex = (nounIndex + 1) % noun.length;
	verbIndex = (verbIndex + 1) % verb.length;

	actionElement.textContent = action[actionIndex];
	nounElement.textContent = noun[nounIndex];
	verbElement.textContent = verb[verbIndex];
}
updateText();
document.querySelector(".caption").addEventListener("animationiteration", updateText);
