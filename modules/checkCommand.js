const checkCommand = (cmd, msg) => {
  const command = new RegExp(`^${cmd} `);
  return command.test(msg) && msg.replace(command, "").length > 0;
};

export default checkCommand;
