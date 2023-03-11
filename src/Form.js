import { useState } from "react";


function Form() {
    let [inputs, setInputs] = useState(() => ({ email: '', password: '', confirmPassword: '' }));

    let [errors, setErrors] = useState(() => (
        {emailErr:'invalid Email Format',
         passwordErr:'Password must be at least 8 characters',
        matchErr: 'Passwords do not match'}));

    function setEmail(e) {
        let temp=e.target.value.trim();
        let check=temp.indexOf('@');
        let check2=temp.lastIndexOf('.')
        if(temp.length>0 && check!==0 && check!==-1 && check2>check+1 && check2!==temp.length-1) {
            setInputs(inputs=>({...inputs,email:temp}));
            document.getElementById('email').classList.add('green');
            setErrors(errors=>({...errors,emailErr:''}));
        }
        else {
            document.getElementById('email').classList.remove('green');
            setErrors(errors=>({...errors,emailErr:'invalid Email Format'}));
        }
    }

    function setPassword(e) {
        let temp=e.target.value;
        setInputs(inputs=>({...inputs,password:temp}));
        if(temp.length>7) {
            document.getElementById('password').classList.add('green');
            setErrors(errors=>({...errors,passwordErr:''}));
        }
        else {
            document.getElementById('password').classList.remove('green');
            setErrors(errors=>({...errors,passwordErr:'Password must be at least 8 characters'}));
        }

        // double checking whether passwords are matching or not
        if(temp.length>0 && inputs.confirmPassword.length===temp.length && inputs.confirmPassword.includes(temp)) {
            document.getElementById('confirm').classList.add('green');
            setErrors(errors=>({...errors,matchErr:''}));
        }
        else{
            document.getElementById('confirm').classList.remove('green');
            setErrors(errors=>({...errors,matchErr:'Passwords do not match'}));
        }
    }

    function setConfirmPassword(e) {
        let temp=e.target.value;
        if(temp.indexOf(inputs.password)!==-1 && temp.length===inputs.password.length) {
            setInputs(inputs=>({...inputs,confirmPassword:temp}));
            document.getElementById('confirm').classList.add('green');
            setErrors(errors=>({...errors,matchErr:''}));
        }
        else {
            document.getElementById('confirm').classList.remove('green');
            setErrors(errors=>({...errors,matchErr:'Passwords do not match'}));
        }
    }

    function submission() {
        if(errors.emailErr.length===0 && errors.matchErr.length===0 && errors.passwordErr.length===0) {
            alert('form submitted successfully')
        }
        else {
            alert('form cannot be submitted')
        }
    }


    return (
        <div className="form">
            <label>
                <h3>Email:</h3>
                <input
                    type='text'
                    id="email"
                    className="email"
                    onChange={(event)=> setEmail(event)}
                />
            </label>
            <span>{errors.emailErr}</span>
            <label>
                <h3>Password:</h3>
                <input
                    type='password'
                    id="password"
                    className="email"
                    onChange={(event)=>setPassword(event)}
                />
            </label>
            <span>{errors.passwordErr}</span>
            <label>
                <h3>Confirm Password:</h3>
                <input
                    type='password'
                    id="confirm"
                    className="confirm"
                    onChange={(event)=>setConfirmPassword(event)}
                />
            </label>
            <span style={{display:'block'}}>{errors.matchErr}</span>
            <button onClick={submission}>
                Sign Up
            </button>
        </div>
    )
}

export default Form;