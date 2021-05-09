import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RGBAFormat, RGB_S3TC_DXT1_Format, Vector4 } from 'three'
import HelvetikerFont from 'three/examples/fonts/helvetiker_regular.typeface.json';



// Loading
// Texture Loading
// const textureLoader = new THREE.TextureLoader()
// const normalTexture = textureLoader.load('/textures/NormalMap1.jpeg')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const loader = new THREE.FontLoader();


// Object

//GLTF Loader
const gltfLoader = new GLTFLoader()
var ecircle = new THREE.Object3D;
var eobject = new THREE.Object3D;

// const shaderMat = new THREE.ShaderMaterial({
//     uniforms: {}
//     vertexShader: _VS
//     fragmentShader: _FS
// })



gltfLoader.load(
    'static/models/E.glb',
    
  (gltf) => 
  {

ecircle = gltf.scene.children[0]
ecircle.material.wireframe = false
eobject = gltf.scene.children[1]
eobject.position.x = 0
ecircle.position.x = 0


//finished loop, add to scene
scene.add(ecircle, eobject)  
console.log(eobject)

})

const geometry = new THREE.TorusGeometry(.7, .2, 16, 100);

// Create Particles
const particlesGeometry = new THREE.BufferGeometry;
const particlesCnt = 600;

const posArray = new Float32Array(particlesCnt * 3);

for(let i = 0; i < particlesCnt * 3; i++) {

    posArray[i] = (Math.random() - 0.5) * (Math.random() * 5)
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

// Materials


// torus mat
const material = new THREE.MeshBasicMaterial()

// particles mat
const material1 = new THREE.PointsMaterial ( {
    size: 0.003,
    color: "white"

    })


// Mesh
const sphere = new THREE.Points(geometry,material)
const particlesMesh = new THREE.Points(particlesGeometry, material1)
scene.add(particlesMesh)

// Lights
//LIGHT 1
const pointLight = new THREE.PointLight(0xffffff, 2)
pointLight.position.x = -2.51
pointLight.position.y = 0
pointLight.position.z = -1.38
pointLight.intensity = 3
scene.add(pointLight)

// const pointLightHelpter = new THREE.PointLightHelper(pointLight,1)
// scene.add(pointLightHelpter)

const light1 = gui.addFolder('Light 1')
light1.add(pointLight.position, 'y').min(-3).max(3).step(0.01)
light1.add(pointLight.position, 'x').min(-6).max(6).step(0.01)
light1.add(pointLight.position, 'z').min(-3).max(3).step(0.01)
light1.add(pointLight, 'intensity').min(0).max(10).step(0.01)


//LIGHT 2
const pointLight2 = new THREE.PointLight(0xc0830a, 2)
pointLight2.position.x = 1.73
pointLight2.position.y = 0.2
pointLight2.position.z = -1.25
pointLight2.intensity = 1.2
scene.add(pointLight2)

// const pointLightHelpter2 = new THREE.PointLightHelper(pointLight2,1)
// scene.add(pointLightHelpter2)

const light2 = gui.addFolder('Light 2')
light2.add(pointLight2.position, 'y').min(-3).max(3).step(0.01)
light2.add(pointLight2.position, 'x').min(-6).max(6).step(0.01)
light2.add(pointLight2.position, 'z').min(-3).max(3).step(0.01)
light2.add(pointLight2, 'intensity').min(0).max(10).step(0.01)

const light2Color = {
    color: 0xff0000

}

light2.addColor(light2Color, 'color')
    .onChange(() => {
        pointLight2.color.set(light2Color.color)
    })

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)





// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(new THREE.Color('#21282a'), 1)


/**
 * Animate
 */

document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
    mouseX = event.clientX 
    mouseY = event.clientY
}

const updateSphere = (event) => {

    sphere.position.y = window.scrollY * .001
    eobject.position.y = window.scrollY * .001
    ecircle.position.y = window.scrollY * .001


}

window.addEventListener('scroll', updateSphere);



const clock = new THREE.Clock()

const tick = () =>
{

    targetX = mouseX * .001
    targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime
    // eobject.rotation.y = .5 * elapsedTime
    ecircle.rotation.y = .5 * elapsedTime
    

    // sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    // sphere.rotation.x += .05 * (targetY - sphere.rotation.x)
    // sphere.position.z += -.09 * (targetY - sphere.rotation.x)

   

    //OLD CODE
    eobject.rotation.x += .20 * (targetY - eobject.rotation.x + 20)
    eobject.rotation.y += .5 * (targetX - eobject.rotation.y)


    ecircle.rotation.y += .05 * (targetX - ecircle.rotation.y)
    ecircle.rotation.x += .05 * (targetY - ecircle.rotation.x)

    particlesMesh.rotation.y = -.1 * elapsedTime

    
    if(mouseX > 0) {
        particlesMesh.rotation.x = -mouseY * (elapsedTime *0.0001)
        particlesMesh.rotation.y = -mouseX * (elapsedTime *0.0001)

    }
   




    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()