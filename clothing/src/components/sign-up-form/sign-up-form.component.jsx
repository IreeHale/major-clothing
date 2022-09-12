import { useState } from "react";
import { createAuthUserWithEmailAndPassword } from '../../routes/utils/firebase/firebase.utils';

const defaultformFields = {
    displayName: '',
    email: '',
    password: '',
    confirmpassword: '',

}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultformFields);
    const { displayName, email, password, confirmPassword } = formFields;
    
    console.log(formFields);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword) {
            alert("passwords do not match");
            return;
        }

        try{
            const response = await createAuthUserWithEmailAndPassword(email, password);
            console.log(response);
        } catch(error) {
            console.error('user creation encountered an error', error);
        }
    }


    const handleChange = (event) => {
        const { name, value } = event.target;
        
        setFormFields({...formFields, [name]: value});
    };

    return (
        <div>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={handleSubmit}>
                <label>Display Name</label>
                <input type='text' onChange={handleChange} name="displayName" value={displayName} required/>

                <label>Email</label>
                <input type='email' onChange={handleChange} name="email" value={email} required/>

                <label>Password</label>
                <input type='password' onChange={handleChange} name="password" value={password} required/>

                <label>Confirm Password</label>
                <input type='password' onChange={handleChange} name="confirmPassword" value={confirmPassword} required/>

                <button type='submit'>Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpForm;