import { BooleanField, Datagrid, DateField, DeleteButton, EditButton, List, NumberField, TextField } from 'react-admin';

 const RecipeList = () => (
    <List>
        <Datagrid>
            <TextField source="name" />
            <TextField source="categories" />
            <TextField source="cookTime" />
            <TextField source="description" />
            <DateField source="lastUpdate" />
            <NumberField source="prepTime" />
            <TextField source="serving" />
            <BooleanField source="forSale" />
            <NumberField source="price" />
            <EditButton/>
            <DeleteButton/>
            </Datagrid>
    </List>
);

export default RecipeList;

