import React, {useState, useEffect, useContext, createRef} from 'react'

import { useHistory } from 'react-router-dom'
import { Context } from '../../context/context'
import { firestore } from '../../firebase/firebase.utils'

import './imagegallery.styles.css'

export default function ImageGallery({collectionName}) {

    let defaultLoadNumber

    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        defaultLoadNumber = Math.floor(window.innerHeight / 100) * Math.floor(window.innerWidth / 160)
    } else {
        defaultLoadNumber = Math.floor(window.innerHeight / 160 * 4) // 100px height slike, 5 slika ima u redu
    }

    //(window.innerHeight + window.scrollY) >= document.documentElement.offsetHeight // Provera da li je scroll dosao do kraja

    const history = useHistory()
    // const randomToken = Math.random().toString(36).substr(2)
    
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
    
    let options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    }

    let callback = (entries) => {
        // console.log(entries)
        entries.forEach(( entrie, index) => {
            // console.log(entrie.isIntersecting)
            // console.log(entrie)
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


    // useEffect(() => {
    //     document.addEventListener("scroll", event => {
    //         // console.log(document.documentElement.offsetHeight)
    //         // console.log(window.innerHeight)
    //         // console.log(document.documentElement.scrollTop)
    //         // console.log(window.scrollY)
    //         if((window.innerHeight + document.documentElement.scrollTop) >= document.documentElement.offsetHeight) {
    //             // console.log(event.target)
    //             // console.log('udarilo u kraj')
    //             setLoadImagesLazyLoading(loadImagesLazyLoading + defaultLoadNumber)
    //         }    
    //     })
    // })
    
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
                {console.log(loadImagesLazyLoading)}
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



// return(
//     <div className="imagegallery-page-wrapper" ref={componentRef}>
//         <div className="gallery-wrapper" >
//             {console.log(loadImagesLazyLoading)}
//             {
//                 currentGallery.map((data, index) => {
//                     if(loadImagesLazyLoading >= index) {
//                         // console.log(index, randomToken, data.downLink, FullScreenImage)
//                         return (
//                             <ImageInGalery
//                             index={index}
//                             key={index}
//                             style={data.downLink} 
//                             fullScreenFunction={FullScreenImage}/>
//                             // <div
//                             // key={index}
//                             // id={randomToken}
//                             // className={"slikaImg"}
//                             // style={{backgroundImage: `url("${data.downLink}")`}} 
//                             // onClick={FullScreenImage}/>                               
//                         )
//                     }                        
//                 })
//             }
//         </div>
//     </div>
// )