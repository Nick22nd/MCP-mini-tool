import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
    ListPromptsRequestSchema,
    GetPromptRequestSchema
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

const server = new McpServer(
    {
        name: "example-server",
        version: "1.0.0"
    },
    {
        capabilities: {
            prompts: {
                list: ListPromptsRequestSchema,
                get: GetPromptRequestSchema
            },
            resources: {},
            tools: {}
        }
    }
);
// Add an addition tool
server.tool("hello-world",
    { message: z.string() },
    async ({ message }) => {
        let newMessage = `Hello MCP stdio ${message} `;
        return {
            content: [{ type: "text", text: newMessage }]
        }
    }
);
// prompt
server.prompt(
    "review-code",
    { code: z.string() },
    ({ code }) => ({
        messages: [{
            role: "user",
            content: {
                type: "text",
                text: `Please review this code:\n\n${code}`
            }
        }]
    })
);

// Static resource
server.resource(
    "config",
    "config://app",
    async (uri) => ({
        contents: [{
            uri: uri.href,
            text: "App configuration here"
        }]
    })
);

// Dynamic resource with parameters
server.resource(
    "user-profile",
    new ResourceTemplate("users://{userId}/profile", { list: undefined }),
    async (uri, { userId }) => ({
        contents: [{
            uri: uri.href,
            text: `Profile data for user ${userId}`
        }]
    })
);
const transport = new StdioServerTransport();
await server.connect(transport);