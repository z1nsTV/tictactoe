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
} from "@babylonjs/core";

class App {
  constructor() {
    // create the canvas html element and attach it to the webpage
    var canvas = document.querySelector("#renderCanvas") as HTMLCanvasElement;
    document.body.appendChild(canvas);

    window.addEventListener("resize", function () {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    // initialize babylon scene and engine
    var engine = new Engine(canvas, true);
    var scene = new Scene(engine);

    var box: Mesh = MeshBuilder.CreateBox("box", { size: 1 }, scene);

    var camera: ArcRotateCamera = new ArcRotateCamera(
      "Camera",
      Math.PI / 3,
      Math.PI / 3,
      3,
      box.position,
      scene
    );
    camera.attachControl(canvas, true);
    var light1: HemisphericLight = new HemisphericLight(
      "light1",
      new Vector3(1, 1, 0),
      scene
    );
    // var sphere: Mesh = MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene);

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
