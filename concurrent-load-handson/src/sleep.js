const sleep = async (millisec) =>
  new Promise((resolve) => {
    setTimeout(resolve, millisec);
  });

export {sleep};
