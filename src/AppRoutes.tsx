import { Navigate, Route, Routes } from  'react-router-dom'
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
import AdminApp from './AdminApp'
import ProtectedRouteAdmin from './auth/ProtectedRouteAdmin'
import RecipesSaved from './pages/RecipesSavedPage'
import PageSearchByCategories from './pages/PageSearchByCategories'
import AddFundsPage from './pages/AddFundsPage'
import WithdrawFundsPage from './pages/WithdrawFundsPage'
import TransferFundsPage from './pages/TranferFundsPage'

const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={
        <Layout showHero={true}>
            <HomePage />
        </Layout>   
        }/>
        <Route element={<ProtectedRouteAdmin />}>
            <Route path='/admin/*' element={
                    <AdminApp />
                }/>
        </Route>
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
            <Route path='/recipes-saved' element={
                <Layout showHero={false}>
                    <RecipesSaved />
                </Layout>
            }/>
            <Route path='/checkout/wallet/:recipeId' element={
                <Layout showHero={false}>
                    <CheckoutWalletPage />
                </Layout>
            }/>
            <Route path='/transaction-status/:recipeId' element={
                <Layout showHero={false}>
                    <TransactionStatusPage />
                </Layout>
            }/>
            <Route path='/add-funds' element={
                <Layout showHero={false}>
                    <AddFundsPage />
                </Layout>
            }/>
            <Route path='/withdraw-funds' element={
                <Layout showHero={false}>
                    <WithdrawFundsPage />
                </Layout>
            }/>
            <Route path='/transfer-funds' element={
                <Layout showHero={false}>
                    <TransferFundsPage />
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
        <Route path='/search/recipe/category/:category' element={
            <Layout showHero={false}>
                <PageSearchByCategories />
            </Layout>
        }/>
        <Route path="*" element={<Navigate to="/" />}/>
    </Routes>
  )
}


export default AppRoutes
