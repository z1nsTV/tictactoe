import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import {
  Engine,
  Scene,
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  Mesh,
  MeshBuilder,
  Color4,
  Material,
  StandardMaterial,
  Texture,
} from "@babylonjs/core";

class App {
  constructor() {
    // create the canvas html element and attach it to the webpage
    var canvas = document.querySelector("#renderCanvas") as HTMLCanvasElement;

    // resize the babylon engine when the window is resized
    window.addEventListener("resize", function () {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    // initialize babylon scene and engine
    var engine = new Engine(canvas, true);
    var scene = new Scene(engine);

    scene.clearColor = new Color4(0, 0, 0, 0);

    var positions = {
      1: new Vector3(-1, 1, -1),
      2: new Vector3(0, 1, -1),
      3: new Vector3(1, 1, -1),
      4: new Vector3(-1, 0, -1),
      5: new Vector3(0, 0, -1),
      6: new Vector3(1, 0, -1),
      7: new Vector3(-1, -1, -1),
      8: new Vector3(0, -1, -1),
      9: new Vector3(1, -1, -1),
    };

    for (var i in positions) {
      var box: Mesh = MeshBuilder.CreateBox("box", { size: 0.6 }, scene);
      box.position = positions[i];
      var material: StandardMaterial = new StandardMaterial("normal", scene);
      material.diffuseTexture = new Texture("textures/amiga.jpg", scene);

      box.material = material;
    }

    var camera: ArcRotateCamera = new ArcRotateCamera(
      "Camera",
      Math.PI / 3,
      Math.PI / 2.5,
      4.5,
      new Vector3(0, 0, -1),
      scene,
      true
    );

    // camera.attachControl(canvas, true);

    var light1: HemisphericLight = new HemisphericLight(
      "light1",
      new Vector3(1, 1, 0),
      scene
    );

    // hide/show the Inspector
    window.addEventListener("keydown", (ev) => {
      // Shift+Ctrl+Alt+I
      if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.key === "i") {
        if (scene.debugLayer.isVisible()) {
          scene.debugLayer.hide();
        } else {
          scene.debugLayer.show();
        }
      }
    });

    // run the main render loop
    engine.runRenderLoop(() => {
      scene.render();
    });
  }
}
new App();
