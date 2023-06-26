import { createHash } from "crypto";
import { readFile } from "fs/promises";
import getNewPath from "./getNewPath.js";
import { parse } from "path";

const hashHandler = async (currentPath, msg, setPath) => {
  const filePath = getNewPath(currentPath, msg, "hash");
  const newCurrentPath = parse(filePath).dir;
  try {
    const content = await readFile(filePath);
    setPath(newCurrentPath);
    console.log(createHash("sha256").update(content).digest("hex"));
    console.log(`You are currently in ${newCurrentPath}`);
  } catch {
    console.log("Operation failed");
    console.log(`You are currently in ${currentPath}`);
  }
};

export default hashHandler;
