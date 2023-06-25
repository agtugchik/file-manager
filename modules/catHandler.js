import { createReadStream } from "fs";
import { stdout } from "process";
import { join } from "path";

const catHamndler = (currentPath, msg) => {
  const filePath = join(currentPath, msg.replace(/^cat /, ""));
  const readableStreme = createReadStream(filePath);
  readableStreme.on("data", (chunk) => stdout.write(chunk));
  readableStreme.on("end", () => {
    stdout.write("\n");
    console.log(`You are currently in ${currentPath}`);
  });
  readableStreme.on("error", () => {
    console.log("Invalid input");
    console.log(`You are currently in ${currentPath}`);
  });
};

export default catHamndler;
