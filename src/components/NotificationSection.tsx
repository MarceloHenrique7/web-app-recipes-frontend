import { Bell } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";
import { Badge } from "@mui/material";
import { CardHeader, CardTitle, CardDescription } from "./ui/card";
import { useGetAllNotifications, useUpdateNotification } from "@/api/NotificationApi";
import { useGetMyUser } from "@/api/MyUserApi";
import { Notification } from "@/types";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";

const NotificationSection = () => {
    const { updateNotification } = useUpdateNotification();
    const { notifications } = useGetAllNotifications();
    const { currentUser } = useGetMyUser();

    const myNotifications = useMemo(() => {
        if (!notifications || !currentUser) return [];
        return notifications.filter(
            (notification) =>
                notification.isGeneral === true || notification.recipientUserId === currentUser.id
        );
    }, [notifications, currentUser]);

    const totalNotifications = useMemo(() => {
        if (!myNotifications.length || !currentUser) return 0;
        return myNotifications.reduce((count, notification) => {
            if (!notification.readByUsers.includes(currentUser.id)) {
                count += 1;
            }
            return count;
        }, 0);
    }, [myNotifications, currentUser]);

    const handleOnClickMessageRead = async (notification: Notification) => {
        if (notification.readByUsers.includes(currentUser?.id as string)) {
            return;
        }
        if (currentUser?.id) {
            try {
                // Atualiza o servidor em segundo plano
                await updateNotification({ notification, currentUserId: currentUser.id });
                
                // Atualiza a notificação localmente de forma otimista
                const updatedNotifications = myNotifications.map((n) =>
                    n.id === notification.id ? { ...n, readByUsers: [...n.readByUsers, currentUser.id as string] } : n
                );
                
                // Atualize o estado global ou de contexto, se aplicável
            } catch (error) {
                // Reverter a atualização local se a atualização falhar
                // Você pode implementar um método para notificar o usuário ou lidar com o erro adequadamente
            }
        }
    };

    return (
        <Popover>
            <PopoverTrigger>
                <Badge badgeContent={totalNotifications} color="success">
                    <Bell className="hover:bg-gray-200 text-emerald-700 rounded" />
                </Badge>
            </PopoverTrigger>
            <PopoverContent>
                <ScrollArea className="h-96 w-full rounded-md border">
                    {myNotifications.length ? (
                        myNotifications.map((notification) => (
                            <CardHeader key={notification.id} className="bg-gray-100 rounded p-5">
                                <CardTitle>{notification.title || ''}</CardTitle>
                                <CardDescription className="flex flex-col gap-5">
                                    <span>{notification.subtitle || ''}</span>
                                    <span>{notification.description || ''}</span>
                                </CardDescription>
                                <Button
                                    className="p-0 underline self-start text-emerald-700"
                                    variant="ghost"
                                    onClick={() => handleOnClickMessageRead(notification)}
                                >
                                    {notification.readByUsers.includes(currentUser?.id as string) ? 'Read!' : 'Mark as read'}
                                </Button>
                                <Separator />
                            </CardHeader>
                        ))
                    ) : (
                        <CardHeader>
                            <CardTitle>You don't have notifications</CardTitle>
                            <Separator />
                        </CardHeader>
                    )}
                </ScrollArea>
                <Separator />
            </PopoverContent>
        </Popover>
    );
};

export default NotificationSection;
