import React, {useState, useEffect} from 'react'

import './sliderimageupload.styles.css'

import { firestore, storage } from '../../firebase/firebase.utils'

import SectionComponent from '../section-component/section.component'

import Spiner from '../../assets/spiner.svg'

export default function SliderImageUpload() {

    const arrayOfOptions = [
        {name: "Mobile", id: "imgSlideMob"},
        {name: "Desktop", id: "imgSlide"}
    ]

    const [arrayOfImages, setArrayOfImages] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')

    const [submitDisable, setSubmitDisable] = useState('')
    const [spinerEnable, setSpinerEnable] = useState('submit-spiner-disable')
 
    const UploadImage = event => {
        // console.log(event.target.files)
        setArrayOfImages(event.target.files)
    }

    const SelectCategory = event => {
        // console.log(event.target.value)
        setSelectedCategory(event.target.value)
    }

    const SubmitImages = event => {
        event.preventDefault()
        // console.log(arrayOfImages)

        if(arrayOfImages.length === 0) {
            alert("Izaberi fotografije")
        } else {
            if(selectedCategory.length !== 0) {
                setSubmitDisable("upload-button-disable")
                setSpinerEnable("upload-spiner-enable")
                // console.log(selectedCategory)
        
                for(let i=0; i<arrayOfImages.length; i++) {
                    let imgName = arrayOfImages[i].name
                    
                    let datum = new Date();
                    let datumUbacivanja = new Date ( datum );
                    datumUbacivanja.setMinutes ( new Date().getMinutes() - i ); 
        
                    console.log(selectedCategory)
                    let toStorage = storage.ref(`${selectedCategory}/${imgName}`)
                    let uploadTask = toStorage.put(arrayOfImages[i])
        
                    uploadTask.on('state_changed', function(snapshot){
                        // Observe state change events such as progress, pause, and resume
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        
                        console.log('Upload is ' + progress + '% done');
        
                        }, function(error) {
                        // Handle unsuccessful uploads
                            console.log(error)
                        }, function() {
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                            // console.log('File available at', downloadURL);
                                
                                let dodaj = {
                                    info: {
                                        name: imgName,
                                        docID: selectedCategory
                                    },
                                    downLink: downloadURL,
                                    datum: datumUbacivanja
                                }
                
                                firestore.collection(`${selectedCategory}`).doc(`${imgName}`).set(dodaj)
        
                            }).then(() => {
                                setTimeout(() => {
                                    setSubmitDisable("")
                                    setSpinerEnable("upload-spiner-disable")
                                    window.location.reload()
                                }, 5500)
                            })
                        
                        });
                }
            } else {
                alert("Izaberi kategoriju")
            }
        }        
    }    

    return (
        <div className={"image-gallery-upload-wrapper"}>
            <span> Upload files for slider</span>
            <form className={"upload-gallery-form"}>
                {/* {console.log(arrayOfCategory)} */}
                <input className={"custom-file-upload"} type="file" name="files" onChange={UploadImage} multiple/>
                <SectionComponent name={"image-category"} options={arrayOfOptions} selectCategory={SelectCategory} />
                <div className="upload-button-wrapper">
                    <img className={`${spinerEnable}`} src={Spiner} alt=""/>
                    <button className={`submit-upload-button ${submitDisable}`} type="submit" value="Submit" onClick={SubmitImages}> Submit </button>                        
                </div>
            </form>
        </div>
    )
}