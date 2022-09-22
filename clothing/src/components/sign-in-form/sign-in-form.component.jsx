import './sign-in-form.styles.scss';
import { useState } from "react";
import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword} from '../../routes/utils/firebase/firebase.utils';
import FormInput from "../form-input/form-input.component";
import Button from '../button/button.component';


const defaultformFields = {
    email: '',
    password: '',

}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultformFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultformFields);
    }

    const signInWithGoogle = async () => {
     await signInWithGooglePopup();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
             await signInAuthUserWithEmailAndPassword(
                email, 
                password
                );

            resetFormFields();
        } catch(error) {
            switch (error.code){
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                default: 
                    console.log(error);
            }
        }
    };


    const handleChange = (event) => {
        const { name, value } = event.target;
        
        setFormFields({...formFields, [name]: value});
    };

    return (
        <div className='sign-in-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput 
                    label='Email' 
                    type='email' 
                    onChange={handleChange} 
                    name="email" 
                    value={email} 
                    required 
                />

                <FormInput 
                    label='Password' 
                    type='password' 
                    onChange={handleChange} 
                    name="password" 
                    value={password} 
                    required 
                />

                <div className='buttons-container'>
                <Button type='submit'>Sign In</Button>
                <Button type='button' buttonType='google' onClick= {signInWithGoogle}>Google sign in</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;