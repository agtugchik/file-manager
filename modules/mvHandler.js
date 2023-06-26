import getNewPath from "./getNewPath.js";
import { parse, join } from "path";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream";
import { rm, access } from "fs/promises";

const mvHandler = async (currentPath, msg, setPath) => {
  const [, firstArg, secondArg] = msg.split(" ");
  const sourcePath = getNewPath(currentPath, firstArg || "", "");
  const { dir: sourceDirPath, base: sourceBase } = parse(sourcePath);
  const destinationPath = getNewPath(sourceDirPath, secondArg || "", "");
  const fileDestinationPath = join(destinationPath, sourceBase);
  const handler = () => {
    const readStream = createReadStream(sourcePath);
    const writeStream = createWriteStream(fileDestinationPath);
    readStream.on("error", async () => {
      rm(destinationPath);
    });
    pipeline([readStream, writeStream], async (err) => {
      if (err) {
        console.log("Operation failed");
        console.log(`You are currently in ${currentPath}`);
      } else {
        await rm(sourcePath);
        setPath(destinationPath);
        console.log(`You are currently in ${destinationPath}`);
      }
    });
  };
  try {
    await access(sourcePath);
    await access(destinationPath);
    handler();
  } catch {
    console.log("Operation failed");
    console.log(`You are currently in ${currentPath}`);
  }
};

export default mvHandler;
