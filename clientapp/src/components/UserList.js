import React, { useEffect, useState } from "react";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from "@mui/material";
import api from "../services/api";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await api.getUsers();
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.deleteUser(id);
            fetchUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setOpen(true);
    };

    const handleUpdate = async () => {
        try {
            await api.updateUser(selectedUser.id, selectedUser);
            fetchUsers();
            setOpen(false);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <Paper elevation={3} sx={{ maxWidth: 800, margin: "20px auto", padding: 2 }}>
            <Typography variant="h5" align="center" gutterBottom>
                Freelancers List
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Skillsets</TableCell>
                            <TableCell>Hobby</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.phoneNumber}</TableCell>
                                <TableCell>{user.skillsets}</TableCell>
                                <TableCell>{user.hobby}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" onClick={() => handleEdit(user)} sx={{ marginRight: 1 }}>
                                        Edit
                                    </Button>
                                    <Button variant="contained" color="error" onClick={() => handleDelete(user.id)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Update Dialog */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Username"
                        fullWidth
                        margin="dense"
                        value={selectedUser?.username || ""}
                        onChange={(e) => setSelectedUser({ ...selectedUser, username: e.target.value })}
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        margin="dense"
                        value={selectedUser?.email || ""}
                        onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                    />
                    <TextField
                        label="Phone Number"
                        fullWidth
                        margin="dense"
                        value={selectedUser?.phoneNumber || ""}
                        onChange={(e) => setSelectedUser({ ...selectedUser, phoneNumber: e.target.value })}
                    />
                    <TextField
                        label="Skillsets"
                        fullWidth
                        margin="dense"
                        value={selectedUser?.skillsets || ""}
                        onChange={(e) => setSelectedUser({ ...selectedUser, skillsets: e.target.value })}
                    />
                    <TextField
                        label="Hobby"
                        fullWidth
                        margin="dense"
                        value={selectedUser?.hobby || ""}
                        onChange={(e) => setSelectedUser({ ...selectedUser, hobby: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleUpdate} color="primary" variant="contained">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default UserList;
