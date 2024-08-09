import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { useAuth0 } from "@auth0/auth0-react"


const MobileNavLinks = () => {

  const { logout } = useAuth0()

  return (
    <div className="flex flex-col space-y-5 justify-between font-bold text-1xl">
        <Link to={"/user-profile"} className="hover:opacity-50">
            Profile
        </Link>
        <Link to={"/my-recipes"} className="hover:opacity-50">
            Recipes
        </Link>
        <Link to={"/my-wallet"} className="hover:opacity-50">
            $ Wallet
        </Link>
        <Link to={"/recipes-saved"} className="hover:opacity-50">
            Recipes Saved
        </Link>
        <Button onClick={() => logout()} variant="ghost" className="flex-1 font-bold text-white bg-emerald-900">
            Log Out
        </Button>
    </div>
  )
}

export default MobileNavLinks