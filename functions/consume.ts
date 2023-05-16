import { SNSHandler } from "aws-lambda";

export const consume: SNSHandler = async (event, context) => {
  console.log("CONSUME CALLED !!");

  console.log("event ", JSON.stringify(event));

  console.log("context ", JSON.stringify(context));

  return;
};
