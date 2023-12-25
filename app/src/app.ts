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
  ActionManager,
  ExecuteCodeAction,
} from "@babylonjs/core";
import { BoxBaseMaterial } from "./materials/boxBaseMaterial";
import { Player } from "./models/Player";
import { BaseBox } from "./models/BaseBox";

class App {
  private boxes: BaseBox[] = [];
  private players: Player[] = [];
  private currentPlayer: number = 0;
  private winningCombinations: number[] = [
    123, 456, 789, 147, 258, 369, 159, 357,
  ];
  private positions: { [key: number]: Vector3 } = {
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

    // create players
    this.players.push(new Player("Player 1", 0, "red"));
    this.players.push(new Player("Player 2", 0, "blue"));

    // create boxes
    for (var i in this.positions) {
      var box: BaseBox = new BaseBox("box", scene, 0.6);
      box.position = this.positions[i];

      var boxMaterial: BoxBaseMaterial = new BoxBaseMaterial(
        "boxMaterial",
        scene,
        "😶‍🌫️",
        "red"
      );
      box.material = boxMaterial;

      // Set up the ActionManager for the box
      box.actionManager = new ActionManager(scene);
      box.actionManager.registerAction(
        new ExecuteCodeAction(ActionManager.OnPickTrigger, () => {
          if (box.canBePicked === false) {
            return;
          }

          if (this.currentPlayer === 0) {
            box.material = new BoxBaseMaterial("box", scene, "X", "red");
            this.currentPlayer = 1;
          } else {
            box.material = new BoxBaseMaterial("box", scene, "O", "blue");
            this.currentPlayer = 0;
          }
          box.canBePicked = false;
        })
      );

      console.log(box);
      this.boxes.push(box);
    }

    // console.log(box.material);
    console.log(boxMaterial);

    var camera: ArcRotateCamera = new ArcRotateCamera(
      "Camera",
      Math.PI / 2.5,
      Math.PI / 2,
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
      // Game logic goes here
      if (this.isThereAWinner(scene, this.boxes, this.winningCombinations)) {
      } else {
        this.actionManagerForClickingBoxes(
          scene,
          this.boxes,
          this.currentPlayer
        );
        this.updateCurrentPlayerDisplay();
      }
      scene.render();
    });
  }

  private actionManagerForClickingBoxes = (
    scene: Scene,
    boxes: BaseBox[],
    currentPlayer: number
  ) => {
    for (let box of boxes) {
      box.actionManager = new ActionManager(scene);

      box.actionManager.registerAction(
        new ExecuteCodeAction(ActionManager.OnPickTrigger, () => {
          if (box.canBePicked === false) {
            return;
          }

          if (currentPlayer === 0) {
            box.material = new BoxBaseMaterial("box", scene, "X", "red");
            this.currentPlayer = 1;
          } else {
            box.material = new BoxBaseMaterial("box", scene, "O", "blue");
            this.currentPlayer = 0;
          }
          box.canBePicked = false;
        })
      );
    }
  };

  private updateCurrentPlayerDisplay(): void {
    const currentPlayerElement = document.querySelector("#currentPlayer");
    currentPlayerElement.textContent = `Current player: ${
      this.players[this.currentPlayer].name
    }`;
  }

  private isThereAWinner(
    scene: Scene,
    boxes: BaseBox[],
    winningCombinations: number[]
  ): boolean {
    for (let combination of winningCombinations) {
      let box1 = boxes[+combination.toString()[0] - 1];
      let box2 = boxes[+combination.toString()[1] - 1];
      let box3 = boxes[+combination.toString()[2] - 1];

      // if (
      //   box1.material.getActiveTextures === box2.material.text &&
      //   box2.material.text === box3.material.text
      // ) {
      //   box1.material = new BoxBaseMaterial(
      //     "box",
      //     scene,
      //     box1.material.text,
      //     "green"
      //   );
      //   box2.material = new BoxBaseMaterial(
      //     "box",
      //     scene,
      //     box2.material.text,
      //     "green"
      //   );
      //   box3.material = new BoxBaseMaterial(
      //     "box",
      //     scene,
      //     box3.material.text,
      //     "green"
      //   );
      // }
    }
    return false;
  }
}

new App();
