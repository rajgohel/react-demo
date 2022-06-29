import React, { useState } from 'react';
import { InputText } from '../../shared/input';
import Card from 'react-bootstrap/Card';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const inputs = [{
    "type": "text",
    "title": "First Name",
    "name": "FirstName",
    "class": "text",
    "placeholder": "Enter first name"
},
{
    "type": "text",
    "title": "Last Name",
    "name": "LasttName",
    "class": "text",
    "placeholder": "Enter last name"
},
{
    "type": "text",
    "title": "Email",
    "name": "Email",
    "class": "text",
    "placeholder": "Enter first name"
},
{
    "type": "password",
    "title": "Password",
    "name": "Password",
    "class": "text",
    "placeholder": "Password"
}];

const SignUp = () => {
    const [inputState, setInputState] = useState(inputs.reduce((acc, input) => {
        return { ...acc, [input.name]: '' };
    }, {}));
    let navigate = useNavigate();

    const onChange = (name, value) => {
        setInputState((inputField) => ({ ...inputField, [name]: value }));
    }
    const handleSignIn = (e) => {
        e.stopPropagation();
        navigate("/signIn", { replace: true });
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
            <h2>Sign Up</h2>
            <Card style={{ width: "40%", padding: "2rem" }} >
                <Form >
                    {list}
                    <Button variant="primary" type="button" onClick={handleSignIn}>
                        Sign Up
                    </Button>
                </Form>
            </Card>
        </div>
    );
}

export default SignUp;