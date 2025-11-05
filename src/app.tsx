import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, Send } from 'lucide-react';
import { useState } from 'react';
import { useCreateMessage, useMessages } from './hooks/use-messages';

export function App() {
  const [text, setText] = useState('');
  const { data: messages = [], isLoading } = useMessages();
  const mutation = useCreateMessage();

  const send = () => {
    if (!text.trim()) return;
    mutation.mutate(text, { onSuccess: () => setText('') });
  };

  return (
    <div className='flex min-h-screen flex-col bg-linear-to-b from-blue-50 to-white'>
      {/* Header */}
      <header className='p-6 text-center'>
        <h1 className='text-3xl font-light tracking-tight text-gray-900'>
          Coolify
        </h1>
      </header>

      {/* Messages */}
      <ScrollArea className='flex-1 px-6'>
        <div className='mx-auto max-w-2xl space-y-4 py-8'>
          {isLoading ? (
            <div className='flex justify-center py-20'>
              <Loader2 className='h-6 w-6 animate-spin text-blue-400' />
            </div>
          ) : messages.length === 0 ? (
            <p className='text-center text-gray-400'>
              <span className='text-4xl'>wave</span>
              <br />
              <span className='text-sm'>Start the conversation</span>
            </p>
          ) : (
            messages.map((m) => (
              <div
                key={m._id}
                className='animate-in slide-in-from-bottom-2 duration-300'
              >
                <div className='group max-w-fit rounded-2xl bg-white px-5 py-3 text-gray-800 shadow-sm ring-1 ring-gray-200/50 transition-all hover:shadow-md hover:ring-gray-300'>
                  <p className='text-sm leading-relaxed'>{m.text}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>

      {/* Input Bar */}
      <div className='border-t border-gray-100 bg-white/80 backdrop-blur-sm'>
        <div className='mx-auto max-w-2xl p-4'>
          <div className='flex gap-3'>
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder='Say something nice…'
              className='border-0 bg-gray-100/70 text-sm placeholder-gray-400 focus-visible:ring-2 focus-visible:ring-blue-400'
              disabled={mutation.isPending}
            />
            <Button
              onClick={send}
              disabled={mutation.isPending || !text.trim()}
              size='icon'
              className='h-10 w-10 rounded-full bg-blue-500 text-white shadow-lg shadow-blue-500/30 transition-all hover:scale-105 hover:bg-blue-600 disabled:opacity-50'
            >
              {mutation.isPending ? (
                <Loader2 className='h-4 w-4 animate-spin' />
              ) : (
                <Send className='h-4 w-4' />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
