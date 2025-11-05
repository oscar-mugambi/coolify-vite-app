import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../axios';

type Message = { _id: string; text: string };

const fetchMessages = async (): Promise<Message[]> => {
  const { data } = await axiosInstance.get('/messages');
  return data;
};

const createMessage = async (text: string): Promise<Message> => {
  const { data } = await axiosInstance.post('/messages', { text });
  return data;
};

export const useMessages = () => {
  return useQuery({
    queryKey: ['messages'],
    queryFn: fetchMessages,
  });
};

export const useCreateMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMessage,
    onSuccess: (newMessage) => {
      queryClient.setQueryData<Message[]>(['messages'], (old = []) => [
        ...old,
        newMessage,
      ]);
    },
  });
};
