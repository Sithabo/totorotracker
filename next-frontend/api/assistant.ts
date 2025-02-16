import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPEN_AI_API_KEY, // Replace with your actual API key
  dangerouslyAllowBrowser: true,
});

async function createAssistant() {
  if (!process.env.NEXT_PUBLIC_ASSISTANT_ID) {
    throw new Error(
      "ASSISTANT_ID is not defined in the environment variables."
    );
  }
  const assistant = await openai.beta.assistants.retrieve(
    process.env.NEXT_PUBLIC_ASSISTANT_ID
  );
  return assistant;
}

async function createThread() {
  const thread = await openai.beta.threads.create();
  return thread;
}

async function addMessageToThread(threadId: string, messageContent: string) {
  const message = await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: messageContent,
  });
  return message;
}

async function runAssistant(assistantId: string, threadId: string) {
  const run = await openai.beta.threads.runs.create(threadId, {
    assistant_id: assistantId,
  });
  return run;
}

async function getRunStatus(threadId: string, runId: string) {
  const runStatus = await openai.beta.threads.runs.retrieve(threadId, runId);
  return runStatus;
}

async function getAssistantResponse(threadId: string) {
  const messages = await openai.beta.threads.messages.list(threadId);
  const assistantMessages = messages.data.filter(
    (message) => message.role === "assistant"
  );
  return assistantMessages;
}

export async function CallChatAssistant(message: any) {
  const assistant = await createAssistant();
  const thread = await createThread();
  await addMessageToThread(thread.id, message);
  const run = await runAssistant(assistant.id, thread.id);

  let runStatus = await getRunStatus(thread.id, run.id);
  while (runStatus.status !== "completed") {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second
    runStatus = await getRunStatus(thread.id, run.id);
  }

  const assistantMessages = await getAssistantResponse(thread.id);
  console.log(assistantMessages[0].content[0].text.value);
  return assistantMessages[0].content[0].text.value;
}
