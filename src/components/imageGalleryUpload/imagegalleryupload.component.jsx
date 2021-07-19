import React, {useState, useEffect} from 'react'

import './imagegalleryupload.styles.css'

import { firestore, storage } from '../../firebase/firebase.utils'

import SectionComponent from '../section-component/section.component'

import Spiner from '../../assets/spiner.svg'

export default function ImageGalleryUpload() {

    const [arrayOfImages, setArrayOfImages] = useState([])
    const [arrayOfCategory, setArrayOfCategory] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')

    const [submitDisable, setSubmitDisable] = useState('')
    const [spinerEnable, setSpinerEnable] = useState('submit-spiner-disable')

    useEffect(() => {
        let categoryArray = []

        firestore.collection("galerijaKategorije").get()
        .then(querySnapshot => {
            querySnapshot.forEach((doc, index) => {
                let data = doc.data()
                categoryArray.push(data)
            })
        }).then(() => {
            setArrayOfCategory(categoryArray)
        })
    }, [])
 
    const UploadImage = event => {
        // console.log(event.target.files)
        setArrayOfImages(event.target.files)
    }

    const SelectCategory = event => {
        // console.log(event.target.value)
        setSelectedCategory(event.target.value)
    }

    const dataURLtoFile = (dataurl, filename) => {

        let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],            
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
            
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        // console.log(arr)
        return new File([u8arr], filename, {type:mime});
    }

    const SubmitImages = event => {
        event.preventDefault()
        let counter = 0

        if(arrayOfImages.length === 0) {
            alert("Izaberi fotografije")
        } else {
            if(selectedCategory.length !== 0) {
                setSubmitDisable("upload-button-disable")
                setSpinerEnable("upload-spiner-enable")


                for(let i=0; i<arrayOfImages.length; i++) {
                    let imgName = arrayOfImages[i].name
                    
                    ///////////////////////////////////////////////

                    let reader = new FileReader()

                    reader.readAsDataURL(arrayOfImages[i])

                    reader.onload = event => {
                        const imgElement = new Image()
                        imgElement.src = event.target.result

                        imgElement.onload = event => {
                            const canvas = document.createElement("CANVAS")

                            let MAX_WIDTH = 1920;                      

                            const scaleSize = MAX_WIDTH / event.target.width;
                            canvas.width = MAX_WIDTH;
                            canvas.height = event.target.height * scaleSize;

                            const ctx = canvas.getContext("2d");

                            ctx.drawImage(event.target, 0, 0, canvas.width, canvas.height);

                            const srcEncoded = ctx.canvas.toDataURL("image/jpeg", 0.6)

                            let imageFile = dataURLtoFile(srcEncoded, imgName)
                            
                            /////////////////////////////////////////////////

                            ////////////////////////////////////////////////

                            let datum = new Date();
                            let datumUbacivanja = new Date ( datum );
                            datumUbacivanja.setMinutes ( new Date().getMinutes() - i ); 
                
                            // console.log(selectedCategory)
                            let toStorage = storage.ref(`${selectedCategory}/${imgName}`)
                            let uploadTask = toStorage.put(imageFile)
                
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
                                    console.log('File available at', downloadURL);
                                        counter++
        
                                        let dodaj = {
                                            info: {
                                                name: imgName,
                                                docID: selectedCategory
                                            },
                                            downLink: downloadURL,
                                            datum: datumUbacivanja
                                        }
                        
                                        firestore.collection(`${selectedCategory}`).doc(`${imgName}`).set(dodaj)
                                        
                                        let tumb = {
                                            tumbUrl: downloadURL
                                        }
                
                                        firestore.collection('galerijaKategorije').doc(`${selectedCategory}`).update(tumb)  
                
                                    }).then(() => {
                                        if(counter === arrayOfImages.length) {
                                            setTimeout(() => {
                                                setSubmitDisable("")
                                                setSpinerEnable("upload-spiner-disable")
                                                // window.location.reload()
                                            }, 2000)
                                        }
        
                                    })
                                
                                });
                        }
                    }

                    ///////////////////////////////////////////////                   

                }
            } else {
                alert("Izaberi kategoriju")
            }
        }        
    }    

    return (
        <div className="image-gallery-upload-wrapper">
            <span className="span-ce"> Upload files to gallery</span>
            <form className="upload-gallery-form">
                {/* {console.log(arrayOfCategory)} */}
                <input className="custom-file-upload" type="file" name="files" onChange={UploadImage} multiple/>
                <SectionComponent name={"image-category"} options={arrayOfCategory} selectCategory={SelectCategory} />
                <div className="upload-button-wrapper">
                    <img className={`${spinerEnable}`} src={Spiner} alt=""/>
                    <button className={`submit-upload-button ${submitDisable}`} type="submit" value="Submit" onClick={SubmitImages}> Submit </button>                        
                </div>
            </form>
        </div>
    )
}