import { Notification, User } from "@/types";




const TextInfoNotification = ({notification, currentUser}: {notification: Notification, currentUser: User}) => {
    return (
        <span>
            {notification.readByUsers?.includes(currentUser?.id as string) ? 'Read!' : 'Mark as read'}
        </span>
    )
}



export default TextInfoNotification