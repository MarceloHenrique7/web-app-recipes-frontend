import { useMutation, useQuery } from "react-query"
import { useAuth0 } from "@auth0/auth0-react";
import { Notification } from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useGetAllNotifications = () => {
    const { getAccessTokenSilently } = useAuth0()

    const getAllNotificationsRequest = async (): Promise<Notification[]> => {
        const accessToken = await getAccessTokenSilently()
        const response = await fetch(`${API_BASE_URL}/api/notification`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
        })

        if(!response.ok) {
            throw new Error("Failed to get a recipe")
        }

        return response.json()
    }


    const { data: notifications, isLoading, error } = useQuery("fetchNotifications", getAllNotificationsRequest, { refetchInterval: 5000 })


    return { notifications, isLoading, error }
}

export const useCreateNotification = () => {

    const { getAccessTokenSilently } = useAuth0()

    const createMyNotificationRequest = async (notification: Notification): Promise<Notification> => {
        const accessToken = await getAccessTokenSilently()
        const response = await fetch(`${API_BASE_URL}/api/notification`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(notification),
        })

        if(!response.ok) {
            throw new Error("Failed to update a Notification")
        }

        return response.json();
    }

    const {
        mutate: createNotification,
        isLoading,
    } = useMutation(createMyNotificationRequest)
    
    return { createNotification, isLoading }
}



export const useUpdateNotification = () => {

    const { getAccessTokenSilently } = useAuth0()

    const updateMyNotificationRequest = async (notification: Notification, currentUserId: string): Promise<Notification> => {
        const accessToken = await getAccessTokenSilently()
        const requestBody = {
            currentUserId: currentUserId,
            data: notification
        }
        const response = await fetch(`${API_BASE_URL}/api/notification/${notification.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(requestBody),
        })

        if(!response.ok) {
            throw new Error("Failed to update a Notification")
        }

        return response.json();
    }

    const {
        mutate: updateNotification,
        isLoading,
    } = useMutation((data: {notification: Notification, currentUserId: string}) => 
        updateMyNotificationRequest(data.notification, data.currentUserId)
    );

    return { updateNotification, isLoading }
}


export const useDeleteNotification = () => {
    const { getAccessTokenSilently } = useAuth0()

    const deleteNotificationRequest = async (recipeId: string, userId: string): Promise<void> => {

        const accessToken = await getAccessTokenSilently()
        
        const paramsToBody = {
            recipeId: recipeId,
            userId: userId
        }
        const response = await fetch(`${API_BASE_URL}/api/notification/`, {
            method: "DELETE",  
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(paramsToBody)
        })

        if(!response.ok) {
            throw new Error("Failed to get a recipe")
        }

        return response.json()
    }


    const { mutate: deleteNotification, isLoading } = useMutation((data: {recipeId: string, userId: string}) => 
        deleteNotificationRequest(data.recipeId, data.userId)
);

    return { deleteNotification, isLoading }
}