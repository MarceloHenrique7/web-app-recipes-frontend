import { Edit, SimpleForm, TextInput, ReferenceInput, SelectInput, TopToolbar, ShowButton, ListButton, Button } from 'react-admin';


const PostEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="email" />
            <TextInput source="walletId" />
        </SimpleForm>
    </Edit>
);

export default PostEdit;
