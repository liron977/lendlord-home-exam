import React, { useState } from 'react';
import axios from 'axios';
import GenericModal from './modal';
import { TextField, Autocomplete, Stack, Button, Typography } from '@mui/material';
import { DateField } from '@mui/x-date-pickers/DateField';

const USER_ROLES = {
    MANAGER: 'manager',
    WORKER: 'worker',
    DRIVER: 'driver'
}

const options = Object.values(USER_ROLES);

const NewUserDialog = ({shown, toggleModal, refreshCallback}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [dateStarted, setDateStarted] = useState(null);
    const [salary, setSalary] = useState(null);
    const [role, setRole] = useState(null);
    const [managerId, setManagerId] = useState('');

    const onSave = async () => {
        if (firstName !== '' && lastName !== '' && email !== ''
            && dateStarted && salary && role
        ) {
            if (role === USER_ROLES.DRIVER || role === USER_ROLES.WORKER) {
                if (managerId === '') {
                    return;
                }
            }
            const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/user`, { firstName, lastName, email, dateStarted, salary, role, managerId });
            if (response.status === 200) {
                refreshCallback();
            } else {
                // TODO: show error to client
            }
        }
    }

    return (
        <GenericModal displayModal={shown} closeModal={toggleModal}>
            <Stack spacing={4}>
                <Typography variant='h4'>Add New User</Typography>
                <Stack spacing={2}>
                <TextField label="FirstName" onChange={e => setFirstName(e.target.value)} />
                <TextField label="LastName" onChange={e => setLastName(e.target.value)} />
                <TextField label="Email" onChange={e => setEmail(e.target.value)}/>
                <DateField label="Date Started" value={dateStarted} onChange={newValue => setDateStarted(newValue)} />
                <TextField
                    label="Salary"
                    InputProps={{ inputMode: 'numeric' }}
                    type="number"
                    onChange={e => setSalary(e.target.value)}
                />
                <Autocomplete
                    options={options}
                    value={role}
                    onChange={(event, newValue) => setRole(newValue)}
                    renderInput={(params) => <TextField {...params} label="Role" />}
                />
                {(role === USER_ROLES.WORKER || role === USER_ROLES.DRIVER) &&
                 <TextField
                    label="Manager ID"
                    value={managerId}
                    onChange={e => setManagerId(e.target.value)}
                />}
                </Stack>
                <Button variant='outlined' onClick={onSave}>Save</Button>
            </Stack>
        </GenericModal>
    );
};

export default NewUserDialog;