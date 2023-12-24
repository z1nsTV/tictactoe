import {
  Color3,
  DynamicTexture,
  Scene,
  StandardMaterial,
} from "@babylonjs/core";

class BoxBaseMaterial extends StandardMaterial {
  constructor(name: string, scene: Scene, text: string, fontColor: string) {
    super(name, scene);

    this.diffuseColor = new Color3(0.5, 0.5, 0.5);

    // Create a dynamic texture
    var dynamicTexture = new DynamicTexture(
      "dynamic texture",
      512,
      scene,
      true
    );

    // Create a font style
    var font = "bold 350px monospace";

    // Set the text color
    dynamicTexture.drawText(
      text,
      null,
      null,
      font,
      fontColor,
      "white",
      false,
      true
    );

    // Apply the texture to the material
    this.diffuseTexture = dynamicTexture;
  }

  public canBePicked(): boolean {
    return true;
  }
}

export { BoxBaseMaterial };
