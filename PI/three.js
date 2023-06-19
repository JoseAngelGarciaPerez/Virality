import './style.css';

import * as THREE from 'three';

import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import { FlyControls } from './controladores/FlyControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DoubleSide } from 'three';

// ESCENA
const scene = new THREE.Scene();
// CÁMARA 
const camera = new THREE.PerspectiveCamera( 90, document.getElementById('div2').clientWidth / document.getElementById('div2').clientHeight, 1, 1000 );
// RENDERIZADOR
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#background'),
});

var width = document.getElementById('div2').clientWidth;
var height = document.getElementById('div2').clientHeight;

//Ratio y tamaño del render
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);
// Posicion de la camara
camera.position.setZ(40);
// Cabina de nave
// const cabinaTextura = new THREE.TextureLoader().load('./imagenes/cockpit.png');
// const cabinaMaterial = new THREE.SpriteMaterial({map: cabinaTextura}); 
// const cabina = new THREE.Sprite(cabinaMaterial);
// cabina.position.set(0,0,39.2);
// // cabina.quaternion.copy(camera.quaternion);
// scene.add(cabina);


// ***OBJETOS***

// Planeta
    //Textura y material
    const mundoTextura = new THREE.TextureLoader().load('./imagenes/mapamundi.png');
    //material(textura personalizada)
    const mapMaterial = new THREE.MeshBasicMaterial({map: mundoTextura, side: DoubleSide});

    //modelo 3d
    const planetaGeometria = new THREE.SphereGeometry( 15, 64, 64 );
    //material(color solido) 
    // const material = new THREE.MeshStandardMaterial( { color: 0xffff00 } ); 
    //objeto
    const planeta = new THREE.Mesh( planetaGeometria, mapMaterial );
    scene.add( planeta );

// Luna
    //Textura y material
    const lunaTextura = new THREE.TextureLoader().load('./imagenes/luna.jpg');
    //material(textura personalizada)
    const lunaMaterial = new THREE.MeshBasicMaterial({map: lunaTextura});
    //modelo 3d
    const lunaGeometria = new THREE.SphereGeometry( 3, 32, 32 );
    //objeto
    const luna = new THREE.Mesh( lunaGeometria, lunaMaterial );
    luna.position.set(15 ,15, 15)
    //Orbita lunar
    const lunaOrbita = new THREE.Object3D();
    lunaOrbita.add( luna );
    scene.add( lunaOrbita );

// Nubes
const nubesTextura = new THREE.TextureLoader().load('./imagenes/nubes.png');
const nubesMaterial = new THREE.MeshLambertMaterial({map:nubesTextura, transparent:true})

const nubes = new THREE.Mesh( planetaGeometria, nubesMaterial );
nubes.scale.set( 1.05, 1.05, 1.05 );
scene.add( nubes );

// La verdad (Easter Egg)
const verdadTextura = new THREE.TextureLoader().load('./imagenes/laVerdad.png');
const verdadMaterial = new THREE.SpriteMaterial({map: verdadTextura}); 
const laVerdad = new THREE.Sprite(verdadMaterial);
laVerdad.scale.set(5,5,5);
scene.add(laVerdad);

//Planeta con anillos
    //Textura y material
    const p2Textura = new THREE.TextureLoader().load('./imagenes/planeta2.jpg');
    //material(textura personalizada)
    const p2Material = new THREE.MeshBasicMaterial({map: p2Textura});
    //modelo 3d
    const planeta2Geometria = new THREE.SphereGeometry( 20, 64, 64 );
    //material(color solido) 
    // const material = new THREE.MeshStandardMaterial( { color: 0xffff00 } ); 
    //objeto
    const planeta2 = new THREE.Mesh( planeta2Geometria, p2Material );
    planeta2.position.set(200, 150, 320);
    scene.add( planeta2 );
    
    const anillosTextura = new THREE.TextureLoader().load('./imagenes/anillos.png');
    const anillosMaterial = new THREE.MeshBasicMaterial({map: anillosTextura, side: THREE.DoubleSide});

    const anillosGeometria = new THREE.RingGeometry(22,30,64);
    const anillos = new THREE.Mesh(anillosGeometria, anillosMaterial);
    anillos.position.set(200, 150, 320);
    anillos.rotation.x = 1;
    scene.add(anillos);


// Gigante gaseoso
    //Textura y material
    const gasTextura = new THREE.TextureLoader().load('./imagenes/gas.jpg');
    //material(textura personalizada)
    const gasMaterial = new THREE.MeshBasicMaterial({map: gasTextura, side: DoubleSide});

    //modelo 3d
    const gasGeometria = new THREE.SphereGeometry( 100, 64, 64 );
    //material(color solido) 
    // const material = new THREE.MeshStandardMaterial( { color: 0xffff00 } ); 
    //objeto
    const gas = new THREE.Mesh( gasGeometria, gasMaterial );
    gas.position.set(-300, -100, -100);
    scene.add( gas );

// Nucleo de Adventure
let nucleo;
const nucleoOrbita = new THREE.Object3D();
const loader = new GLTFLoader();

loader.load( './modelos3d/adventure_core/scene.gltf', function ( gltf ) {
    nucleo = gltf.scene;
    nucleo.scale.set(0.001,0.001,0.001);
    nucleo.position.set(0,0,-200);
    nucleo.rotation.y = 1.5;
    nucleoOrbita.add(nucleo);
    scene.add( nucleoOrbita );

}, undefined, function ( error ) {

	console.error( error );

} );

// Satélite
let satelite;
let sateliteOrbita = new THREE.Object3D();
loader.load( './modelos3d/satellite/scene.gltf', function ( gltf ) {
    satelite = gltf.scene;
    satelite.scale.set(1,1,1);
    satelite.position.set(50,0,0);
    sateliteOrbita.add(satelite);
    scene.add( sateliteOrbita );

}, undefined, function ( error ) {

	console.error( error );

} );

//Luz ambiente
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

//Controles de camara
const controls = new FlyControls(camera, renderer.domElement);
controls.movementSpeed = 1;
//Desactivar los controles del ratón
controls.mouseButtons = {
	LEFT: '',
	MIDDLE: '',
	RIGHT: ''
}

//Fondo
const spaceTexture = new THREE.TextureLoader().load('./imagenes/espacio1.png');
scene.background = spaceTexture;

//Función que añade 'estrellas'
function añadirEstrella()
{
    const geometry = new THREE.OctahedronGeometry(0.25,0);
    const material = new THREE.MeshStandardMaterial({color: 0xffffff});
    const estrella = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(1000));

    estrella.position.set(x, y, z);
    scene.add(estrella);
}
//Relleno de la escena con x estrellas
Array(2000).fill().forEach(añadirEstrella);

//Función de animación
function animate() {
    requestAnimationFrame(animate);

    //Tierra
    planeta.rotation.y += 0.001;

    //Nubes
    nubes.rotation.y += 0.004;

    //Planeta con anillos
    planeta2.rotation.y += 0.005;
    anillos.rotation.z -= 0.001;

    //Luna
    lunaOrbita.rotation.y += 0.01;
    luna.rotation.y += 0.005;

    //Planeta gaseoso
    gas.rotation.y += 0.005;

    //Nucleo adventure
    nucleoOrbita.rotation.y += 0.000005;

    //Satelite
    satelite.rotation.z += 0.000000005;
    sateliteOrbita.rotation.x += 0.00005;

    //Actualización de la camara
    controls.update(1);

    renderer.render(scene, camera);
}

//Reescalado de pantalla
function onWindowResize()
{
    camera.aspect = document.getElementById('div2').clientWidth / document.getElementById('div2').clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(document.getElementById('div2').clientWidth, document.getElementById('div2').clientHeight);
}
window.addEventListener('resize', onWindowResize, false);

animate();