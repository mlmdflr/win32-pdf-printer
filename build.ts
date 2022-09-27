import path from "path";
import fs from "fs";

fs.writeFileSync(
  "./dist/package.json",
  JSON.stringify(require("./package.json"), null, 2)
);
fs.writeFileSync(
  "./dist/README.md",
  fs.readFileSync(path.resolve("README.md"), { encoding: "utf8" })
);
fs.writeFileSync(
  "./dist/LICENSE",
  fs.readFileSync(path.resolve("LICENSE"), { encoding: "utf8" })
);
