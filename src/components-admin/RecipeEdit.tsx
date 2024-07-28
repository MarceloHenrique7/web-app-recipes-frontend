import { ArrayInput, BooleanInput, DateInput, Edit, FileField, FileInput, NumberInput, ReferenceInput, SimpleForm, SimpleFormIterator, TextInput } from 'react-admin';

const RecipeEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="name" />
            <ArrayInput source="categories">
            <SimpleFormIterator>
                    <TextInput source="" label="Category" />
                </SimpleFormIterator>
            </ArrayInput>
            <TextInput source="description" />
            <FileInput source="imageFile" label="Related pictures" accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}>
                <FileField source="src" title="title" />
            </FileInput>
            <DateInput source="lastUpdate" />
            <TextInput source="cookTime" />
            <TextInput source="prepTime" />
            <TextInput source="serving" />
            <BooleanInput source="isPublic" />
            <BooleanInput source="forSale" />
            <NumberInput source="price" />
            <ArrayInput source="nutrients"><SimpleFormIterator><TextInput source="id" />
            <NumberInput source="calories" />
            <NumberInput source="carbohydrate" />
            <NumberInput source="fat" />
            <NumberInput source="protein" />
            </SimpleFormIterator></ArrayInput>
            <ArrayInput source="ingredients"><SimpleFormIterator><TextInput source="id" />
            <TextInput source="name" />
            <NumberInput source="quantity" />
            <TextInput source="unit" /></SimpleFormIterator></ArrayInput>
            <ArrayInput source="instructions"><SimpleFormIterator><TextInput source="id" />
            <TextInput source="description" />
            <TextInput source="subtitle" />
            <TextInput source="title" /></SimpleFormIterator></ArrayInput>
        </SimpleForm>
    </Edit>
);

export default RecipeEdit;