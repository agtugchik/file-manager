import { createReadStream } from "fs";
import { stdout } from "process";
import { parse } from "path";
import getNewPath from "./getNewPath.js";

const catHamndler = (currentPath, msg, setPath) => {
  const filePath = getNewPath(currentPath, msg, "cat");
  const newCurrentPath = parse(filePath).dir;
  const readableStreme = createReadStream(filePath);
  readableStreme.on("data", (chunk) => stdout.write(chunk));
  readableStreme.on("end", () => {
    stdout.write("\n");
    setPath(newCurrentPath);
    console.log(`You are currently in ${newCurrentPath}`);
  });
  readableStreme.on("error", () => {
    console.log("Operation failed");
    console.log(`You are currently in ${currentPath}`);
  });
};

export default catHamndler;
