import { SQSHandler } from "aws-lambda";

export const handleMyQueue: SQSHandler = (event, context) => {
  console.log("handleMyQueue");

  context.callbackWaitsForEmptyEventLoop = false;

  try {
    for (const record of event.Records) {
      console.log(`${record.body}`, "SQS body");
    }
  } catch (error) {
    console.log(error);
  }
};
