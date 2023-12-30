import { Mesh, MeshBuilder, Scene } from "@babylonjs/core";
import { BoxBaseMaterial } from "../materials/boxBaseMaterial";

class BaseBox extends Mesh {
  public canBePicked: boolean;

  constructor(name: string, scene: Scene, size: number) {
    super(name, scene);
    this.canBePicked = true;

    MeshBuilder.CreateBox(name, { size: size }, scene).parent = this;
  }

  public updateMaterial(color: string, text: string): void {
    this.material = new BoxBaseMaterial("box", this.getScene(), text, color);
  }
}

export { BaseBox };
