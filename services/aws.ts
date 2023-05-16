import * as aws from "aws-sdk";

export const config = {
  sns: {
    region: process.env.SNS_REGION,
    account: process.env.SNS_ACCOUNT,
    key: process.env.SNS_KEY,
    secret: process.env.SNS_SECRET,
  },
  sqs: {
    region: process.env.SNS_REGION,
    account: process.env.SNS_ACCOUNT,
    key: process.env.SNS_KEY,
    secret: process.env.SNS_SECRET,
  },
};

/**
 * Publish message to topic SNS
 * @param data
 * @param topic
 */
export async function publishSNS(data: object, topic: string) {
  const pub =
    process.env.APP_SNS === "local"
      ? new aws.SNS({ endpoint: "http://localhost:4002" })
      : new aws.SNS({
          region: config.sns.region,
          accessKeyId: config.sns.key,
          secretAccessKey: config.sns.secret,
        });

  console.log({ messageData: data, topic });

  await pub
    .publish({
      Message: JSON.stringify(data),
      TopicArn: `arn:aws:sns:${config.sns.region}:${config.sns.account}:${process.env.STAGE}-${topic}`,
    })
    .promise()
    .then((item) =>
      console.log({ message: `[SNS] Message published: ${item.MessageId}` })
    )
    .catch((error) => {
      console.log(error);
      throw new Error("[SNS] Error publish message");
    });
}

export async function publishSQS(data: object, queueName: string) {
  console.log(JSON.stringify(data));

  const queueUrl =
    process.env.APP_SQS === "local"
      ? `http://localhost:9324/${config.sqs.account}/${process.env.STAGE}-${queueName}`
      : `https://sqs.${config.sqs.region}.amazonaws.com/${config.sqs.account}/${process.env.STAGE}-${queueName}`;

  console.log("[SQS] publish SQS " + queueUrl);

  const sqs =
    process.env.APP_SQS === "local"
      ? new aws.SQS({ endpoint: "http://localhost:9324" })
      : new aws.SQS({
          region: config.sns.region,
          accessKeyId: config.sqs.key,
          secretAccessKey: config.sqs.secret,
        });

  await sqs
    .sendMessage({
      MessageBody: JSON.stringify(data),
      QueueUrl: queueUrl,
    })
    .promise()
    .then((item) =>
      console.log({ message: `[SQS] Message published: ${item.MessageId}` })
    )
    .catch((error) => {
      console.log(error, "[SQS] Error publish message");
      throw new Error("[SQS] Error publish message");
    });
}
