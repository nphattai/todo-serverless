import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { publishSQS } from "../services/aws";

export const dispatch: APIGatewayProxyHandlerV2 = async () => {
  try {
    await publishSQS({ msg: "hello world" }, "MyQueue").catch((error) =>
      console.log(error)
    );

    return { body: JSON.stringify({ msg: "success" }) };
  } catch (error) {
    console.log(error);
    return { body: JSON.stringify({ msg: "failed" }) };
  }
};
