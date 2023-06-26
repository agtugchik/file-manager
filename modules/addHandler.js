import { writeFile } from "fs/promises";
import { parse } from "path";
import getNewPath from "./getNewPath.js";

const addHandler = async (currentPath, msg) => {
  const filePath = getNewPath(currentPath, msg, "add");
  const newCurrentPath = parse(filePath).dir;

  try {
    await writeFile(filePath, "");
    console.log(`You are currently in ${newCurrentPath}`);
  } catch {
    console.log("Operation failed");
    console.log(`You are currently in ${currentPath}`);
  }
  return newCurrentPath;
};

export default addHandler;
