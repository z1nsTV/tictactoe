import { Mesh, MeshBuilder, Scene } from "@babylonjs/core";

class BaseBox extends Mesh {
  constructor(name: string, scene: Scene) {
    super(name, scene);
  }

  public static create(name: string, size: number, scene: Scene): Mesh {
    return MeshBuilder.CreateBox(name, { size: size }, scene);
  }

  //   public canBePicked(): boolean {
  //     return true;
  //   }
}

export { BaseBox };
