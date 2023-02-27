
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { EventBridge } from './EventBridge';

//

export class WorldContainer {

    prevRenderTime = 0;

    constructor () {

        this.eventBridge = new EventBridge();

        this.init();

    };

    init () {

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.domElement.id = 'threejs';
        this.renderer.setClearColor( 0xff0000 );
        document.body.appendChild( this.renderer.domElement );

        this.camera = new THREE.PerspectiveCamera( 60, 1920/1080, 1, 1000 );
        this.camera.position.set( 5, 3, 5 );

        const controls = new OrbitControls( this.camera, this.renderer.domElement );
        controls.target.set( 0, 0, 0 );
        controls.update();

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 1.0, 1.0, 1.0 );

        const light = new THREE.AmbientLight( 0xFFFFFF, 1.0 );
        this.scene.add( light );

        const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

        const geometry = new THREE.BoxGeometry( 2, 2, 2 );
        const box = new THREE.Mesh( geometry, material );
        box.position.set( 0, 0, 0 );
        this.scene.add( box );
        this.box = box;

        //

        window.addEventListener( 'resize', this.onResize );

        this.eventBridge.addInEventListener( 'SetColor', this.updateBoxColor );

        //

        this.onResize();
        this.loop();

    };

    updateBoxColor = ( params ) => {

        this.box.material.color.set( params.color );

    };

    onResize = () => {

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight );

    };

    loop = ( time = 0 ) => {

        requestAnimationFrame( this.loop );

        this.prevRenderTime = this.prevRenderTime ?? time;
        const delta = time - this.prevRenderTime;

        this.eventBridge.processEvents();

        this.animate( delta );
        this.renderer.render( this.scene, this.camera );

        this.prevRenderTime = time;

    };

    animate ( timeElapsed ) {

        const timeElapsedS = timeElapsed * 0.001;

        this.box.rotation.x += timeElapsedS;
        this.box.rotation.z += 1.3 * timeElapsedS;

        this.eventBridge.pushOutEvent( 'UpdateFrame', { frame: this.renderer.info.render.frame } );

    };

};
