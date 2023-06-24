import { userInfo } from "os";

const getUserName = () => {
  return userInfo().username;
};

export default getUserName;
