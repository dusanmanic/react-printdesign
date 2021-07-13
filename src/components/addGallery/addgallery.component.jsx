import React, {useState} from 'react'

import './addgallery.styles.css'

import Spiner from '../../assets/spiner.svg'
import { firestore } from '../../firebase/firebase.utils'

import InputComponent from '../input-component/input.component'

export default function AddGallery() {

    const [setSubmitDisable, submitDisable] = useState('')
    const [setSpinerEnable, spinerEnable] = useState('submit-spiner-disable')

    const [galleryName, setGalleryName] = useState("")

    const NewGallery = event => {
        console.log(event.target.value)
        setGalleryName(event.target.value)
    }

    const AddGallery = event => {

        console.log(galleryName.toLowerCase())
    
        let dodaj = {
            name: galleryName.toLowerCase(),
            id: galleryName.toLowerCase().replace(/\s/g, '')
        }
        
        firestore.collection('galerijaKategorije').doc(`${galleryName.toLowerCase().replace(/\s/g, '')}`).set(dodaj)
    
        setTimeout(() => {
            window.location.reload()
        },1500)
    
    }

    return (
        <div className="add-gallery-wrapper">
            <span className={"add-gallery-span"}> Add new category</span>
            <InputComponent label={"Ime galerije"}  type={"text"} name={"gallery"} required={"required"} handleChange={NewGallery} />

            <div className="upload-button-wrapper">
                <img className={`${spinerEnable}`} src={Spiner} alt=""/>
                <button className={`submit-upload-button ${submitDisable}`} type="submit" value="Submit" onClick={AddGallery}> Submit </button>                        
            </div>

        </div>
    )
}