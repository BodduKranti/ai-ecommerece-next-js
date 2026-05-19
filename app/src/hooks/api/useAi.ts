import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Routesurl } from "../../types";
import axios from "axios";

const postChatBotMessage = async (message: string) => {
    const response = await axios(`${Routesurl.CHATBOTAPI}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify({ message }),
    });
    return response.data;
}

// use postElection
export const usePostChatBotMethod = () => {
    const queryClient = useQueryClient();
    return useMutation<any, Error, any>({
        mutationFn: postChatBotMessage,
        onSuccess: (data) => {
            queryClient.invalidateQueries(['chatbot'] as any);
        },
        onError: (error) => {
            console.error('Failed to post chatbot message:', error);
        },
    });
}