import { createUnzip } from "zlib";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream";
import getNewPath from "./getNewPath.js";
import { parse } from "path";
import { rm } from "fs/promises";

const decompressHandler = (currentPath, msg, setPath) => {
  const [, firstArg, secondArg] = msg.split(" ");
  const sourcePath = getNewPath(currentPath, firstArg || "", "");
  const sourceDirPath = parse(sourcePath).dir;
  const destinationPath = getNewPath(sourceDirPath, secondArg || "", "");
  const newCurrentPath = parse(destinationPath).dir;
  const readStream = createReadStream(sourcePath);
  const writeStream = createWriteStream(destinationPath);
  const unzip = createUnzip();
  readStream.on("error", async () => {
    rm(destinationPath);
  });
  pipeline([readStream, unzip, writeStream], (err) => {
    if (err) {
      console.log("Operation failed");
      console.log(`You are currently in ${currentPath}`);
    } else {
      setPath(newCurrentPath);
      console.log(`You are currently in ${newCurrentPath}`);
    }
  });
};

export default decompressHandler;
