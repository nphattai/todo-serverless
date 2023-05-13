export default function () {
  console.log("Log hello function");

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello world",
      appEnv: process.env.APP_ENV,
    }),
  };
}
