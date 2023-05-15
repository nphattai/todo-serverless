import { APIGatewayProxyHandlerV2 } from "aws-lambda";

export const getTodo: APIGatewayProxyHandlerV2 = async (event, context) => {
  console.log("event ", JSON.stringify(event));

  console.log("context ", JSON.stringify(context));

  return JSON.stringify({
    statusCode: 200,
    msg: "success",
    data: { id: 1, title: "todo 1" },
  });
};
