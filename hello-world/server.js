import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "Demo",
  version: "1.0.0"
});

server.tool("hello-world",
  {message: z.string()},
  async ({message}) => {
    let newMessage = `Hello MCP stdio ${message} `;
    return {
      content: [{ type: "text", text: newMessage }]
    }
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);