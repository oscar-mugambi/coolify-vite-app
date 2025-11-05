import { useState } from 'react';
import { useCreateMessage, useMessages } from './hooks/use-messages';

export function App() {
  const [text, setText] = useState('');
  const { data: messages = [], isLoading, error } = useMessages();
  const mutation = useCreateMessage();

  const addMessage = () => {
    if (!text.trim()) return;
    mutation.mutate(text, {
      onSuccess: () => setText(''),
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addMessage();
    }
  };

  return (
    <div className='p-8 max-w-md mx-auto text-center'>
      <h1 className='text-2xl font-bold mb-4'>Coolify Test App</h1>

      {error && (
        <div className='bg-red-100 text-red-700 p-3 rounded mb-4'>
          Error loading messages
        </div>
      )}

      <div className='flex gap-2 mb-4'>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder='Say something...'
          className='border p-2 rounded w-full'
          disabled={mutation.isPending}
        />
        <button
          onClick={addMessage}
          disabled={mutation.isPending || !text.trim()}
          className='bg-blue-600 text-white px-4 rounded disabled:opacity-50'
        >
          {mutation.isPending ? 'Sending...' : 'Send'}
        </button>
      </div>

      {isLoading ? (
        <div className='text-gray-500'>Loading messages...</div>
      ) : (
        <ul className='space-y-2'>
          {messages.map((m) => (
            <li key={m._id} className='border rounded p-2 text-left'>
              {m.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
