import { ArrayInput, BooleanInput, DateInput, Create, NumberInput, SimpleForm, SimpleFormIterator, TextInput, ImageInput, ImageField, FileField, FileInput } from 'react-admin';

const RecipeCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="userId" label="User ID" />
            <TextInput source="name" label="Name" />
            <ArrayInput source="categories" label="Categories">
                <SimpleFormIterator>
                    <TextInput source="" label="Category" />
                </SimpleFormIterator>
            </ArrayInput>
            <TextInput source="description" label="Description" />
            <FileInput source="imageFile" label="Related pictures" accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}>
                <FileField source="src" title="title" />
            </FileInput>
            <DateInput source="lastUpdate" label="Last Update" />
            <TextInput source="cookTime" label="Cook Time" />
            <TextInput source="prepTime" label="Prep Time" />
            <TextInput source="serving" label="Serving" />
            <BooleanInput source="isPublic" label="Is Public" />
            <BooleanInput source="forSale" label="For Sale" />
            <NumberInput source="price" label="Price" />
            <ArrayInput source="nutrients" label="Nutrients">
                <SimpleFormIterator>
                    <NumberInput source="calories" label="Calories" />
                    <NumberInput source="carbohydrate" label="Carbohydrate" />
                    <NumberInput source="fat" label="Fat" />
                    <NumberInput source="protein" label="Protein" />
                </SimpleFormIterator>
            </ArrayInput>
            <ArrayInput source="ingredients" label="Ingredients">
                <SimpleFormIterator>
                    <TextInput source="name" label="Name" />
                    <NumberInput source="quantity" label="Quantity" />
                    <TextInput source="unit" label="Unit" />
                </SimpleFormIterator>
            </ArrayInput>
            <ArrayInput source="instructions" label="Instructions">
                <SimpleFormIterator>
                    <TextInput source="title" label="Title" />
                    <TextInput source="subtitle" label="Subtitle" />
                    <TextInput source="description" label="Description" />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Create>
);

export default RecipeCreate;
