import getNewPath from "./getNewPath.js";
import { join, sep } from "path";
import { rename } from "fs/promises";

const rnHandler = async (currentPath, msg) => {
  const [, firstArg, secondArg] = msg.split(" ");
  const oldPath = getNewPath(currentPath, firstArg, "");
  const newCurrentPath = join(...oldPath.split(sep).slice(0, -1), sep);
  const newPath = getNewPath(newCurrentPath, secondArg, "");

  // console.log(`IN RN HANDLER
  // CURRENT PATH: ${currentPath}
  // MSG: ${msg}
  // FIRST ARG: ${firstArg}
  // SECOND ARG: ${secondArg}
  // OLD PATH: ${oldPath}
  // NEW PATH: ${newPath}
  // NEW CURRENT PATH: ${newCurrentPath}`);
  try {
    await rename(oldPath, newPath);
    console.log(`You are currently in ${newCurrentPath}`);
  } catch {
    console.log("Operation failed");
    console.log(`You are currently in ${currentPath}`);
  }
  return newCurrentPath;
};

export default rnHandler;
