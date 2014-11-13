// revolutions per second

var flap1close = true;
var flap2close = true;
var flap3close = true;
var flap4close = true;
var crateFlyOut = false;

// this function is executed on each animation frame
function animate(){
	// update

	//cubeAndData.rotation.y += .01;
	//crashcart.rotation.x += .03;

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
		/*
		flapObject1.rotation.y -= .01;
		flapObject2.rotation.y += .01;
		flapObject3.rotation.x += .01;
		flapObject4.rotation.x -= .01;
		
		cubeAndData.rotation.y -= .02;
		
		cubeAndData.rotation.x += 0.0008;
		*/
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
			
			crateFlyOut = false;
			flap1close = true;
			
			scene.add(cubeAndData);
		}
	}

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
//camera.position.z = 500;
camera.position.z = 1100;

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

var wheel = new THREE.MeshLambertMaterial({
	map: THREE.ImageUtils.loadTexture('textures/962d64562c84.jpg')
});

var cart = new THREE.MeshLambertMaterial({
	map: THREE.ImageUtils.loadTexture('textures/bluemetal1.jpg')
});

var crashbodycolor = new THREE.MeshLambertMaterial({
	color: 'orange'
});

// cube, data, light
var cubeAndData = new THREE.Object3D();

// cube
var cubeObject = new THREE.Object3D();

var cube = new THREE.Mesh(new THREE.CubeGeometry(200, 200, 200), crate);
cube.overdraw = true;
//cube.position.x -= 200;

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

flapObject1.rotation.x = Math.PI/2;
flapObject1.rotation.y = Math.PI/4;

cubeObject.add(flapObject1);

var flapObject2 = new THREE.Object3D();

var flap2 = new THREE.Mesh(new THREE.CubeGeometry(100, 200, 1), crate_flap);
flap2.overdraw = true;
flap2.applyMatrix( new THREE.Matrix4().makeTranslation( 50, 0, 0 ));

flapObject2.add(flap2);
flapObject2.translateX(-100);
flapObject2.translateY(100);
flapObject2.rotation.x = Math.PI/2;
flapObject2.rotation.y = 3*Math.PI/4;

cubeObject.add(flapObject2);

var flapObject3 = new THREE.Object3D();

var flap3 = new THREE.Mesh(new THREE.CubeGeometry(100, 200, 1), crate_flap);
flap3.overdraw = true;
flap3.applyMatrix( new THREE.Matrix4().makeTranslation( 50, 0, 0 ));

flapObject3.add(flap3);
flapObject3.translateY(100);
flapObject3.translateZ(100);
flapObject3.rotation.x = Math.PI/4;
flapObject3.rotation.z = Math.PI/2;

cubeObject.add(flapObject3);

var flapObject4 = new THREE.Object3D();

var flap4 = new THREE.Mesh(new THREE.CubeGeometry(100, 200, 1), crate_flap);
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

//upsideDownCube.position.x += 200;
upsideDownCube.rotation.x += Math.PI;

//scene.add(upsideDownCube);

// cylinder
var cylinder = new THREE.Mesh(new THREE.CylinderGeometry(150, 75, 300, 32, 1, true), cyl);
cylinder.overdraw = true;
cylinder.position.y += 200;
//cylinder.rotation.x = 1;
cubeAndData.add(cylinder);
scene.add(cubeAndData);

var crashcart = new THREE.Object3D();

var wheel1 = new THREE.Mesh(new THREE.CylinderGeometry(25, 25, 25, 16, 1, false), wheel);
wheel1.overdraw = true;
wheel1.position.y += 35;
wheel1.position.x += 50;
//wheel1.position.y += 300;
//wheel1.rotation.z += Math.PI/2;
crashcart.add(wheel1);

var wheel2 = new THREE.Mesh(new THREE.CylinderGeometry(25, 25, 25, 16, 1, false), wheel);
wheel2.overdraw = true;
wheel2.position.y += 35;
wheel2.position.x -= 50;
//wheel2.position.y += 250;
//wheel2.rotation.z += Math.PI/2;
crashcart.add(wheel2);

var wheel3 = new THREE.Mesh(new THREE.CylinderGeometry(25, 25, 25, 16, 1, false), wheel);
wheel3.overdraw = true;
wheel3.position.y -= 35;
wheel3.position.x += 50;
//wheel3.position.y += 200;
//wheel3.rotation.z += Math.PI/2;
crashcart.add(wheel3);

var wheel4 = new THREE.Mesh(new THREE.CylinderGeometry(25, 25, 25, 16, 1, false), wheel);
wheel4.overdraw = true;
wheel4.position.y -= 35;
wheel4.position.x -= 50;
//wheel4.position.y += 150;
//wheel4.rotation.z += Math.PI/2;
crashcart.add(wheel4);

var cartbase = new THREE.Mesh(new THREE.CubeGeometry(100, 75, 15), cart);
cartbase.overdraw = true;
//cartbase.position.x += 200;
crashcart.add(cartbase);

var crash = new THREE.Object3D();

var body = new THREE.Mesh(new THREE.CylinderGeometry(10, 25, 75, 16, 1, false), crashbodycolor);
body.overdraw = true;
body.rotation.x += Math.PI/2;
body.position.z += 75/2;

crash.add(body);
/*
var head = new THREE.Mesh(new THREE.CircleGeometry(50, 16, 0, 2*Math.PI), crashbodycolor);
head.overdraw = true;
head.position.z += 100;

crash.add(head);
*/
//crash.position.x += 200;

crashcart.add(crash);

crashcart.rotation.x = -Math.PI/4;
crashcart.rotation.z = -Math.PI/2;
//crashcart.position.x += 200;

//scene.add(crashcart);


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