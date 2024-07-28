import { useState } from 'react';
import { Create, SimpleForm, TextInput, PasswordInput, NumberInput, required } from 'react-admin';
import { FormControlLabel, Checkbox } from '@mui/material';

const PostCreate = (props: any) => {
    const [isFieldVisible, setIsFieldVisible] = useState(false);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsFieldVisible(event.target.checked);
    };

    return (
        <Create {...props}>
            <SimpleForm>
                <TextInput source="username" label="Username" validate={required()} />
                <TextInput source="name" label="Name" validate={required()} />
                <TextInput source="nickname" label="Nickname" />
                <TextInput source="given_name" label="Given Name" />
                <TextInput source="family_name" label="Family Name" />
                <TextInput source="email" label="Email" validate={required()} />
                <PasswordInput source="password" label="Password" validate={required()} />
                <FormControlLabel
                    control={<Checkbox checked={isFieldVisible} onChange={handleCheckboxChange} />}
                    label="Wallet"
                />
                {isFieldVisible && (
                    <NumberInput source="balance" label="Balance" />
                )}
            </SimpleForm>
        </Create>
    );
}

export default PostCreate;
