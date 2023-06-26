import { join, sep } from "path";

const getNewPath = (currentPath, msg, cmd) => {
  const replaceRegExp = new RegExp(`^${cmd} `);
  const cmdPath = msg.replace(replaceRegExp, "");
  const checkRegExp = new RegExp(`^[a-z]:${sep + sep}`, "i");

  return checkRegExp.test(cmdPath) ? cmdPath : join(currentPath, cmdPath);
};

export default getNewPath;
