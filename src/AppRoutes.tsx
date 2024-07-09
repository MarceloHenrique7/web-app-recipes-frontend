
import { Route, Routes } from  'react-router-dom'
import HomePage from './pages/HomePage'
import Layout from './layout/layout'
import AuthCallbackPage from './pages/AuthCallbackPage'
import ManageRecipePage from './pages/ManageRecipePage'
import MyRecipePage from './pages/MyRecipePage'
import DetailsRecipe from './pages/DetailsRecipe'
import UserProfilePage from './pages/UserProfilePage'
import RecipeUpdatePage from './pages/RecipeUpdatePage'
import ProtectedRoute from './auth/ProtectedRoute'
import SearchPage from './pages/SearchPage'
import MyWalletPage from './pages/MyWalletPage'
import CheckoutWalletPage from './pages/CheckoutWalletPage'
import TransactionStatusPage from './pages/TransactionStatusPage'

const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={
        <Layout showHero={true}>
            <HomePage />
        </Layout>   
        }/>
        <Route element={<ProtectedRoute />}>
            <Route path='/create-recipe' element={
                <Layout showHero={false}>
                    <ManageRecipePage />
                </Layout>
            }/>
            <Route path='/user-profile' element={
                <Layout showHero={false}>
                    <UserProfilePage />
                </Layout>
            }/>
            <Route path='/update/:recipeId' element={
                <Layout showHero={false}>
                    <RecipeUpdatePage />
                </Layout>
            }/>
            <Route path='/my-recipes' element={
                <Layout showHero={false}>
                    <MyRecipePage />
                </Layout>
            }/>
            <Route path='/my-wallet' element={
                <Layout showHero={false}>
                    <MyWalletPage />
                </Layout>
            }/>
            <Route path='/checkout/wallet/:recipeId' element={
                <Layout showHero={false}>
                    <CheckoutWalletPage />
                </Layout>
            }/>
            <Route path='/transaction-status' element={
                <Layout showHero={false}>
                    <TransactionStatusPage />
                </Layout>
            }/>
        </Route>
        <Route path='/details/:recipeId' element={
                <Layout showHero={false}>
                    <DetailsRecipe />
                </Layout>
            }/>
        <Route path='/auth-callback' element={<AuthCallbackPage/>}/>
        <Route path='/search/recipe/:recipe' element={
            <Layout showHero={false}>
                <SearchPage />
            </Layout>
        }/>
    </Routes>
  )
}


export default AppRoutes
