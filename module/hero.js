import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { Lensflare, LensflareElement } from "three/examples/jsm/objects/Lensflare.js";

// Caption text
const what = ["Compete", "Play", "Learn", "Explore"];
const who = ["with strangers", "on your own", "with your friends", "with your colleagues"];
const where = ["in a tournament", "in a game", "in a lesson", "in a challenge"];

const whatElement = document.querySelector("#what");
const whoElement = document.querySelector("#who");
const whereElement = document.querySelector("#where");

let whatIndex = 0;
let whoIndex = 0;
let whereIndex = 0;

/**
 * Update the text on the hero
 */
function updateText() {
	whatIndex = (whatIndex + 1) % what.length;
	whoIndex = (whoIndex + 1) % who.length;
	whereIndex = (whereIndex + 1) % where.length;

	whatElement.textContent = what[whatIndex];
	whoElement.textContent = who[whoIndex];
	whereElement.textContent = where[whereIndex];
}
updateText();
document.querySelector(".caption").addEventListener("animationiteration", updateText);

const colorLight = new THREE.Color(`hsl(220, 80%, 95%)`);
const colorBackground = new THREE.Color(`hsl(220, 80%, 15%)`);
const colorDark = new THREE.Color(`hsl(220, 30%, 10%)`);

// Get the hero canvas element
const container = document.querySelector("#hero");

// Setup the renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(devicePixelRatio);
renderer.setClearColor(colorBackground);
renderer.setSize(innerWidth, innerHeight);
container.appendChild(renderer.domElement);

// Create a camera
const camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.01, 100);
camera.zoom = innerWidth / 1000;
camera.position.z = 3;
camera.focalLength = 3;

// Create a scene
const scene = new THREE.Scene();

// Add lens flares
const dirLight = new THREE.DirectionalLight(colorLight, 0.05);
dirLight.position.set(0, -1, 0).normalize();
dirLight.color.setHSL(0.1, 0.7, 0.5);
scene.add(dirLight);

const textureLoader = new THREE.TextureLoader();
const textureFlare0 = textureLoader.load("/assets/lensflare0.png");
const textureFlare3 = textureLoader.load("/assets/lensflare3.png");

addLight(0.55, 0.9, 0.5, 5, -5, 5); // Cyan is at right bottom front
addLight(0.08, 0.8, 0.5, 0, -3, -10); // Orange is at center middle-bottom back
addLight(0.995, 0.5, 0.9, -10, 10, 10); // White is at the far left top front

function addLight(h, s, l, x, y, z) {
	const light = new THREE.PointLight(colorLight, 1.5, 2000);
	light.color.setHSL(h, s, l);
	light.position.set(x, y, z);
	scene.add(light);

	const lensflare = new Lensflare();
	lensflare.addElement(new LensflareElement(textureFlare0, 700, 0, light.color));
	lensflare.addElement(new LensflareElement(textureFlare3, 60, 0.6));
	lensflare.addElement(new LensflareElement(textureFlare3, 70, 0.7));
	lensflare.addElement(new LensflareElement(textureFlare3, 120, 0.9));
	lensflare.addElement(new LensflareElement(textureFlare3, 70, 1));
	light.add(lensflare);
}

// Add fog
scene.fog = new THREE.FogExp2(colorBackground, 0.1);

const font = await new Promise(resolve => {
	new FontLoader().load("../assets/Lato_Regular.json", font => {
		resolve(font);
	});
});

// Add heading
const headingGeometry = new TextGeometry("Code Comp", {
	font,
	size: 0.25,
	height: 0.1,
});
headingGeometry.center();
const headingMaterial = new THREE.MeshPhysicalMaterial({
	color: colorLight,
});
const headingMesh = new THREE.Mesh(headingGeometry, headingMaterial);
headingMesh.position.setZ(1);
headingMesh.position.setY(0.5);
scene.add(headingMesh);

// Add tablets
const tablets = [];
const textMaterial = new THREE.MeshPhysicalMaterial({ color: colorDark });
const textGeometry = new TextGeometry(">_", {
	font: font,
	size: 0.25,
	height: 0.05,
});
for (let i = 0; i < 50; i++) {
	const color = new THREE.Color(`hsl(${Math.random() * 360}, 100%, 80%)`);
	const group = new THREE.Group();

	const boxGeometry = new THREE.BoxGeometry();
	boxGeometry.scale(1, 1, 0.005);
	const boxMaterial = new THREE.MeshPhysicalMaterial({
		color,
		opacity: 0.9,
		transparent: true,
	});
	const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);

	// Draw text
	const text = new THREE.Mesh(textGeometry, textMaterial);
	text.position.set(-0.5, 0.25, 0);
	group.add(text);

	group.add(boxMesh);
	group.position.set(
		(Math.random() * innerWidth) / 10 - innerWidth / 20,
		(Math.random() * innerHeight) / 10 - innerHeight / 20,
		Math.random() * -10,
	);
	group.scale.x = group.scale.y = group.scale.z = Math.random() * 3 + 1;

	scene.add(group);
	renderer.render(scene, camera);
	tablets.push(group);
}

// Resize the canvas when the window is resized
addEventListener("resize", () => {
	camera.aspect = innerWidth / innerHeight;
	camera.zoom = innerWidth / 1000;
	camera.updateProjectionMatrix();

	renderer.setSize(innerWidth, innerHeight);
});

// Move tablets based on mouse movement
let mouseX = 0,
	mouseY = 0;
addEventListener("pointermove", ({ clientX, clientY }) => {
	mouseX = (clientX - innerWidth / 2) / 100;
	mouseY = (clientY - innerHeight / 2) / 100;
});

function animate() {
	const timer = 0.0001 * Date.now();

	camera.position.x += (mouseX - camera.position.x) * 0.05;
	camera.position.y += (-mouseY - camera.position.y) * 0.05;

	camera.lookAt(scene.position);

	for (let i = 0, j = tablets.length; i < j; i++) {
		const sphere = tablets[i];

		sphere.position.x = 10 * Math.cos(timer + i);
		sphere.position.y = 10 * Math.sin(timer + i * 1.1);
	}

	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}
animate();
