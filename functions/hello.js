export default function () {
  const appEnv = process.env.APP_ENV;

  console.log("Log hello function", appEnv);

  return JSON.stringify({
    statusCode: 200,
    message: "Hello world",
    appEnv,
  });
}
