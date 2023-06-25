import { writeFile } from "fs/promises";
import { join, sep } from "path";
import getNewPath from "./getNewPath.js";

const addHandler = async (currentPath, msg) => {
  const filePath = getNewPath(currentPath, msg, "add");
  const newCurrentPath = join(...filePath.split(sep).slice(0, -1), sep);

  try {
    await writeFile(filePath, "");
    console.log(`You are currently in ${newCurrentPath}`);
  } catch {
    console.log("Invalid input");
    console.log(`You are currently in ${currentPath}`);
  }
  return newCurrentPath;
};

export default addHandler;
