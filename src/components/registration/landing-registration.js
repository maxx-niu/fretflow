import React, {useState, useRef} from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import {ref, set} from 'firebase/database';
import {database} from '../../firebase';
import {Form, Button, Card} from 'react-bootstrap'
import { auth } from '../../firebase'

function LandingRegistration() {

    // const [username, setUsername] = useState("");
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");

    const emailRef = useRef();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const handleRegistration = async (e) => {
        // TODO: handle signup with firebase.
        await createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
        .then((userCredential) => {
            // Get the user's uid
            const uid = userCredential.user.uid;
            // Create a reference to the user's entry in the database
            const userRef = ref(database, 'users/' + uid);
            // Set the user's data in the database
            set(userRef, {
                username: usernameRef.current.value,
                email: emailRef.current.value
            });
            console.log('User added to the database');
            alert('Registration successful!');
        })
        .catch(
            (err) => {
            console.error(err);
        })

    }

  return (
    <>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Sign Up</h2>
                <Form onSubmit={handleRegistration}>
                <Form.Group id="registration-input-email">
                    <Form.Label htmlFor="email">Email: </Form.Label>
                    <Form.Control id="email" type="email" required ref={emailRef}/>
                </Form.Group>
                <Form.Group id="registration-input-username">
                    <Form.Label htmlFor="username">Username: </Form.Label>
                    <Form.Control id="username" type="text" required ref={usernameRef}/>
                </Form.Group>
                <Form.Group id="registration-input-password">
                    <Form.Label htmlFor="password">Password: </Form.Label>
                    <Form.Control id="password" type="password" required ref={passwordRef}/>
                </Form.Group>
                <Form.Group id="registration-input-confirm-password">
                    <Form.Label htmlFor="confirm-password">Password: </Form.Label>
                    <Form.Control id="confirm-password" type="password" required ref={confirmPasswordRef}/>
                </Form.Group>
                <Button type="submit" className="w-100">Sign Up</Button>
            </Form>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            Already have an account? Login here
        </div>
    </>
  );
}

export default LandingRegistration;