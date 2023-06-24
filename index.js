import { join } from "path";
import { argv, stdin, stdout } from "process";
import { createInterface } from "readline";
import closeHandler from "./modules/closeHandler.js";
import getSystemDriveLetter from "./modules/getSystemDriveLetter.js";
import getUserName from "./modules/getUserName.js";
import { access } from "fs/promises";

const run = async () => {
  const systemDriveLetter = await getSystemDriveLetter();
  const userName = getUserName();
  let currentPath = join(systemDriveLetter, "/Users/", userName);
  let currentPathLength = currentPath.split("\\").length;
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
      currentPath =
        currentPathLength > 1
          ? join(...currentPath.split("\\").slice(0, -1))
          : currentPath;
      currentPathLength = currentPath.split("\\").length;
      console.log(`You are currently in ${currentPath}`);
    } else if (/^cd /.test(msg) && msg.replace(/^cd /, "").length > 0) {
      const newCurrentPath = join(currentPath, msg.replace(/^cd /, ""));
      try {
        await access(newCurrentPath);
        currentPath = newCurrentPath;
        currentPathLength = currentPath.split("\\").length;
        console.log(`You are currently in ${currentPath}`);
      } catch {
        console.log("Invalid input");
      }
    } else console.log("Invalid input");
  });

  closeHandler(rl, username);
};

run();
