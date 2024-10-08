import { useCreateMyUser } from "@/api/MyUserApi";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";

const AuthCallbackPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth0();
    const createUser = useCreateMyUser();

    const hasCreatedUser = useRef(false)
    
    useEffect(() => {
        if(user?.sub && user?.email && user?.name && !hasCreatedUser.current) {
            createUser.mutateAsync({ auth0Id: user.sub, email: user.email, name: user.name})
            hasCreatedUser.current = true
        }
        navigate("/")
    }, [createUser, navigate, user]);

    
  return <>...Loading</>
}

export default AuthCallbackPage;