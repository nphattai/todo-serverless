export default function () {
  const appEnv = process.env.APP_ENV;

  console.log("Log hello function", appEnv);

  return JSON.stringify({
    message: "Hello world",
    appEnv,
  });
}
