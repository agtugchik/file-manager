import { EOL, cpus, homedir, userInfo, arch } from "os";

const osHandler = (currentPath, msg) => {
  if (msg === "os --EOL") {
    console.log(JSON.stringify(EOL));
  } else if (msg === "os --cpus") {
    console.log(cpus());
  } else if (msg === "os --homedir") {
    console.log(homedir().toLowerCase());
  } else if (msg === "os --username") {
    console.log(userInfo().username);
  } else if (msg === "os --architecture") {
    console.log(arch());
  }
  console.log(`You are currently in ${currentPath}`);
};

export default osHandler;
