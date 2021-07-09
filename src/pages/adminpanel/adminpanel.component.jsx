import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'

import './adminpanel.styles.css'

import {firestore} from '../../firebase/firebase.utils'

import ImageGalleryUpload from '../../components/imageGalleryUpload/imagegalleryupload.component'
import SliderImageUpload from '../../components/sliderimageupload/sliderimageupload.component'
import LoadToPanel from '../../components/loadToImagesPanel/loadtopanel.component'
import AddGallery from '../../components/addGallery/addgallery.component'
import LoadImages from '../../components/loadImages/loadimages.component'

 
function AdminPanel() {

    const history = useHistory()

    const [logged, setLogged] = useState(false)

    const randomToken = Math.random().toString(36).substr(2)+Math.random().toString(36).substr(2)+Math.random().toString(36).substr(2)+Math.random().toString(36).substr(2)

    const logOut = () => {
        let auth = firestore.collection('login_info').doc(localStorage.getItem("userLog"))
        auth.update({
            userLogged: false,
            strToken: randomToken
        }).then(() => {
            localStorage.removeItem("userLog")
            localStorage.removeItem("userToken")
            history.push('/')
        })        
    }

    useEffect( () => {
        let currentDate = new Date()

        let userLoggedInfo = firestore.collection("login_info")
        userLoggedInfo.get().then( querySnapshot => {
            querySnapshot.forEach( doc => {
                let user = doc.data()
                // console.log(user)

                let compareDate = new Date(user.loggedDate.toDate())
                compareDate.setMinutes(new Date().getMinutes() + 30)

                // console.log(currentDate < compareDate)
                
                if(user.username === localStorage.getItem("userLog") && user.strToken === localStorage.getItem("userToken") && currentDate < compareDate ) {
                    console.log("1. if")
                    setLogged(true)
                } else if(user.username === localStorage.getItem("userLog") && user.strToken !== localStorage.getItem("userToken") && currentDate < compareDate) {
                    console.log("2. if")
                    localStorage.clear()
                    window.location.href = "/signin"
                } else if(user.username === localStorage.getItem("userLog") && user.strToken === localStorage.getItem("userToken") && currentDate > compareDate ) {
                    console.log("3. if")
                    localStorage.clear()
                    window.location.href = "/signin"
                }
            })
        })
    }, [])

    return (
        <div className="adminpanel-page-wrapper">
            {( () => {
                if(logged) {
                    return (
                        <div className="panel-wrapper">
                            <div className="panel-buttons">
                                <button className="home-button" onClick={() => history.push('/')}>Home</button> 
                                <button className="log-out-button" onClick={logOut}>Log out</button>
                            </div>
                            <div className="black-line" />
                            <div className="upload-wrapper">
                                <AddGallery />
                                <ImageGalleryUpload />
                                <SliderImageUpload />
                                <LoadToPanel />
                            </div>
                            <div className="black-line" />
                            <LoadImages />
                        </div>
                    )
                }
            }) ()}
        </div>
    )

}

export default AdminPanel