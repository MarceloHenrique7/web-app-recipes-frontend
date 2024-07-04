

import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, 
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger

} from "./ui/dropdown-menu";
import { Button } from "./ui/button";


const UserMenuDropDown = () => {

    const { user, logout } = useAuth0()

  return (
    <DropdownMenu>
        <DropdownMenuTrigger className="font-bold border border-emerald-900 text-emerald-700 rounded-full p-3 hover:text-white hover:bg-emerald-700">
            My Profile
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>
                    {user?.email}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                <Link to={"/user-profile"} className="font-bold">
                    Profile
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <Link to={"/my-recipes"} className="font-bold">
                    Recipes
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <Link to={"/my-wallet"} className="font-bold">
                    $ Wallet
                </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                <Button onClick={() => logout()} variant="ghost" className="flex-1 font-bold text-white bg-emerald-900">
                    Log Out
                </Button>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserMenuDropDown;