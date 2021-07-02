import React, {useState, useEffect} from 'react'

import { firestore } from '../../firebase/firebase.utils'

import './imagegallery.styles.css'

export default function ImageGallery({collectionName}) {

    const [currentGallery, setCurrentGallery] = useState([])
    
    useEffect(() => {
        
        let currentGalleryArray = []

        firestore.collection(`${collectionName}`)
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach( (doc, index) => {
                let data = doc.data()
                currentGalleryArray.push(data)
            })
        })
        .then(() => {
            setCurrentGallery(currentGalleryArray)
        })

    }, [])


    return(
        <div>
            {
                currentGallery.map((data, index) => {
                    return (
                        <div key={index}>
                            <p>{data.name}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}