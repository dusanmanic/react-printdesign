import React, {useState, useEffect, useContext, useRef} from 'react'

import { useHistory } from 'react-router-dom'
import { Context } from '../../context/context'
import { firestore } from '../../firebase/firebase.utils'

import './imagegallery.styles.css'

export default function ImageGallery({collectionName}) {

    const componentRef = useRef(null);

    let defaultLoadNumber

    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        defaultLoadNumber = Math.floor(window.innerHeight / 100) * Math.floor(window.innerWidth / 160)
    } else {
        defaultLoadNumber = Math.floor(window.innerHeight / 160 * 3) // 100px height slike, 5 slika ima u redu
    }

    //(window.innerHeight + window.scrollY) >= document.documentElement.offsetHeight // Provera da li je scroll dosao do kraja

    const history = useHistory()
    const randomToken = Math.random().toString(36).substr(2)  
    
    const {galleryName, fullScreen, clickedImage} = useContext(Context)
    const [currentGalleryUrls, setCurrentGalleryUrls] = fullScreen
    const [galeryName, setGaleryName] = galleryName
    const [clickedImg, setClickedImg] = clickedImage
    const [loadImagesLazyLoading, setLoadImagesLazyLoading] = useState(defaultLoadNumber)
    const [currentGallery, setCurrentGallery] = useState([])

    const FullScreenImage = event => {
        setClickedImg(event.target.style.backgroundImage.substring(5).slice(0, -2)) //.substrin(4) brise prva 4, .slice(0, -1) zadnji
        setGaleryName(event.target.id)
        history.push(`/fullscreen/${event.target.id}`)
    }    

    useEffect(() => {
        document.addEventListener("scroll", () => {
                
            if((window.innerHeight + window.scrollY) >= document.documentElement.offsetHeight) {
                setLoadImagesLazyLoading(loadImagesLazyLoading + defaultLoadNumber)
            }    
        })
    }) 
    
    useEffect(() => {        
        let currentGalleryArray = []
        let currentGalleryArrayUrls = []

        firestore.collection(`${collectionName}`)
        .get()
        .then(querySnapshot => {
            let allDocs = querySnapshot.docs
            allDocs.forEach( (doc, index) => {
                let data = doc.data()
                console.log(data)
                currentGalleryArray.push(data)
                currentGalleryArrayUrls.push(data.downLink)                
            })            
        })
        .then(() => {
            console.log(currentGalleryArray)
            currentGalleryArray.sort(function(a, b){
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return b.datum - a.datum
              });
            console.log(currentGalleryArray)
            setCurrentGallery(currentGalleryArray)
            setCurrentGalleryUrls(currentGalleryArrayUrls)
        })
    }, [])

    return(
        <div className="imagegallery-page-wrapper" ref={componentRef}>
            <div className="gallery-wrapper" >
                {console.log(loadImagesLazyLoading)}
                {
                    currentGallery.map((data, index) => {
                        if(loadImagesLazyLoading >= index) {
                            return (
                                <div
                                key={index}
                                id={randomToken}
                                className={"slikaImg"}
                                style={{backgroundImage: `url("${data.downLink}")`}} 
                                onClick={FullScreenImage} />                                
                            )
                        }                        
                    })
                }
            </div>
        </div>
    )
}