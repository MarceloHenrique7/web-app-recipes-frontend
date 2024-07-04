import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { useAuth0 } from "@auth0/auth0-react"


const MobileNavLinks = () => {

  const { logout } = useAuth0()

  return (
    <div className="flex flex-col space-y-5 justify-between">
        <Link to={"/user-profile"} className="font-bold text-1xl">
            Profile
        </Link>
        <Link to={"/my-recipes"} className="font-bold text-1xl">
            Recipes
        </Link>
        <Link to={"/my-wallet"} className="font-bold text-1xl">
            $ Wallet
        </Link>
        <Button onClick={() => logout()} variant="ghost" className="flex-1 font-bold text-white bg-emerald-900">
            Log Out
        </Button>
    </div>
  )
}

export default MobileNavLinks