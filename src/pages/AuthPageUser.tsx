import { useCreateMyUser } from "@/api/MyUserApi";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { useAuth0 } from "@auth0/auth0-react";
import { useFormContext } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const AuthPageUser = () => {

    const location = useLocation()
    console.log(location)
    const navigate = useNavigate()
    const { isAuthenticated } = useAuth0()

    if(isAuthenticated) {
        navigate({
            pathname: '/'
        })
    }

    const { loginWithPopup, isLoading } = useAuth0()

    const handleSubmit = () => {
        loginWithPopup()
    }


    return (
        <div className="w-full h-full flex flex-col items-center">
            <h2>nada aqui</h2>
        </div>
    )

}

export default AuthPageUser;



