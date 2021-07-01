import React, {useState, useEffect} from 'react';

import {firestore} from '../../firebase/firebase.utils'

import Loader from '../../assets/three-dots.svg'

// import {hello} from '../../js/hello-function'

import './imgSlider.styles.css'

function ImgSlider() {
    
    const [imagesDatabase, setImagesDatabase] = useState(0)
    const [imagesLoadedDatabase, setImagesLoadedDatabase] = useState(0)
    const [backgroundImage, setBackgroundImage] = useState('')
    const [repeated, setRepeated] = useState('')

    useEffect(() => {

        let desktopOrMobileView
        let counter = 0
        let imagesArray = []  

        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            // console.log('mobilni')
            desktopOrMobileView = 'imgSlideMob'
        } else {
            // console.log('desktop')
            desktopOrMobileView = 'imgSlide'
        }
    
        firestore.collection(`${desktopOrMobileView}`)
        .orderBy('datum', 'desc')
        .get()
        .then(snapshot => {
            if(!snapshot.empty) {
                let docs = snapshot.docs
                docs.forEach((imgs, index) => {
                    // console.log(index)
                    setImagesDatabase(index)
                    let img = new Image()
                    let link = imgs.data()      
                    img.src = `${link.downLink}`
                    img.onload = () => {
                        counter++
                        setImagesLoadedDatabase(counter)
                    }
                    imagesArray.push(img)
                    setRepeated(new Array(10).fill(imagesArray).flat());
                })
            }
        })

    }, [])

    useEffect(() => {
        let timeout = []

        for(let i=0; i<repeated.length; i++) {
            timeout[i] = setTimeout(() => {      
                setBackgroundImage(repeated[i].src)
            },4300 * i)
        }

        return () => {
            timeout.forEach( x => {
                clearTimeout(x)
            })
        }
        
    }, [repeated])
        
    return (
            <div>
                {( () => {
                    if(imagesLoadedDatabase === imagesDatabase + 1) {
                        return <div className={`div-slider fade-in`} style={{backgroundImage: `url("${backgroundImage}")`}} />
                    } else {
                        return  <div className='loaderHolder'><img className='loader' src={Loader} alt="Loader" /></div>
                    }
                } ) ()}
            </div>
    )
    
}

export default ImgSlider