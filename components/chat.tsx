'use client';

import { useChat } from 'ai/react';
import { Input } from './ui/input';
import { Message } from '@prisma/client';

type MessageRole = 'system' | 'user' | 'assistant' | 'data';

export default function Chat({ initialMessages }: { initialMessages: Message[] }) {
  const { messages, input, handleSubmit, handleInputChange, isLoading } =
    useChat({
      initialMessages: initialMessages.map(message => ({
        id: message.id,
        content: message.content,
        role: message.role as MessageRole,
        createdAt: message.createdAt,
      }))
    });

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto p-4">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex flex-col ${message.role === 'assistant'
              ? 'items-start'
              : 'items-end'
              }`}
          >
            <div
              className={`rounded-lg px-4 py-2 max-w-[80%] ${message.role === 'assistant'
                ? 'bg-gray-200'
                : 'bg-blue-500 text-white'
                }`}
            >
              <div className="text-sm font-medium mb-1 capitalize">
                {message.role}
              </div>
              <div className="whitespace-pre-wrap">{message.content}</div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="sticky bottom-0">
        <Input
          value={input}
          placeholder="Send a message..."
          onChange={handleInputChange}
          disabled={isLoading}
          className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </form>
    </div>
  );
}