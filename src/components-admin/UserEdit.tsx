import { Edit, SimpleForm, TextInput } from 'react-admin';


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
