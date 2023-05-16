import { SQSHandler } from "aws-lambda";

export const handleMyQueue: SQSHandler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  console.log("handleMyQueue");

  try {
    for (const record of event.Records) {
      console.log(`${record.body}`, "SQS body");
    }
  } catch (error) {
    console.log(error);
  }
};
