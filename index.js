import { argv, stdin, stdout } from "process";
import { createInterface } from "readline";
import { homedir } from "os";
import closeHandler from "./modules/closeHandler.js";
import upHandler from "./modules/upHandler.js";
import cdHandler from "./modules/cdHandler.js";
import lsHandler from "./modules/lsHandler.js";

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
    } else if (/^cd /.test(msg) && msg.replace(/^cd /, "").length > 0) {
      currentPath = await cdHandler(currentPath, msg);
    } else if (msg === "ls") {
      lsHandler(currentPath);
    } else console.log("Invalid input");
  });

  closeHandler(rl, username);
};

run();
