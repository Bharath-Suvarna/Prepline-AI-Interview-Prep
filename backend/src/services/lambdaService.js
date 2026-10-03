import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import { handler as localLambdaHandler } from "../../../lambda/codeRunner/index.js";

export async function runCodeOnLambda(code, testCases = [], language = "javascript") {
  const arn = process.env.AWS_LAMBDA_CODE_RUNNER_ARN;
  const region = process.env.AWS_REGION || "us-east-1";

  if (arn && arn.trim()) {
    try {
      const client = new LambdaClient({ region });
      const command = new InvokeCommand({
        FunctionName: arn,
        Payload: Buffer.from(JSON.stringify({ code, testCases, language }))
      });
      const response = await client.send(command);
      const payloadString = Buffer.from(response.Payload).toString("utf-8");
      const result = JSON.parse(payloadString);
      return result;
    } catch (err) {
      console.warn("AWS Lambda invocation failed, falling back to local runner:", err.message);
    }
  }

  // Local fallback runner using multi-language sandbox
  return await localLambdaHandler({ code, testCases, language });
}
