import { Edit, SimpleForm, TextInput } from 'react-admin';

const NotificationEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" disabled/>
            <TextInput source="title" />
            <TextInput source="subtitle" />
            <TextInput source="description" />
        </SimpleForm>
    </Edit>
);

export default NotificationEdit