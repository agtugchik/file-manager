import { argv, stdin, stdout } from "process";
import { createInterface } from "readline";
import { homedir } from "os";
import checkCommand from "./modules/checkCommand.js";
import closeHandler from "./modules/closeHandler.js";
import upHandler from "./modules/upHandler.js";
import cdHandler from "./modules/cdHandler.js";
import lsHandler from "./modules/lsHandler.js";
import catHamndler from "./modules/catHandler.js";
import addHandler from "./modules/addHandler.js";
import rnHandler from "./modules/rnHandler.js";
import rmHandler from "./modules/rmHandler.js";
import cpHandler from "./modules/cpHandler.js";
import mvHandler from "./modules/mvHandler.js";
import osHandler from "./modules/osHandler.js";
import hashHandler from "./modules/hashHandler.js";
import compressHandler from "./modules/compressHandler.js";
import decompressHandler from "./modules/decompressHandler.js";

const run = async () => {
  let currentPath = homedir().toLowerCase();
  const setPath = (newCurrentPath) => {
    currentPath = newCurrentPath;
  };
  const username = argv[2].split("--username=")[1];
  console.log(`Welcome to the File Manager, ${username}
You are currently in ${currentPath}`);

  const rl = createInterface({
    input: stdin,
    out: stdout,
  });

  rl.on("line", async (msg) => {
    if (msg === ".exit") rl.close();
    else if (msg === "up") {
      currentPath = upHandler(currentPath);
    } else if (checkCommand("cd", msg)) {
      currentPath = await cdHandler(currentPath, msg);
    } else if (msg === "ls") {
      lsHandler(currentPath);
    } else if (checkCommand("cat", msg)) {
      catHamndler(currentPath, msg, setPath);
    } else if (checkCommand("add", msg)) {
      currentPath = await addHandler(currentPath, msg);
    } else if (checkCommand("rn", msg)) {
      currentPath = await rnHandler(currentPath, msg);
    } else if (checkCommand("rm", msg)) {
      currentPath = await rmHandler(currentPath, msg);
    } else if (checkCommand("cp", msg)) {
      cpHandler(currentPath, msg, setPath);
    } else if (checkCommand("mv", msg)) {
      mvHandler(currentPath, msg, setPath);
    } else if (checkCommand("os", msg)) {
      osHandler(currentPath, msg);
    } else if (checkCommand("hash", msg)) {
      await hashHandler(currentPath, msg, setPath);
    } else if (checkCommand("compress", msg)) {
      compressHandler(currentPath, msg, setPath);
    } else if (checkCommand("decompress", msg)) {
      decompressHandler(currentPath, msg, setPath);
    } else {
      console.log("Invalid input");
      console.log(`You are currently in ${currentPath}`);
    }
  });

  closeHandler(rl, username);
};

run();
