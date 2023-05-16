import { hello } from "./functions/hello";
import { getTodo } from "./functions/getTodo";
import { consume } from "./functions/consume";
import { handleMyQueue } from "./functions/handleMyQueue";
import { publishSQS } from "./services/aws";
import { SQSHandler } from "aws-lambda";

export { hello, getTodo, consume, handleMyQueue };

export const dispatch = async () => {
  try {
    await publishSQS({ msg: "hello world" }, "MyQueue").catch((error) =>
      console.log(error)
    );
  } catch (error) {
    console.log(error);
  }
};

export const consumeMyQueue: SQSHandler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  console.log("consumeMyQueue");

  try {
    for (const record of event.Records) {
      console.log(`${record.body}`, "SQS body");
    }
  } catch (error) {
    console.log(error);
  }
};
