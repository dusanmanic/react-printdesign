import React, {useState} from 'react'

import {useHistory} from 'react-router-dom'

import './signin.styles.css'

import {firestore} from '../../firebase/firebase.utils'
import Spiner from '../../assets/spiner.svg'



export default function SignIn() {

    const history = useHistory()    

    const loginDate = new Date()
    console.log(loginDate)

    const [submitDisable, setSubmitDisable] = useState('')
    const [spinerEnable, setSpinerEnable] = useState('submit-spiner-disable')

    const randomToken = Math.random().toString(36).substr(2)+Math.random().toString(36).substr(2)+Math.random().toString(36).substr(2)+Math.random().toString(36).substr(2)

    const handleStateSubmit = event => {
        event.preventDefault()

        setSubmitDisable('submit-button-disable')
        setSpinerEnable('submit-spiner-enable')

        let auth = firestore.collection("login_info").doc(`${event.target.username.value}`)

        auth.get().then((doc) => {
            let authData = doc.data()

            if(typeof authData === "undefined") {
                console.log('nema taj')
                alert("Wrong username or password")
                window.location.reload()
            } else {
                if(authData.username === event.target.username.value && authData.pass === event.target.password.value) {
                    console.log('Korisnik logovan')
                    localStorage.setItem("userToken", randomToken)
                    localStorage.setItem("userLog", event.target.username.value)
                    auth.update({
                        // userLogged: true,
                        loggedDate: loginDate,
                        strToken: randomToken
                    }).then(() => {
                        history.push('/adminpanel')
                    })
                } else {
                    alert("Wrong username or password")
                    window.location.reload()
                }
            }
        })
        // console.log(event.target.username.value)
        // console.log(event.target.password.value)
    }

    return(
        <div className='sign-in-wrapper'>
            <div className='header-background' />
            <div className="sign-in-page">
                <form className="signin-form" onSubmit={handleStateSubmit}> 
                    <div className="signin-wrapper">
                        <input className="signin-input" type="username" name="username" required="required"/>
                        <label className="signin-label">Username</label>
                    </div>
                    <div className="signin-wrapper">
                        <input className="signin-input" type="password" name="password" required="required"/>
                        <label className="signin-label">Password</label>
                    </div>
                    <div className="signin-button-wrapper">
                        <img className={`${spinerEnable}`} src={Spiner} alt=""/>
                        <button className={`submit-button ${submitDisable}`} type="submit" value="Submit"> Submit </button>                        
                    </div>       
                </form>
            </div>
        </div>
    )
}