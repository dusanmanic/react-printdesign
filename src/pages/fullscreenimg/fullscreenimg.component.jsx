import React, {useState, useEffect} from 'react'

import { useHistory } from 'react-router-dom'

import './fullscreenimg.styles.css'

export default function FullScreenImg({imgUrl, clickedImgUrl}) {

    let history = useHistory()

    let previousImageIndex, nextImageIndex

    const [imgsUrls, setImgsUrls] = useState([])
    const [currentImageUrl, setCurrentImageUrl] = useState('')

    useEffect(() => {
        setImgsUrls(imgUrl)
        setCurrentImageUrl(clickedImgUrl)
    }, [])

    const NextImage = () => {

        imgsUrls.forEach((img , index) => {
            if(currentImageUrl === img) {
                nextImageIndex = index + 1                  
            }
        })
        imgsUrls.forEach((img , index) => {
            if(nextImageIndex === index) {
                setCurrentImageUrl(img)
            }
        })
        if(nextImageIndex === imgsUrls.length) {
            setCurrentImageUrl(imgsUrls[0])
            nextImageIndex = 0
        }

    }

    const PreviousImage = () => {
        imgsUrls.forEach((img , index) => {
            if(currentImageUrl === img) {
                previousImageIndex = index - 1                  
            }
        })
        imgsUrls.forEach((img , index) => {
            if(previousImageIndex === index) {
                setCurrentImageUrl(img)
            }
        })
        if(previousImageIndex === 0) {
            console.log('uslo ovde')
            setCurrentImageUrl(imgsUrls[imgsUrls.length - 1])
            nextImageIndex = 0
        }
    }

    const ExitImage = () => {
        history.push('/galerija')
    }

    return (
        <div className={"fullscreenimg-wrapper"}>
            <div className={"fullscreenimg"} style={{backgroundImage: `url("${currentImageUrl}")`}} >
                <button className="previous-button" onClick={PreviousImage}>Previous</button> 
                <button className="exit-button" onClick={ExitImage} >Exit</button> 
                <button className="next-button" onClick={NextImage}>Next</button>
            </div>
        </div>
    )
}