import { Bell } from "lucide-react"
import { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Separator } from "./ui/separator"
import { Badge } from "@mui/material"
import { CardHeader, CardTitle, CardDescription } from "./ui/card"
import { useGetAllNotifications, useUpdateNotification } from "@/api/NotificationApi"
import { useGetMyUser } from "@/api/MyUserApi"
import { Notification } from "@/types"
import { ScrollArea } from "./ui/scroll-area"
import { Button } from "./ui/button"



const NotificationSection = () => {

    const { updateNotification } = useUpdateNotification();

    const { notifications } = useGetAllNotifications();

    const [localNotifications, setLocalNotifications] = useState<Array<Notification>>([]);

    useEffect(() => {
        if (notifications) {
          setLocalNotifications(notifications);
        }
      }, [notifications]);

    const { currentUser } = useGetMyUser();

    let myNotifications: Array<Notification> | undefined = localNotifications?.filter(
        (notification) => notification.isGeneral === true || notification.recipientUserId === currentUser?.id
      );

    let totalNotifications = 0
    myNotifications?.forEach((notification: Notification) => {
        if (notification.readByUsers.includes(currentUser?.id as string)) {
            return
        }
        totalNotifications += 1
    })
    

    const handleOnClickMessageRead = async (notification: Notification) => {
        if (notification.readByUsers.includes(currentUser?.id as string)) {
          return;
        }
        if (currentUser?.id) {
          // Atualiza o estado local de forma otimista
          const updatedNotifications = localNotifications?.map((n) =>
            n.id === notification.id ? { ...n, readByUsers: [...n.readByUsers, currentUser.id as string] } : n
          );
          setLocalNotifications(updatedNotifications);
      
          // Atualiza o servidor em segundo plano
          try {
            await updateNotification({ notification, currentUserId: currentUser.id });
          } catch (error) {
            // Se a atualização falhar, reverte o estado local
            const revertedNotifications = localNotifications?.map((n) =>
              n.id === notification.id ? { ...n, readByUsers: n.readByUsers.filter((id) => id !== currentUser.id) } : n
            );
            setLocalNotifications(revertedNotifications);
          }
        }
      };
      

    return (
        <Popover>
        <PopoverTrigger>
        <Badge badgeContent={totalNotifications} color="success">
            <Bell className="hover:bg-gray-200 text-emerald-700 rounded"/>
        </Badge>    
        </PopoverTrigger>
        <PopoverContent >
            <ScrollArea className="h-96 w-full rounded-md border">
                {myNotifications?.length !== 0 ? myNotifications?.map((notification) => (
                    <CardHeader className="bg-gray-100 rounded p-5">
                        <CardTitle>
                            {notification.title || ''}
                        </CardTitle>
                        <CardDescription className="flex flex-col gap-5">
                            <span>
                                {notification.subtitle || ''}
                            </span>
                            <span>
                                {notification.description || ''}
                            </span>
                        </CardDescription>
                        <Button className="p-0 underline self-start text-emerald-700" variant={"ghost"} onClick={() => handleOnClickMessageRead(notification)}>{notification.readByUsers?.includes(currentUser?.id as string) ? 'Read!' : 'Mark as read'}</Button>
                        <Separator/>
                    </CardHeader>
                    
                )
                ) : (
                    <CardHeader>
                        <CardTitle>
                            You Don't have a notifications
                        </CardTitle>
                        <Separator/>
                    </CardHeader>      
                     
                )}
            </ScrollArea>

            <Separator />
        </PopoverContent>
    </Popover>
    )
}

export default NotificationSection;