import React, {useState, useEffect, useContext, createRef} from 'react'

import { useHistory } from 'react-router-dom'
import { Context } from '../../context/context'
import { firestore } from '../../firebase/firebase.utils'

import './imagegallery.styles.css'

export default function ImageGallery({collectionName}) {

    const history = useHistory()
    
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
    
    let options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    }

    let callback = (entries) => {
        // console.log(entries)
        entries.forEach(( entrie, index) => {
            // console.log(entrie.isIntersecting)
            if(entrie.isIntersecting && entrie.isIntersecting !== "undefined") {
                console.log(entrie.target.className.slice(9))
                // console.log(currentGallery[index].downLink)
                entrie.target.style.backgroundImage = `url("${currentGallery[entrie.target.className.slice(9)].downLink}")`
                
            }
        })
    }

    useEffect(() => {
        let observer = new IntersectionObserver(callback, options)
        // let target = componentRef.current
        // if(target) observer.observe(target)
        refs.map( (ref, index) => {
            // console.log(ref)
            let target = ref.current
            if(target) observer.observe(target)
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
                // console.log(data)
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

    const refs = currentGallery.map(() => createRef())

    return(
        <div className="imagegallery-page-wrapper">
            <div className="gallery-wrapper">
                {console.log(currentGallery)}
                {/* {console.log(refs)} */}
                {
                    currentGallery.map((data, index) => {
                        return (
                            <div
                            className={`slikaImg ${index}`}
                            ref={refs[index]}
                            key={index}
                            onClick={FullScreenImage}/>                             
                        )
                    })
                }
            </div>
        </div>
    )
}