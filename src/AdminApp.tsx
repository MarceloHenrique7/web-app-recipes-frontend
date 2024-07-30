import {Admin, Resource} from 'react-admin'

import authProvider from './authProvider';
import dataProvider from "./dataProvider";

import UserList from "./components-admin/UserList";
import UserEdit from "./components-admin/UserEdit";
import UserCreate from "./components-admin/UserCreate";

import RecipeList from "./components-admin/RecipeList";
import RecipeEdit from "./components-admin/RecipeEdit";
import RecipeCreate from "./components-admin/RecipeCreate";

import NotificationList from "./components-admin/NotificationList";
import NotificationEdit from "./components-admin/NotificationEdit";
import NotificationCreate from "./components-admin/NotificationCreate";



const AdminApp = () => {

    return (
            <Admin
                basename='/admin'
                dataProvider={dataProvider}
                authProvider={authProvider}
                >
                <Resource name="user" list={UserList} edit={UserEdit} create={UserCreate} />
                <Resource name="recipe" list={RecipeList} edit={RecipeEdit} create={RecipeCreate}/>
                <Resource name="notification" list={NotificationList} edit={NotificationEdit} create={NotificationCreate}/>
                
            </Admin>

    )

}


export default AdminApp;
