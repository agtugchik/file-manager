import { createGzip } from "zlib";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream";
import getNewPath from "./getNewPath.js";
import { parse } from "path";

const compressHandler = (currentPath, msg, setPath) => {
  console.log("COMPRESS HANDLER");
  const [, firstArg, secondArg] = msg.split(" ");
  const sourcePath = getNewPath(currentPath, firstArg || "", "");
  const sourceDirPath = parse(sourcePath).dir;
  const destinationPath = getNewPath(sourceDirPath, secondArg || "", "");
  const newCurrentPath = parse(destinationPath).dir;
  const readStream = createReadStream(sourcePath);
  const writeStream = createWriteStream(destinationPath);
  const gzip = createGzip();
  readStream.on("error", async () => {
    rm(destinationPath);
  });
  pipeline([readStream, gzip, writeStream], (err) => {
    if (err) {
      console.log("Operation failed");
      console.log(`You are currently in ${currentPath}`);
    } else {
      setPath(newCurrentPath);
      console.log(`You are currently in ${newCurrentPath}`);
    }
  });
};

export default compressHandler;
