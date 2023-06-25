import { readdir, stat } from "fs/promises";
import { join } from "path";

const lsHandler = async (currentPath) => {
  try {
    const tableStructure = await Promise.all(
      (
        await readdir(currentPath)
      ).map(async (v) => {
        return {
          Name: v,
          Type: (await stat(join(currentPath, v))).isFile()
            ? "file"
            : "directory",
        };
      })
    );
    console.table(tableStructure);
    console.log(`You are currently in ${currentPath}`);
  } catch {
    console.log("Operation failed");
    console.log(`You are currently in ${currentPath}`);
  }
};

export default lsHandler;
