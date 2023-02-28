
import { WebGLRenderer, PerspectiveCamera, Scene, Color, AmbientLight, MeshBasicMaterial, BoxGeometry, Mesh, Clock, SpotLight, MeshPhongMaterial } from 'three';
import { OrbitControls } from 'three-stdlib';

import { RTEventBridge } from '../utils/RTEventBridge';

//

export class WorldContainer {

    private prevRenderTime: number = 0;
    private renderer: WebGLRenderer;
    private camera: PerspectiveCamera;
    private scene: Scene;
    private box: Mesh;
    private clock: Clock = new Clock();

    public rtBridge: RTEventBridge = new RTEventBridge();

    //

    constructor ( rtBridge: RTEventBridge ) {

        this.rtBridge = rtBridge;

        this.init();

    };

    public init () : void {

        this.renderer = new WebGLRenderer({ canvas: document.querySelector('#renderport') });
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( window.innerWidth, window.innerHeight );

        this.camera = new PerspectiveCamera( 60, 1920/1080, 1, 1000 );
        this.camera.position.set( 5, 3, 5 );

        const controls = new OrbitControls( this.camera, this.renderer.domElement );
        controls.target.set( 0, 0, 0 );
        controls.update();

        this.scene = new Scene();
        this.scene.background = new Color( 1.0, 1.0, 1.0 );

        const light = new AmbientLight( 0xFFFFFF, 0.2 );
        this.scene.add( light );

        const spotLight = new SpotLight( 0xff8888, 0.9, 15 );
        spotLight.position.copy( this.camera.position );
        this.scene.add( spotLight );

        const material = new MeshPhongMaterial({ color: 0xff0000 });
        const geometry = new BoxGeometry( 2, 2, 2 );
        const box = new Mesh( geometry, material );
        box.position.set( 0, 0, 0 );
        this.scene.add( box );
        this.box = box;

        //

        window.addEventListener( 'resize', this.onResize );

        this.rtBridge.onReactEvent( 'SetColor', this.updateBoxColor );

        //

        this.onResize();
        this.loop();

    };

    private updateBoxColor = ( params: { color: number } ) : void => {

        ( this.box.material as MeshBasicMaterial ).color.set( params.color );

    };

    private onResize = () : void => {

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight );

    };

    private loop = () : void => {

        requestAnimationFrame( this.loop );
        const delta = this.clock.getDelta();

        // process in/out events queue
        this.rtBridge.processEvents();

        // updates and render
        this.animate( delta );
        this.renderer.render( this.scene, this.camera );

    };

    private animate ( delta: number ) : void {

        this.box.rotation.x += delta;
        this.box.rotation.z += 1.3 * delta;

        this.rtBridge.dispatchToReact( 'CameraPositionUpdate', { x: this.camera.position.x, y: this.camera.position.y, z: this.camera.position.z } );
        this.rtBridge.dispatchToReact( 'FrameUpdate', { frame: this.renderer.info.render.frame } );

    };

};
