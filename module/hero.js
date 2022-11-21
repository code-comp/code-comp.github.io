import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { Lensflare, LensflareElement } from "three/examples/jsm/objects/Lensflare.js";

// Get the hero canvas element
const container = document.querySelector("#hero");

// Setup the renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(devicePixelRatio);
renderer.setClearColor(0x081c45);
renderer.setSize(innerWidth, innerHeight);
container.appendChild(renderer.domElement);

// Create a camera
const camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.01, 1000);
camera.zoom = innerWidth / 1000;
camera.position.z = 3;
camera.focalLength = 3;

// Create a scene
const scene = new THREE.Scene();

// Add illumination
const spotlight = new THREE.SpotLight(0xffffff);
spotlight.castShadow = true;
spotlight.position.set(100, 40, 50);
scene.add(spotlight);

// Add lens flares
const dirLight = new THREE.DirectionalLight(0xffffff, 0.05);
dirLight.position.set(0, -1, 0).normalize();
dirLight.color.setHSL(0.1, 0.7, 0.5);
scene.add(dirLight);

const textureLoader = new THREE.TextureLoader();
const textureFlare0 = textureLoader.load("/assets/lensflare0.png");
const textureFlare3 = textureLoader.load("/assets/lensflare3.png");

addLight(0.55, 0.9, 0.5, 5000, 0, -1000);
addLight(0.08, 0.8, 0.5, 0, 0, -1000);
addLight(0.995, 0.5, 0.9, 5000, 5000, -1000);

function addLight(h, s, l, x, y, z) {
	const light = new THREE.PointLight(0xffffff, 1.5, 2000);
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
scene.fog = new THREE.FogExp2(0x081c45, 0.1);

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
	color: new THREE.Color(`hsl(220, 80%, 90%)`),
});
const headingMesh = new THREE.Mesh(headingGeometry, headingMaterial);
headingMesh.position.setZ(1);
headingMesh.position.setY(0.5);
scene.add(headingMesh);

// Add tablets
const tablets = [];
const textMaterial = new THREE.MeshPhysicalMaterial({ color: 0x000000 });
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
	const boxMaterial = new THREE.MeshPhysicalMaterial({ color });
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
