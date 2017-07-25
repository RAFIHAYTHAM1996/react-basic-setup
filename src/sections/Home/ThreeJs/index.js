import React, {Component} from 'react';
var THREE = require('three');
// import OBJLoader from 'OBJLoader';

class ThreeJsModel extends Component{

	constructor(props) {
    super(props);
  }

  componentDidMount(){

		const FRAMES_TO_DELAY = 120, SPHERE_MIN_SIZE = 1, SPHERE_MAX_SIZE = 1.15, SPHERE_ANIM_SPEED = (SPHERE_MAX_SIZE - SPHERE_MIN_SIZE)/60,
					CAMERA_MAX_X_POS = 125, CAMERA_MAX_Y_ROTATION = 0.1, Z_POS = - window.innerWidth * 0.6;

		var mousePrevX = 0, mouseX = 0, mouseY = 0,
			windowHalfX = window.innerWidth / 2,
			windowHalfY = window.innerHeight / 2,
			camera, renderer, scene,
			raycaster, intersection, threshold = 0.1,
			meshesGroups, meshesArray = [], delay = 0,
			icosphereMesh,
			sphereScalingUp = true, sphereXRotationSpeed = 0.08, sphereYRotationSpeed = 0.08;
		var mouse = new THREE.Vector2(),
				canvas = document.getElementById("homeCanvas");

		init();
		animate();

		function init(){
			renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
	  	//renderer.setClearColor(0xff5555);
	    renderer.setPixelRatio(window.devicePixelRatio);
	    renderer.setSize(window.innerWidth, window.innerHeight);

	    camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000);
			camera.position.set(0, 0, 0);
			camera.rotation.set(0, 0, 0);

	    scene = new THREE.Scene();

			var ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
			scene.add(ambientLight);

			var pointLight = new THREE.PointLight(0xFFAAAA, 2, 4000, 2);
			pointLight.position.z = 0;
			scene.add(pointLight);

			raycaster = new THREE.Raycaster();
			raycaster.params.Points.threshold = threshold;

			//Sphere
			meshesGroups = new THREE.Group();
			meshesGroups.position.set(window.innerWidth / 25, 0, Z_POS / 2);

			var segments = 10,
				angle = 360 / segments,
				radius = 25,
				random = 1;

			for(var k = 0; k < 3; k++){
				var meshesGroup = new THREE.Group();
				meshesGroup.castShadow = true;
				meshesGroup.rotation.y = k * (360 / 4);

				//Little spheres around path
				for(var i = 0; i <= segments; i++){

					random = Math.random() * (2 - 1) + 1;

					var geometry = new THREE.SphereGeometry(canvas.width * 0.0005 * random, canvas.width * 0.01, 50);
					var material = new THREE.MeshLambertMaterial({color: 0x000000, transparent: true, opacity: i * 20 / 255}); //OG Color: 0xFF2244
					var mesh = new THREE.Mesh(geometry, material);
					mesh.castShadow = true;

					// x = offsetOnAxis + Radius * sin(angle)
					// y = offsetOnAxis + Radius * cos(angle)
					mesh.position.set((radius * Math.cos(angle * i)), (radius * Math.sin(angle * i)), 0);
					meshesGroup.add(mesh);
					meshesArray.push(mesh);

					var x = (radius * Math.cos(angle * i)),
							y = (radius * Math.sin(angle * i)),
							z = 0;

					var geometry = new THREE.BufferGeometry();
					var vertices = new Float32Array( [
							 x,  y,  z,
							 0,  0,  0,
						 	 0,  0.5,  0,

							 x,  y,  z,
							 0,  0,  0,
						 	 0,  -0.5,  0
					] );

					geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3) );
					var lineMesh = new THREE.Mesh( geometry, material );
					meshesGroup.add(lineMesh);

				}
				meshesGroups.add(meshesGroup);
			}
			meshesGroups.castShadow = true;
			scene.add(meshesGroups);

			//Icosphere

			var icosphereMat = new THREE.MeshPhongMaterial({
			  color      :  new THREE.Color("rgba(150, 20, 20, 0.5)"),
			  emissive   :  new THREE.Color("rgba(100, 50, 50, 1)"),
			  specular   :  new THREE.Color("rgba(0, 0, 0, 0.5)"),
			  shininess  :  10,
			  shading    :  THREE.FlatShading,
			  transparent: 1,
			  opacity    : 1
			});
			icosphereMesh = new THREE.Mesh(new THREE.IcosahedronGeometry(window.innerWidth / 20, 1), icosphereMat);
			icosphereMesh.position.z = Z_POS * 1.25;
			icosphereMesh.castShadow = true;
			scene.add(icosphereMesh);
			meshesArray.push(icosphereMesh);

			//Main Image
			var texture = THREE.ImageUtils.loadTexture('./assets/images/portrait.jpg', undefined, function(tex){
				var aspectRatio = tex.image.width / tex.image.height;
				var material = new THREE.MeshLambertMaterial({ map: texture });
				var sphere = new THREE.Mesh(new THREE.PlaneGeometry(canvas.clientHeight * aspectRatio, canvas.clientHeight), material);

				var scaleMultiplier = tex.image.height / 5.345714285714286 / canvas.clientHeight;
				sphere.scale.set(scaleMultiplier, scaleMultiplier, 1);
				sphere.position.x = -(window.innerWidth/2 - (window.innerHeight * aspectRatio/2));
				sphere.position.z = Z_POS * 1.25;
				// scene.add(sphere);
			});

			//Box Background
			{
				let xSize = canvas.clientWidth,
						ySize = canvas.clientHeight,
						wallMaterial = new THREE.MeshStandardMaterial({color: 0xEEEEEE, roughness: 0, metalness: 0.5});

				var planeGeometry = new THREE.PlaneGeometry(xSize, ySize, 100);
				var planeMaterial = new THREE.MeshPhongMaterial({color: 0xFFFFFF});
				var planeMesh = new THREE.Mesh(planeGeometry, wallMaterial);
				planeMesh.position.z = Z_POS * 1.25;
				scene.add(planeMesh);

				var planeMeshLeft = new THREE.Mesh(planeGeometry, wallMaterial);
				planeMeshLeft.position.z = Z_POS;
				planeMeshLeft.position.x = - xSize / 4;
				planeMeshLeft.rotation.y = 90 * Math.PI / 180;
				scene.add(planeMeshLeft);

				var planeMeshRight = new THREE.Mesh(planeGeometry, wallMaterial);
				planeMeshRight.position.z = Z_POS;
				planeMeshRight.position.x = xSize / 4;
				planeMeshRight.rotation.y = -90 * Math.PI / 180;
				scene.add(planeMeshRight);

				var planeMeshTop = new THREE.Mesh(planeGeometry, wallMaterial);
				planeMeshTop.position.z = Z_POS;
				planeMeshTop.position.y = ySize / 4;
				planeMeshTop.rotation.x = 90 * Math.PI / 180;
				scene.add(planeMeshTop);

				var planeMeshBottom = new THREE.Mesh(planeGeometry, wallMaterial);
				planeMeshBottom.position.z = Z_POS;
				planeMeshBottom.position.y = - ySize / 4;
				planeMeshBottom.rotation.x = -90 * Math.PI / 180;
				scene.add(planeMeshBottom);
			}
		}

		document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		document.addEventListener( 'mouseleave', onDocumentMouseLeave, false );
		document.addEventListener( 'touchstart', onDocumentTouchStart, false );
		document.addEventListener( 'touchmove', onDocumentTouchMove, false );
		window.addEventListener( 'resize', onWindowResize, false );

		function onWindowResize() {
			windowHalfX = window.innerWidth / 2;
			windowHalfY = window.innerHeight / 2;
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize( window.innerWidth, window.innerHeight );
		}

		function onDocumentMouseMove(event) {
			mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

			if(delay === FRAMES_TO_DELAY/3 || delay > (FRAMES_TO_DELAY*0.5)){
				mousePrevX = mouseX;
				mouseX = event.clientX - windowHalfX;
				mouseY = event.clientY - windowHalfY;
				delay = Math.floor(FRAMES_TO_DELAY/3);
			}

			// camera.lookAt(new THREE.Vector3(event.clientX - windowHalfX, - (event.clientY - windowHalfY), Z_POS * 2.5));
		}

		function onDocumentMouseLeave(event){
		}

		function onDocumentTouchStart( event ) {
			if ( event.touches.length > 1 ) {
				event.preventDefault();
			}
			mouse.x = ( event.touches[0].clientX / window.innerWidth ) * 2 - 1;
			mouse.y = - ( event.touches[0].clientY / window.innerHeight ) * 2 + 1;

			if(delay === FRAMES_TO_DELAY/3 || delay > (FRAMES_TO_DELAY*0.5)){
				mousePrevX = mouseX;
				mouseX = event.touches[0].clientX - windowHalfX;
				mouseY = event.touches[0].clientY - windowHalfY;
				delay = Math.floor(FRAMES_TO_DELAY/3);
			}
		}
		function onDocumentTouchMove( event ) {
			if ( event.touches.length > 1 ) {
				event.preventDefault();
				mouse.x = ( event.touches[0].clientX / window.innerWidth ) * 2 - 1;
				mouse.y = - ( event.touches[0].clientY / window.innerHeight ) * 2 + 1;

				if(delay === FRAMES_TO_DELAY/3 || delay > (FRAMES_TO_DELAY*0.5)){
					mousePrevX = mouseX;
					mouseX = event.touches[0].clientX - windowHalfX;
					mouseY = event.touches[0].clientY - windowHalfY;
					delay = Math.floor(FRAMES_TO_DELAY/3);
				}
			}
		}

		function animate() {
			requestAnimationFrame( animate );
			render();
		}

		var toHex = this.toHex;

		function render() {

			raycaster.setFromCamera( mouse, camera );

			var intersections = raycaster.intersectObjects( meshesArray );
			intersection = ( intersections.length ) > 0 ? intersections[ 0 ] : null;
			if (intersection !== null) {
				switch (intersection.object) {
					case icosphereMesh: {
						intersection.object.rotation.y -= 0.05;
						break;
					}
					default:
						let color = intersection.object.material.color;
						if(color.r == 0){
							color.r += (Math.random(0.1) + 0.05);
							intersection.object.material.color.setHex(toHex(color));
						}
				}
			}

			if(sphereScalingUp && meshesGroups.scale.y < SPHERE_MAX_SIZE){
				meshesGroups.scale.set(meshesGroups.scale.x + SPHERE_ANIM_SPEED, meshesGroups.scale.y + SPHERE_ANIM_SPEED, meshesGroups.scale.z + SPHERE_ANIM_SPEED);
				// meshesGroups.rotation.y += 0.02;
			}
			else if(!sphereScalingUp && meshesGroups.scale.y > SPHERE_MIN_SIZE){
				meshesGroups.scale.set(meshesGroups.scale.x - SPHERE_ANIM_SPEED, meshesGroups.scale.y - SPHERE_ANIM_SPEED, meshesGroups.scale.z - SPHERE_ANIM_SPEED);
				// meshesGroups.rotation.y -= 0.02;
			}
			else{
				sphereScalingUp = !sphereScalingUp;
			}


			if(delay < FRAMES_TO_DELAY){
				delay++;
				var xExponentialSpeed = sphereXRotationSpeed * delay/FRAMES_TO_DELAY,
					  yExponentialSpeed = sphereYRotationSpeed * delay/FRAMES_TO_DELAY;

				if(mousePrevX < mouseX){
					// meshesGroups.rotation.x -= (0.08 - xExponentialSpeed);
					// meshesGroups.rotation.y -= (0.08 - yExponentialSpeed);
					// meshesGroups.rotation.z -= (0.08 - ((xExponentialSpeed + yExponentialSpeed) / 2));
				}
				else{
					// meshesGroups.rotation.x += (0.08 - xExponentialSpeed);
					// meshesGroups.rotation.y += (0.08 - yExponentialSpeed);
					// meshesGroups.rotation.z += (0.08 - ((xExponentialSpeed + yExponentialSpeed) / 2));
				}
			}
			// icosphereMesh.rotation.x -= mouseY / 10000;
			icosphereMesh.rotation.y += 0.01;

			if(mouseX > mousePrevX){
				//Camera Position
				if(camera.position.x < (mouse.x * CAMERA_MAX_X_POS)){
					camera.position.x += ((mouse.x * CAMERA_MAX_X_POS) - camera.position.x) / 20;
				}
				//Camera Rotation
				if(camera.rotation.y < (mouse.x * CAMERA_MAX_Y_ROTATION)){
					camera.rotation.y += ((mouse.x * CAMERA_MAX_Y_ROTATION) - camera.rotation.y) / 20;
				}
			} else if(mouseX < mousePrevX){
				//Camera Position
				if(camera.position.x > (mouse.x * CAMERA_MAX_X_POS)){
					camera.position.x -= ((mouse.x * -CAMERA_MAX_X_POS) + camera.position.x) / 20;
				}
				//Camera Rotation
				if(camera.rotation.y > (mouse.x * CAMERA_MAX_Y_ROTATION)){
					camera.rotation.y -= ((mouse.x * -CAMERA_MAX_Y_ROTATION) + camera.rotation.y) / 20;
				}
			}

			// camera.lookAt( scene.position );
			renderer.render( scene, camera );
		}

  }

	toHex(color){
		let result = -1, returnValue = "0x", array = [color.r * 255, color.g  * 255, color.b  * 255];

		array.forEach(function(colorElement){

			//First digit
			result = Math.floor(colorElement / 16);
			if(result >= 0 && result <= 9){
				returnValue = returnValue.concat(result);
			} else if(result === 10){
				returnValue = returnValue.concat("A");
			} else if(result === 11){
				returnValue = returnValue.concat("B");
			} else if(result == 12){
				returnValue = returnValue.concat("C");
			} else if(result == 13){
				returnValue = returnValue.concat("D");
			} else if(result == 14){
				returnValue = returnValue.concat("E");
			} else if(result == 15){
				returnValue = returnValue.concat("F");
			}

			//Second digit
			result = colorElement % 16;
			if(result >= 0 && result <= 9){
				returnValue = returnValue.concat(Math.floor(result));
			} else if(result === 10){
				returnValue = returnValue.concat("A");
			} else if(result === 11){
				returnValue = returnValue.concat("B");
			} else if(result == 12){
				returnValue = returnValue.concat("C");
			} else if(result == 13){
				returnValue = returnValue.concat("D");
			} else if(result == 14){
				returnValue = returnValue.concat("E");
			} else if(result == 15){
				returnValue = returnValue.concat("F");
			}
		})

		return returnValue;
	}

  componentDidUpdate(){
  }

	render(){
		return(
			<canvas id="homeCanvas"></canvas>
		);
	}
}
export default ThreeJsModel;
