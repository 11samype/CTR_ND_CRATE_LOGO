// revolutions per second

var flap1close = true;
var crateFlyOut = false;

// this function is executed on each animation frame
function animate(){
	// update

	upsideDownCube.rotation.y += .1;
	
	// flap animations
	
	if ((flapObject1.rotation.y < Math.PI) && flap1close) {
		flapObject1.rotation.y += .01;
		flapObject2.rotation.y -= .01;
		flapObject3.rotation.x -= .01;
		flapObject4.rotation.x += .01;
		
		cubeAndData.rotation.y += .02;
		
		camera.position.z -= 2.18;
		camera.position.y += .02;
		cubeAndData.rotation.x -= 0.0008;

	} else if((flapObject1.rotation.y < -Math.PI/4) && !flap1close) {
		//flap1close = true;
	} else {
		if (flap1close) {
			scene.remove(cubeAndData);
			scene.add(cube);
		}
		
		flap1close = false;

		if (!crateFlyOut) {
			camera.position.z += 2.18;
			camera.position.y -= .5;
		}

	}
	
	if (!flap1close && !crateFlyOut) {
		
		cube.rotation.x += .04;
		cube.rotation.y += .04;
		
		if (camera.position.z > 1100) {
			crateFlyOut = true;
			scene.remove(cube);
			scene.add(upsideDownCube);
			scene.add(crashcart);
		}
	}
	
	if (crateFlyOut) {
		upsideDownCube.position.y += 5;
		crashcart.position.y -= 3;
		crashcart.position.z += 9;
		
		wheel1.rotation.y += 0.02;
		wheel2.rotation.y += 0.02;
		wheel3.rotation.y += 0.02;
		wheel4.rotation.y += 0.02;
		
		if (crashcart.position.z > camera.position.z) {
			//reset
			scene.remove(crashcart);
			scene.remove(upsideDownCube);
			
			camera.position.x = 0;
			camera.position.y = 0;
			camera.position.z = 1100;
			
			cube.position.x = 0;
			cube.position.y = 0;
			cube.position.z = 0;
			
			cubeAndData.position.x = 0;
			cubeAndData.position.y = 0;
			cubeAndData.position.z = 0;
			
			flapObject1.rotation.y = -Math.PI/4;
			flapObject2.rotation.y = 5*Math.PI/4;
			flapObject3.rotation.x = 3*Math.PI/4;
			flapObject4.rotation.x = 5*Math.PI/4;
			
			cubeAndData.rotation.x = Math.PI * 0.1;
			
			upsideDownCube.position.x = 0;
			upsideDownCube.position.y = 0;
			upsideDownCube.position.z = 0;
			
			crashcart.position.x = 0;
			crashcart.position.y = 0;
			crashcart.position.z = 0;
			
			crateFlyOut = false;
			flap1close = true;
			
			scene.add(cubeAndData);
		}
	}
	
	renderer.autoClear = false;
	renderer.clear();
	renderer.render(bgScene, bgCam);
	
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
camera.position.z = 1100;

// scene
var scene = new THREE.Scene();

// texture
var crate = new THREE.MeshLambertMaterial({
	map: THREE.ImageUtils.loadTexture('nd_crate.png')
});

var crate_flap = new THREE.MeshLambertMaterial({
	map: THREE.ImageUtils.loadTexture('nd_crate_flap.png')
});

var cyl = new THREE.MeshLambertMaterial({
	map: THREE.ImageUtils.loadTexture('10.png'),
	transparent: true,
	opacity: 1
});

var wheel = new THREE.MeshLambertMaterial({
	map: THREE.ImageUtils.loadTexture('962d64562c84.jpg')
});

var cart = new THREE.MeshLambertMaterial({
	map: THREE.ImageUtils.loadTexture('bluemetal1.jpg')
});

var crashbodycolor = new THREE.MeshLambertMaterial({
	map: THREE.ImageUtils.loadTexture('orangefur.jpg')
});

var crashnosecolor = new THREE.MeshBasicMaterial({
	color: 'black'
});

var light = new THREE.MeshBasicMaterial({
	color: 'white'
});

// cube, data, light
var cubeAndData = new THREE.Object3D();

// cube
var cubeObject = new THREE.Object3D();

var cube = new THREE.Mesh(new THREE.BoxGeometry(200, 200, 200), crate);
cube.overdraw = true;

// cube walls

var cubeWall1 = new THREE.Mesh(new THREE.BoxGeometry(200, 200, 1), crate);
cubeWall1.overdraw = true;

cubeWall1.translateZ(100);

cubeObject.add(cubeWall1);

var innerWall1 = new THREE.Mesh(new THREE.PlaneBufferGeometry(200, 200), light);
innerWall1.overdraw = true;

innerWall1.translateY(100);
innerWall1.rotation.x += 3*Math.PI/2;

cubeObject.add(innerWall1);

var cubeWall2 = new THREE.Mesh(new THREE.BoxGeometry(200, 200, 1), crate);
cubeWall2.overdraw = true;

cubeWall2.translateZ(-100);

cubeObject.add(cubeWall2);

var cubeWall3 = new THREE.Mesh(new THREE.BoxGeometry(200, 200, 1), crate);
cubeWall3.overdraw = true;
cubeWall3.rotation.y += Math.PI/2;
cubeWall3.translateZ(100);

cubeObject.add(cubeWall3);

var cubeWall4 = new THREE.Mesh(new THREE.BoxGeometry(200, 200, 1), crate);
cubeWall4.overdraw = true;
cubeWall4.rotation.y += Math.PI/2;
cubeWall4.translateZ(-100);

cubeObject.add(cubeWall4);

// box flaps
var flapObject1 = new THREE.Object3D();

var flap1 = new THREE.Mesh(new THREE.BoxGeometry(100, 200, 1), crate_flap);
flap1.overdraw = true;
flap1.applyMatrix( new THREE.Matrix4().makeTranslation( 50, 0, 0 ));

flapObject1.add(flap1);

flapObject1.translateX(100);
flapObject1.translateY(100);

flapObject1.rotation.x = Math.PI/2;
flapObject1.rotation.y = Math.PI/4;

cubeObject.add(flapObject1);

var flapObject2 = new THREE.Object3D();

var flap2 = new THREE.Mesh(new THREE.BoxGeometry(100, 200, 1), crate_flap);
flap2.overdraw = true;
flap2.applyMatrix( new THREE.Matrix4().makeTranslation( 50, 0, 0 ));

flapObject2.add(flap2);
flapObject2.translateX(-100);
flapObject2.translateY(100);
flapObject2.rotation.x = Math.PI/2;
flapObject2.rotation.y = 3*Math.PI/4;

cubeObject.add(flapObject2);

var flapObject3 = new THREE.Object3D();

var flap3 = new THREE.Mesh(new THREE.BoxGeometry(100, 200, 1), crate_flap);
flap3.overdraw = true;
flap3.applyMatrix( new THREE.Matrix4().makeTranslation( 50, 0, 0 ));

flapObject3.add(flap3);
flapObject3.translateY(100);
flapObject3.translateZ(100);
flapObject3.rotation.x = Math.PI/4;
flapObject3.rotation.z = Math.PI/2;

cubeObject.add(flapObject3);

var flapObject4 = new THREE.Object3D();

var flap4 = new THREE.Mesh(new THREE.BoxGeometry(100, 200, 1), crate_flap);
flap4.overdraw = true;
flap4.applyMatrix( new THREE.Matrix4().makeTranslation( 50, 0, 0 ));

flapObject4.add(flap4);
flapObject4.translateY(100);
flapObject4.translateZ(-100);
flapObject4.rotation.x = 7*Math.PI/4;
flapObject4.rotation.z = Math.PI/2;

cubeObject.add(flapObject4);

cubeAndData.add(cubeObject);

cubeAndData.rotation.x = Math.PI * 0.1;

var upsideDownCube = cubeObject.clone();

// bend flaps for original cube
flapObject1.rotation.y = -Math.PI/4;
flapObject2.rotation.y = 5*Math.PI/4;
flapObject3.rotation.x = 3*Math.PI/4;
flapObject4.rotation.x = 5*Math.PI/4;

upsideDownCube.rotation.x += Math.PI;

// cylinder
var cylinder = new THREE.Mesh(new THREE.CylinderGeometry(150, 75, 300, 32, 1, true), cyl);
cylinder.overdraw = true;
cylinder.position.y += 200;
cubeAndData.add(cylinder);
scene.add(cubeAndData);

var crashcart = new THREE.Object3D();

var wheel1 = new THREE.Mesh(new THREE.CylinderGeometry(25, 25, 25, 16, 1, false), wheel);
wheel1.overdraw = true;
wheel1.position.y += 35;
wheel1.position.x += 50;
crashcart.add(wheel1);

var wheel2 = new THREE.Mesh(new THREE.CylinderGeometry(25, 25, 25, 16, 1, false), wheel);
wheel2.overdraw = true;
wheel2.position.y += 35;
wheel2.position.x -= 50;
crashcart.add(wheel2);

var wheel3 = new THREE.Mesh(new THREE.CylinderGeometry(25, 25, 25, 16, 1, false), wheel);
wheel3.overdraw = true;
wheel3.position.y -= 35;
wheel3.position.x += 50;
crashcart.add(wheel3);

var wheel4 = new THREE.Mesh(new THREE.CylinderGeometry(25, 25, 25, 16, 1, false), wheel);
wheel4.overdraw = true;
wheel4.position.y -= 35;
wheel4.position.x -= 50;
crashcart.add(wheel4);

var cartbase = new THREE.Mesh(new THREE.BoxGeometry(100, 75, 15), cart);
cartbase.overdraw = true;
crashcart.add(cartbase);

var crash = new THREE.Object3D();

var body = new THREE.Mesh(new THREE.CylinderGeometry(5, 25, 75, 16, 1, false), crashbodycolor);
body.overdraw = true;
body.rotation.x += Math.PI/2;
body.position.z += 75/2;

crash.add(body);

var head = new THREE.Mesh(new THREE.SphereGeometry(20), crashbodycolor);
head.overdraw = true;
head.position.z += 75;

crash.add(head);

var snout = new THREE.Mesh(new THREE.CylinderGeometry(2, 15, 30, 16, 1, false), crashbodycolor);
snout.overdraw = true;

snout.position.z += 75;
snout.position.x += 20;
snout.rotation.z -= Math.PI/2;
snout.rotation.x -= Math.PI; // hide seam

crash.add(snout);

var nose = new THREE.Mesh(new THREE.SphereGeometry(5), crashnosecolor);
nose.overdraw = true;

nose.position.z += 75;
nose.position.x += 40;

crash.add(nose);

crashcart.add(crash);

crashcart.rotation.x = -Math.PI/4;
crashcart.rotation.z = -Math.PI/2;

// add subtle ambient lighting
var ambientLight = new THREE.AmbientLight(0xbbbbbb);
scene.add(ambientLight);

// directional lighting
var directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

// make background
var bg = new THREE.Mesh(
	new THREE.PlaneBufferGeometry(2, 2, 0),
	new THREE.MeshBasicMaterial({map:THREE.ImageUtils.loadTexture('space-5.jpg')})
);

// The bg plane shouldn't care about the z-buffer.
bg.material.depthTest = false;
bg.material.depthWrite = false;

var bgScene = new THREE.Scene();
var bgCam = new THREE.Camera();
bgScene.add(bgCam);
bgScene.add(bg);

// start animation
animate();