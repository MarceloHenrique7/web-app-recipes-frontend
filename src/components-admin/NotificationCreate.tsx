import { Create, SimpleForm, TextInput } from 'react-admin';

const NotificationCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="id" disabled/>
            <TextInput source="title" />
            <TextInput source="subtitle" />
            <TextInput source="description" />
        </SimpleForm>
    </Create>
);

export default NotificationCreate