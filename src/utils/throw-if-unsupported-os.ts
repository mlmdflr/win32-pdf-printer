import { platform } from "node:os";

export default function throwIfUnsupportedOs() {
  if (platform() !== "win32") {
    throw "Operating System not supported";
  }
}
