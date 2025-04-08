import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const transport = new StdioClientTransport({
      "command": "npx",
      "args": [
        "@playwright/mcp@latest"
      ]
});
const client = new Client(
  {
    name: "playwright-client",
    version: "1.0.0"
  }
);

await client.connect(transport);

const result = await client.listTools();

console.log('list tools result:', result); 

const toolList = result.tools;
client.callTool({
    name: 'browser_tab_new',
    arguments: {
        url: 'https://mcp.so/'
    }
})
.then(result => {
    console.log('Tool result:', result.content[0].text)
}).catch(error => {
    console.error('Error calling tool:', error)
})