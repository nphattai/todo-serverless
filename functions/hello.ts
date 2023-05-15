export const hello = async () => {
  const appEnv = process.env.APP_ENV;

  console.log("Log ", appEnv);

  return JSON.stringify({
    message: "Hello world",
    appEnv,
  });
};
