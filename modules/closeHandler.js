const closeHandler = (rl, username) => {
  rl.on("close", () =>
    console.log(`Thank you for using File Manager, ${username}, goodbye!`)
  );

  process.on("SIGINT", () => {
    {
      console.log(`Thank you for using File Manager, ${username}, goodbye!`);
      process.exit();
    }
  });
};

export default closeHandler;
