import { argv, stdin, stdout } from "process";
import { createInterface } from "readline";
import { homedir } from "os";
import checkCommand from "./modules/checkCommand.js";
import closeHandler from "./modules/closeHandler.js";
import upHandler from "./modules/upHandler.js";
import cdHandler from "./modules/cdHandler.js";
import lsHandler from "./modules/lsHandler.js";
import catHamndler from "./modules/catHandler.js";

const run = async () => {
  let currentPath = homedir().toLowerCase();
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
      catHamndler(currentPath, msg);
    } else console.log("Invalid input");
  });

  closeHandler(rl, username);
};

run();
