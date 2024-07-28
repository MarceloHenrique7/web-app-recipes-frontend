import { useAuth0 } from "@auth0/auth0-react"
import { Button } from "./ui/button"
import UserMenuDropDown from "./UserMenuDropDown"
import NotificationSection from "./NotificationSection";


const MainNav = () => {
    
    const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <span className="flex space-x-5 items-center">
        {isAuthenticated ? (
            <>
                <NotificationSection />
                <UserMenuDropDown />
            </>
        ) : (
        <Button
            className="font-bold hover:text-green-400 hover:bg-gray"
            variant="ghost"
            onClick={ async () => loginWithRedirect()}
            >
            Log In
        </Button>
        )

        }

    </span>
  )
}

export default MainNav;