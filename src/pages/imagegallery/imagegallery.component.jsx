import React, {useState, useEffect, useContext} from 'react'

import { useHistory } from 'react-router-dom'
import { Context } from '../../context/context'
import { firestore } from '../../firebase/firebase.utils'

import './imagegallery.styles.css'

export default function ImageGallery({collectionName}) {    

    const history = useHistory()
    const randomToken = Math.random().toString(36).substr(2)

    const {galleryName, fullScreen, clickedImage} = useContext(Context)
    const [currentGalleryUrls, setCurrentGalleryUrls] = fullScreen
    const [galeryName, setGaleryName] = galleryName
    const [clickedImg, setClickedImg] = clickedImage

    const [currentGallery, setCurrentGallery] = useState([])

    const FullScreenImage = event => {
        setClickedImg(event.target.style.backgroundImage.substring(5).slice(0, -2)) //.substrin(4) brise prva 4, .slice(0, -1) zadnji
        setGaleryName(event.target.id)
        history.push(`/fullscreen/${event.target.id}`)
    }
    
    useEffect(() => {
        
        let currentGalleryArray = []
        let currentGalleryArrayUrls = []

        firestore.collection(`${collectionName}`)
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach( (doc, index) => {
                let data = doc.data()
                currentGalleryArray.push(data)
                currentGalleryArrayUrls.push(data.downLink)
            })
        })
        .then(() => {
            setCurrentGallery(currentGalleryArray)
            setCurrentGalleryUrls(currentGalleryArrayUrls)
        })
    }, [])

    return(
        <div className={"imagegallery-page-wrapper"}>
            <div className="gallery-wrapper">
                {
                    currentGallery.map((data, index) => {
                        return (
                            <div
                            key={index}
                            id={randomToken}
                            className={"slikaImg"}
                            style={{backgroundImage: `url("${data.downLink}")`}} 
                            onClick={FullScreenImage} />
                        )
                    })
                }
            </div>
        </div>
    )
}