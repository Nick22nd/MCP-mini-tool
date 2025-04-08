import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const transport = new StdioClientTransport({
    command: "node",
    args: ["server.js"]
})

const client = new Client({
    name: 'Echo client',
    version: '0.0.1'
})

await client.connect(transport)

client.callTool({
    name: 'echo',
    arguments: {
        message: 'Hello world!'
    }
}).then(result => {
    console.log('Tool result:', result.content[0].text)
}).catch(error => {
    console.error('Error calling tool:', error)
})

// List and fetch resources
try {
    const resources = await client.listResources();
    console.log('Available resources:', resources);

    const resourceUri = "echo://HelloResource";
    const resource = await client.readResource({ uri: resourceUri });
    console.log('Resource content:', resource.contents[0].text);
} catch (error) {
    console.error('Error handling resources:', error);
}

// List and call prompts
try {
    const prompts = await client.listPrompts();
    console.log('Available prompts:', prompts);

    const promptResult = await client.getPrompt({
        name: "echo",
        arguments: {
            message: "Hello from prompt!"
        }
    });
    console.log('Prompt result:', promptResult.messages[0].content.text);
} catch (error) {
    console.error('Error handling prompts:', error);
}