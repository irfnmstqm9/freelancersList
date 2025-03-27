import React, { useState, useEffect } from "react";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";
import api from "../services/api";

const UserForm = ({ onUserAdded, editingUser, onUserUpdated }) => {
    const [user, setUser] = useState(editingUser || {
        username: "",
        email: "",
        phoneNumber: "",
        skillsets: "",
        hobby: "",
    });

    useEffect(() => {
        if (editingUser) setUser(editingUser);
    }, [editingUser]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (user.id) {
                await api.updateUser(user.id, user);
                onUserUpdated();
            } else {
                await api.addUser(user);
                onUserAdded();
            }
            setUser({ username: "", email: "", phoneNumber: "", skillsets: "", hobby: "" });
        } catch (error) {
            console.error("Error saving user:", error);
        }
    };

    return (
        <Paper elevation={3} sx={{ padding: 3, maxWidth: 400, margin: "20px auto" }}>
            <Typography variant="h5" align="center" gutterBottom>
                {user.id ? "Edit Freelancer" : "Add Freelancer"}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField label="Username" name="username" value={user.username} onChange={handleChange} required fullWidth />
                <TextField label="Email" name="email" type="email" value={user.email} onChange={handleChange} required fullWidth />
                <TextField label="Phone Number" name="phoneNumber" value={user.phoneNumber} onChange={handleChange} required fullWidth />
                <TextField label="Skillsets" name="skillsets" value={user.skillsets} onChange={handleChange} required fullWidth />
                <TextField label="Hobby" name="hobby" value={user.hobby} onChange={handleChange} required fullWidth />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    {user.id ? "Update User" : "Add User"}
                </Button>
            </Box>
        </Paper>
    );
};

export default UserForm;
