import React from 'react';
import axios from 'axios';
import { Stack, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const UsersTable = ({ users, refreshCallback }) => {
    const columns = [
        {
            field: 'firstName', headerName: 'First Name'
        },
        {
            field: 'lastName', headerName: 'Last Name'
        },
        {
            field: 'email', headerName: 'Email'
        },
        {
            field: 'dateStarted', headerName: 'Date Started'
        },
        {
            field: 'role', headerName: 'Role'
        },
        {
            field: 'salary', headerName: 'Salary'
        },
        {
            field: 'manager', headerName: 'Manager'
        },
        {
            field: 'actions', headerName: 'Actions',
            renderCell: ({ row }) =>
                <Stack flexDirection='row'>
                    <IconButton>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => deleteUser(row.id)}>
                        <DeleteIcon />
                    </IconButton>
                </Stack>
        },
    ]

    const deleteUser = async (id) => {
        console.log({id})
        const result = await axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/user/${id}`)
        if (result.data.isDeleted) {
            refreshCallback()
        } else {
            // TODO: show an error message to client
        }
    }

    const getRows = () => {
        return users.map(user => ({
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            salary: user.salary,
            dateStarted: user.dateStarted,
            role: user.role,
        }))
    }

    return (
        <DataGrid
            rows={getRows()}
            columns={columns}
            initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                },
            }}
            pageSizeOptions={[5, 10]}
        />
    );
}

export default UsersTable;