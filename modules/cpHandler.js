import getNewPath from "./getNewPath.js";
import { parse } from "path";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream";
import { rm } from "fs/promises";

const cpHandler = (currentPath, msg, setPath) => {
  const [, firstArg, secondArg] = msg.split(" ");
  const sourcePath = getNewPath(currentPath, firstArg || "", "");
  const sourceDirPath = parse(sourcePath).dir;
  const destinationPath = getNewPath(sourceDirPath, secondArg || "", "");
  const newCurrentPath = parse(destinationPath).dir;
  const readStream = createReadStream(sourcePath);
  const writeStream = createWriteStream(destinationPath);
  readStream.on("error", async () => {
    rm(destinationPath);
  });
  pipeline([readStream, writeStream], (err) => {
    if (err) {
      console.log("Operation failed");
      console.log(`You are currently in ${currentPath}`);
    } else {
      setPath(newCurrentPath);
      console.log(`You are currently in ${newCurrentPath}`);
    }
  });
};

export default cpHandler;
