import { join, sep } from "path";
import { access } from "fs/promises";

const cdHandler = async (currentPath, msg) => {
  const newCurrentPath = join(currentPath, msg.replace(/^cd /, ""));
  try {
    await access(newCurrentPath);
    currentPath = newCurrentPath;
    console.log(`You are currently in ${currentPath}`);
  } catch {
    console.log("Invalid input");
  }
  return currentPath.toLowerCase();
};

export default cdHandler;
