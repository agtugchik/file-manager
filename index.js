import { join } from "path";
import { argv, stdin, stdout } from "process";
import { createInterface } from "readline";
import closeHandler from "./modules/closeHandler.js";
import getSystemDriveLetter from "./modules/getSystemDriveLetter.js";
import getUserName from "./modules/getUserName.js";

const run = async () => {
  const systemDriveLetter = await getSystemDriveLetter();
  const userName = getUserName();
  let currentPath = join(systemDriveLetter, "/Users/", userName);
  const username = argv[2].split("--username=")[1];
  console.log(`Welcome to the File Manager, ${username}
You are currently in ${currentPath}`);

  const rl = createInterface({
    input: stdin,
    out: stdout,
  });

  rl.on("line", (msg) => {
    if (msg === ".exit") rl.close();
    else console.log("Invalid input");
  });

  closeHandler(rl, username);
};

run();
