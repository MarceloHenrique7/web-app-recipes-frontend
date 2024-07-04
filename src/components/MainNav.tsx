
import { useAuth0 } from "@auth0/auth0-react"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { Bell } from "lucide-react"
import UserMenuDropDown from "./UserMenuDropDown"

const MainNav = () => {

    const { loginWithRedirect, isAuthenticated } = useAuth0()

  return (
    <span className="flex space-x-5 items-center">
        {isAuthenticated ? (
            <>
                <Link to={"/notifications"} className="font-bold hover:text-green-500">
                    <Bell />
                </Link>
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