import React, {useState, useEffect, useContext} from 'react'
import { useHistory } from 'react-router-dom'
import { firestore } from '../../firebase/firebase.utils'

import { Context } from '../../context/context'

import GalleryTumb from '../../components/gallerytumb/gallerytumb.component'

import './gallery.styles.css'

export default function Gallery() {

    const history = useHistory()

    const {galleryName} = useContext(Context)
    const [galeryName, setGaleryName] = galleryName

    const [galleryTumb, setGalleryTumb] = useState([])

    const openCurrentGallery = event => {
        console.log(event.target.id)
        setGaleryName(event.target.id)
        history.push(`/slike/${event.target.id}`)
    }

    useEffect(() => {
        let galleryObjects = []
        firestore.collection("galerijaKategorije")
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                let docData = doc.data()
                galleryObjects.push(docData)        
            })
        }).then(() => {
            setGalleryTumb(galleryObjects)
            // console.log(galleryObjects[0].name.charAt(0).toUpperCase() + galleryObjects[0].name.toLowerCase().slice(1))
        })
    }, [])

    console.log(galleryTumb)

    return (
        <div className="gallery-page-wrapper">
            {
                galleryTumb.map((data, index) => {
                    // console.log(data.name)
                    return  (
                        <GalleryTumb
                        key={index}
                        dataID={data.id}
                        klikFunkcija={openCurrentGallery}
                        tumbBckImg={data.tumbUrl}
                        tumbName={data.name.charAt(0).toUpperCase() + data.name.toLowerCase().slice(1)} />
                    )
                })
            }
        </div>
    )
}


// {(() => {
//     if(galleryTumb.length !== 0) {
//         galleryTumb.map( data => {
//             console.log(data.name)
//             return <div>
//                 <p>{data.name}</p>
//             </div>
//         })
//     }
// }) ()}