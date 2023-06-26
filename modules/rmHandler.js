import getNewPath from "./getNewPath.js";
import { parse } from "path";
import { rm } from "fs/promises";

const rmHandler = async (currentPath, msg) => {
  const removePath = getNewPath(currentPath, msg, "rm");
  const newCurrentPath = parse(removePath).dir;
  try {
    await rm(removePath);
    console.log(`You are currently in ${newCurrentPath}`);
    return newCurrentPath;
  } catch {
    console.log("Operation failed");
    console.log(`You are currently in ${currentPath}`);
    return currentPath;
  }
};

export default rmHandler;
