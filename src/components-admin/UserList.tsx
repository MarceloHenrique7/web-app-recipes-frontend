import { Datagrid, EditButton, DeleteButton, EmailField, List, ReferenceField, TextField } from 'react-admin';

const AllList = () => (
    <List>
        <Datagrid >
            <TextField  source="id"/>
            <EmailField source="email"/>
            <TextField source="name" />
            <EditButton/>
            <DeleteButton/>
        </Datagrid>
    </List>
);


export default AllList