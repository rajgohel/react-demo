import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { InputText } from '../../shared/input';
import { useNavigate } from "react-router-dom";

const inputs = [{
    "type": "text",
    "title": "User Name",
    "name": "userName",
    "class": "text",
    "placeholder": "User Name"
}, {
    "type": "password",
    "title": "Password",
    "name": "password",
    "class": "text",
    "placeholder": "Password"
}];

const SignIn = () => {
    const [inputState, setInputState] = useState(inputs.reduce((acc, input) => {
        return { ...acc, [input.name]: '' };
    }, {}));
    let navigate = useNavigate();

    const onChange = (name, value) => {
        setInputState((inputField) => ({ ...inputField, [name]: value }));
    }
    const handleSignIn = (e) => {
        e.stopPropagation();
        if (inputState.userName && inputState.password) {
            localStorage.setItem("token", "userToken");
            navigate("/dashboard", { replace: true });
        }
        else{
            alert("Please enter User Name and Password.")
        }
    }
    const list = inputs.map(input => {
        return (
            <InputText
                value={inputState[input.name]}
                key={input.name}
                type={input.type}
                name={input.name}
                title={input.title}
                className={input.class}
                placeholder={input.placeholder}
                onChange={onChange}
            />
        );
    });
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "4rem" }}>
            <h2>Sign In</h2>
            <Card style={{ width: "40%", padding: "2rem" }} >
                <Form >
                    {list}
                    <Button variant="primary" type="button" onClick={handleSignIn}>
                        Sign In
                    </Button>
                </Form>
            </Card>
        </div>
    );
}

export default SignIn;