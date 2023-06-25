import { createReadStream } from "fs";
import { stdout } from "process";
import { join, sep } from "path";
import getNewPath from "./getNewPath.js";

const catHamndler = (currentPath, msg) => {
  const filePath = getNewPath(currentPath, msg, "cat");
  const newCurrentPath = join(...filePath.split(sep).slice(0, -1), sep);
  const readableStreme = createReadStream(filePath);
  readableStreme.on("data", (chunk) => stdout.write(chunk));
  readableStreme.on("end", () => {
    stdout.write("\n");
    console.log(`You are currently in ${newCurrentPath}`);
  });
  readableStreme.on("error", () => {
    console.log("Invalid input");
    console.log(`You are currently in ${currentPath}`);
  });
  return newCurrentPath.toLowerCase();
};

export default catHamndler;
