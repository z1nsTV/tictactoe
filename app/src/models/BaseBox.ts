import { Mesh, MeshBuilder, Scene } from "@babylonjs/core";

class BaseBox extends Mesh {
  public canBePicked: boolean;

  constructor(name: string, scene: Scene) {
    super(name, scene);
    this.canBePicked = true;
  }

  public static create(name: string, size: number, scene: Scene): Mesh {
    return MeshBuilder.CreateBox(name, { size: size }, scene) as BaseBox;
  }
}

export { BaseBox };
