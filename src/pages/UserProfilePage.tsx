import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm from "@/form/user-profile-form/UserProfileForm";


const UserProfilePage = () => {
    
    const { currentUser, isLoading: isGetLoading  } = useGetMyUser();
    const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser();

    if(isGetLoading) { // se estiver carregando a busca pelo usuario retornamos e renderizamos na tela essa mensagem enquanto buscamos pelo user
      return <span>Loading...</span>
    } 

    if (!currentUser) { // se não encontrarmos o usuario, retornamos que não foi possivel carregar o usuario
      return <span>Unable to load user profile</span>
  }
  
  
  return (
    <div className="bg-gray-100 p-10 rounded">
        <UserProfileForm  currentUser={currentUser} isLoading={isUpdateLoading} onSave={updateUser}/>
    </div>
  )        
}

export default UserProfilePage;