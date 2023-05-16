import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { publishSNS } from "../services/aws";

export const dispatch: APIGatewayProxyHandlerV2 = (event, context) => {
  publishSNS({ msg: "dispatch my topic" }, "MyTopic");
};
