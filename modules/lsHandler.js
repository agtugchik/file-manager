import { readdir, stat } from "fs/promises";
import { join } from "path";

const getFileType = async (currentPath, v) => {
  let type = "file";
  try {
    type = (await stat(join(currentPath, v))).isFile() ? "file" : "directory";
  } catch {}
  return type;
};

const lsHandler = async (currentPath) => {
  const tableStructure = await Promise.all(
    (
      await readdir(currentPath)
    ).map(async (v) => {
      return {
        Name: v,
        Type: await getFileType(currentPath, v),
      };
    })
  );
  console.table(tableStructure);
  console.log(`You are currently in ${currentPath}`);
};

export default lsHandler;
