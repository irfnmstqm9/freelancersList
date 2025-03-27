import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";

function App() {
    const [refresh, setRefresh] = useState(false);

    return (
        <Container sx={{ textAlign: "center", mt: 5 }}>
            <Typography variant="h3" gutterBottom>
                Freelancer Directory
            </Typography>
            <UserForm onUserAdded={() => setRefresh(!refresh)} />
            <UserList key={refresh} />
        </Container>
    );
}

export default App;
