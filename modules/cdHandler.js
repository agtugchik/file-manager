import { join, sep } from "path";
import { access } from "fs/promises";
import getNewPath from "./getNewPath.js";

const cdHandler = async (currentPath, msg) => {
  const newCurrentPath = getNewPath(currentPath, msg, "cd");
  try {
    await access(newCurrentPath);
    console.log(`You are currently in ${currentPath}`);
  } catch {
    console.log("Invalid input");
  }
  return newCurrentPath.toLowerCase();
};

export default cdHandler;
