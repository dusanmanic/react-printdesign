import React, {useContext} from 'react'

import './loadimages.styles.css'

import { firestore, storage } from '../../firebase/firebase.utils'

import Trash from '../../assets/trash.png'

import { Context } from '../../context/context'


export default function LoadImages() {

    const {selectedGallery, selectedSlider} = useContext(Context)    

    const [selectedImgGallery, setSelectedImgGallery] = selectedGallery
    const [selectViewSlider, setSelectViewSlider] = selectedSlider

    const DeleteImage = event => {
        console.log(event.target.id)
        console.log(event.target.classList[1])

        const newGallery = selectedImgGallery.filter(item => item.info.name !== event.target.classList[1])

        firestore.collection(`${event.target.id}`).doc(`${event.target.classList[1]}`).delete()

        storage.ref().child(`${event.target.id}/${event.target.classList[1]}`).delete()
       
        setSelectedImgGallery(newGallery)
    }

    const DeleteImageSlider = event => {
        console.log(event.target.id)
        console.log(event.target.classList[1])

        const newGallery = selectViewSlider.filter(item => item.info.name !== event.target.classList[1])

        firestore.collection(`${event.target.id}`).doc(`${event.target.classList[1]}`).delete()

        storage.ref().child(`${event.target.id}/${event.target.classList[1]}`).delete()
       
        setSelectViewSlider(newGallery)
    }

    return (
        <div className="load-images-wrapper">
            {
                selectedImgGallery.map((data, index) =>{
                    return (
                        <div key={index} className="list-image" style={{backgroundImage: `url("${data.downLink}")`}}>
                            <img id={data.info.docID} className={`trash-img ${data.info.name}`} src={Trash} alt="" onClick={DeleteImage} />
                        </div>
                    )
                })
            }
            {
                
                selectViewSlider.map((data, index) =>{
                    return (
                        <div key={index} className="list-image" style={{backgroundImage: `url("${data.downLink}")`}}>
                            <img id={data.info.docID} className={`trash-img ${data.info.name}`} src={Trash} alt="" onClick={DeleteImageSlider} />
                        </div>
                    )
                })
            }
        </div>
    )
}