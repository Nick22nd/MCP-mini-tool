import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const transport = new StdioClientTransport({
  command: "node",
  args: ["server.js"]
});
const client = new Client(
  {
    name: "hello-world",
    version: "1.0.0"
  }
);

await client.connect(transport);

const result = await client.callTool({
  name: "hello-world",
  arguments: {  
    message: "message from client"
  }
});

console.log('hello-word tool result:', result); 