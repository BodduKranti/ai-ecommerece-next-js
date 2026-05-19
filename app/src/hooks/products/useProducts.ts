
'use client'
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createDatamethod, deleteDatamethod, fetchDatamethod, updateDatamethod } from "../../services";
import { Routesurl } from "../../types";

// use Crete Canidate
export const usePostQuestionMethod = (election_code: string) => {
    const queryClient = useQueryClient();
    return useMutation<any, Error, any>({
        mutationFn: (newElection) => createDatamethod<any>(`${Routesurl.PRODUCTAPI}/${election_code}`, newElection),
        onSuccess: (data) => {
            queryClient.invalidateQueries(['electionslist'] as any);
        },
        onError: (error) => {
            console.error('Failed to post election:', error);
        },
    });
}


// get all the question from below method
export const useProductsListMethod = (skip: number, limit: number, search: string | null) => {
    return useQuery<any[], Error>({
        queryKey: ['productsList', `${Routesurl.PRODUCTAPI}`, skip, limit, search],
        queryFn: () => fetchDatamethod<any[]>(search ? `${Routesurl.PRODUCTAPI}?skip=${skip}&limit=${limit}&search=${search}` : `${Routesurl.PRODUCTAPI}?skip=${skip}&limit=${limit}`),
        placeholderData: keepPreviousData
    });
}


// get question respective of election and question code
export const useProductbyIDMethod = (id: string) => {
    return useQuery<any, Error>({
        queryKey: ['product', id],
        queryFn: () => fetchDatamethod<any>(`${Routesurl.PRODUCTAPI}/${id}`),
        enabled: !!id,
        placeholderData: keepPreviousData
    });
};



// use update
export const useUpdateProductsMethod = (election_code: string) => {
    const queryClient = useQueryClient();
    return useMutation<any, Error, any>({
        mutationFn: (updatedData) => updateDatamethod<any>(`${Routesurl.PRODUCTAPI}/${election_code}/${updatedData.question_code}`, updatedData),
        onSuccess: (data) => {
            queryClient.invalidateQueries(['electionslist'] as any);
            // router.push(`/createelection/question?election_code=${data?.election_code}`);
        },
        onError: (error) => {
            // Handle any errors here
            console.error('Failed to Update election:', error);
        },
    });
}

// use Question Candidate Delete Method Below
export const useProductDeleteMethod = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, string>({
        mutationFn: (candidate_code) => deleteDatamethod(`${Routesurl.PRODUCTAPI}/${candidate_code}`),
        onSuccess: () => {
            queryClient.invalidateQueries(['electionslist'] as any); // Refresh the list
        },
        onError: (error) => {
            console.error('Failed to delete election:', error);
        },
    });
}