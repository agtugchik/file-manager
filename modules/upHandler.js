import { join, sep } from "path";

const upHandler = (currentPath) => {
  const currentPathLevel = currentPath.split(sep).length;
  currentPath =
    currentPathLevel === 2
      ? join(...currentPath.split(sep).slice(0, -1), sep)
      : join(...currentPath.split(sep).slice(0, -1));
  console.log(`You are currently in ${currentPath}`);
  return currentPath.toLowerCase();
};

export default upHandler;
