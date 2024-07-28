import { Datagrid, DeleteButton, EditButton, List, TextField } from 'react-admin';

const NotificationList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="subtitle" />
            <TextField source="description" />
            <EditButton/>
            <DeleteButton/>
        </Datagrid>
    </List>
);

export default NotificationList