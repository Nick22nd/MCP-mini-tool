import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const transport = new StdioClientTransport({
  command: "node",
  args: ["server.js"]
});

const client = new Client(
  {
    name: "example-client",
    version: "1.0.0"
  }
);

await client.connect(transport);

console.log('heres')
// Call a tool
const result = await client.callTool({
  name: "hello-world",
  arguments: {
    message: "value"
  }
});
console.log('result', result);
console.log('result', result.content[0].text)


const tools = await client.listTools();
console.log('自定义服务端支持的工具:', tools);
try {
  const prompts = await client.listPrompts()
  console.log('自定义服务端支持的提示词:', prompts);
} catch (error) {
  console.error('server list resource Template error:', error);
}

try {
  const resources = await client.listResources()
  console.log('自定义服务端支持的资源:', resources);
} catch (error) {
  console.error('server list resource error:', error);
}