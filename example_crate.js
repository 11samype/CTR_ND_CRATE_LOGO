// revolutions per second
var angularSpeed = 0.15; 
var lastTime = 0;
var startTime = 0;

// this function is executed on each animation frame
function animate(){
	// update
	var time = (new Date()).getTime();
	var timeDiff = time - lastTime;

	if(lastTime == 0) {
		startTime = time;
	}
	lastTime = time;

	var angleChange = angularSpeed * timeDiff * 2 * Math.PI / 1000;
	cubeAndData.rotation.y += angleChange;

	// render
	renderer.render(scene, camera);

	// request new frame
	requestAnimationFrame(function(){
		animate();
	});
}

// renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// camera
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
camera.position.z = 500;
//camera.position.z = 1100;

// scene
var scene = new THREE.Scene();

// texture
var crate = new THREE.MeshLambertMaterial({
	map: THREE.ImageUtils.loadTexture('textures/nd_crate.png')
});

var crate_flap = new THREE.MeshLambertMaterial({
	map: THREE.ImageUtils.loadTexture('textures/nd_crate_flap.png')
});

var cyl = new THREE.MeshLambertMaterial({
	map: THREE.ImageUtils.loadTexture('textures/10.png'),
	transparent: true,
	opacity: 1
});

// cube, data, light
var cubeAndData = new THREE.Object3D();

// cube
var cubeObject = new THREE.Object3D();

var cube = new THREE.Mesh(new THREE.CubeGeometry(200, 200, 200), crate);
cube.overdraw = true;

//cubeObject.add(cube);
//cubeObject.rotation.x = Math.PI * 0.1;

// cube walls

var cubeWall1 = new THREE.Mesh(new THREE.CubeGeometry(200, 200, 1), crate);
cubeWall1.overdraw = true;

cubeWall1.translateZ(100);

cubeObject.add(cubeWall1);

var cubeWall2 = new THREE.Mesh(new THREE.CubeGeometry(200, 200, 1), crate);
cubeWall2.overdraw = true;

cubeWall2.translateZ(-100);

cubeObject.add(cubeWall2);

var cubeWall3 = new THREE.Mesh(new THREE.CubeGeometry(200, 200, 1), crate);
cubeWall3.overdraw = true;
cubeWall3.rotation.y += Math.PI/2;
cubeWall3.translateZ(100);

cubeObject.add(cubeWall3);

var cubeWall4 = new THREE.Mesh(new THREE.CubeGeometry(200, 200, 1), crate);
cubeWall4.overdraw = true;
cubeWall4.rotation.y += Math.PI/2;
cubeWall4.translateZ(-100);

cubeObject.add(cubeWall4);

// box flaps
var flapObject1 = new THREE.Object3D();

var flap1 = new THREE.Mesh(new THREE.CubeGeometry(100, 200, 1), crate_flap);
flap1.overdraw = true;
flap1.applyMatrix( new THREE.Matrix4().makeTranslation( 50, 0, 0 ));

flapObject1.add(flap1);

flapObject1.translateX(100);
flapObject1.translateY(100);

flapObject1.rotation.x += Math.PI/2;
flapObject1.rotation.y -= Math.PI/4;

cubeObject.add(flapObject1);

var flapObject2 = new THREE.Object3D();

var flap2 = new THREE.Mesh(new THREE.CubeGeometry(100, 200, 1), crate_flap);
flap2.overdraw = true;
flap2.applyMatrix( new THREE.Matrix4().makeTranslation( 50, 0, 0 ));

flapObject2.add(flap2);
flapObject2.translateX(-100);
flapObject2.translateY(100);
flapObject2.rotation.x += Math.PI/2;
flapObject2.rotation.y += 5*Math.PI/4;

cubeObject.add(flapObject2);

var flapObject3 = new THREE.Object3D();

var flap3 = new THREE.Mesh(new THREE.CubeGeometry(100, 200, 1), crate_flap);
flap3.overdraw = true;
flap3.applyMatrix( new THREE.Matrix4().makeTranslation( 50, 0, 0 ));

flapObject3.add(flap3);
flapObject3.translateY(100);
flapObject3.translateZ(100);
flapObject3.rotation.x += 3*Math.PI/4;
flapObject3.rotation.z += Math.PI/2;

cubeObject.add(flapObject3);

var flapObject4 = new THREE.Object3D();

var flap4 = new THREE.Mesh(new THREE.CubeGeometry(100, 200, 1), crate_flap);
flap4.overdraw = true;
flap4.applyMatrix( new THREE.Matrix4().makeTranslation( 50, 0, 0 ));

flapObject4.add(flap4);
flapObject4.translateY(100);
flapObject4.translateZ(-100);
flapObject4.rotation.x += 5*Math.PI/4;
flapObject4.rotation.z += Math.PI/2;

cubeObject.add(flapObject4);

cubeAndData.add(cubeObject);

cubeAndData.rotation.x = Math.PI * 0.1;

// cylinder
var cylinder = new THREE.Mesh(new THREE.CylinderGeometry(150, 75, 300, 32, 1, true), cyl);
cylinder.overdraw = true;
cylinder.position.y += 200;
//cylinder.rotation.x = 1;
cubeAndData.add(cylinder);
scene.add(cubeAndData);

// add subtle ambient lighting
var ambientLight = new THREE.AmbientLight(0xbbbbbb);
scene.add(ambientLight);

// directional lighting
var directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

// point lighting

//var pointlight = new THREE.PointLight( 0xffffff, 1, 100);
//pointlight.position.set( 0, 100, 0);
//scene.add(pointlight);

// spotlight

var spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 0, 100, 0 );

spotLight.castShadow = true;

spotLight.shadowMapWidth = 1024;
spotLight.shadowMapHeight = 1024;

spotLight.shadowCameraNear = 500;
spotLight.shadowCameraFar = 4000;
spotLight.shadowCameraFov = 30;

spotLight.target.position.set(0, 500, 0);

scene.add( spotLight );

// start animation
animate();