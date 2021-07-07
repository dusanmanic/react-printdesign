import React, {useEffect, useState, useContext} from 'react'

import './loadtopanel.styles.css'

import Spiner from '../../assets/spiner.svg'

import SectionComponent from '../section-component/section.component'

import { firestore, storage } from '../../firebase/firebase.utils'

import { Context } from '../../context/context'


export default function LoadToPanel() {

    const {selectedGallery, selectedSlider} = useContext(Context)

    const sliderView = [
        {name: "imgSlide"},
        {name: "imgSlideMob"}
    ]

    const [selectedImageSlider, setSelectedImageSlider] = selectedSlider
    const [selectedImgGallery, setSelectedImgGallery] = selectedGallery
    const [arrayOfCategory, setArrayOfCategory] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectViewSlider, setSelectViewSlider] = useState('')

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

    const ListViewSlide = event => {
        if (event.target.checked === true) {
            // console.log(event.target.id)
            setSelectViewSlider(event.target.id)
        }
        
    }

    const SelectCategory = event => {
        // console.log(event.target.value)
        setSelectedCategory(event.target.value)
    }

    const ListImages = event => {
        let dataArray = []
        let dataSliderArray = []

        if(selectedCategory.length !== 0) {
            firestore.collection(`${selectedCategory}`).get()
            .then(querySnapshot => {
    
                querySnapshot.forEach((doc, index) => {
                    let data = doc.data()
                    dataArray.push(data)
                })
            })
            .then(() => {
                setSelectedImgGallery(dataArray)
            })
        }

        if(selectViewSlider.length !== 0) {
            console.log(selectViewSlider)
            if(selectViewSlider.length !== 0) {
                firestore.collection(`${selectViewSlider}`).get()
                .then(querySnapshot => {
                        querySnapshot.forEach((doc, index) => {
                        let data = doc.data()
                        dataSliderArray.push(data)
                    })
                })
                .then(() => {
                    setSelectedImageSlider(dataSliderArray)
                })
            }
        }
    }

    const DeleteCategory = event => {
        console.log(selectedCategory)

        setSubmitDisable("upload-button-disable")
        setSpinerEnable("upload-spiner-enable")

        if(window.confirm(`Da li sigurno zelis da obrises ${selectedCategory} album sa slikama ?`)) {
            firestore.collection(`${selectedCategory}`)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                        let data = doc.data()
                        firestore.collection(`${selectedCategory}`).doc(`${data.info.name}`).delete()
                        // console.log(data.info.name)                 
                    })
            })            
            firestore.collection('galerijaKategorije').doc(`${selectedCategory}`).delete()

            storage.ref(`${selectedCategory}`).listAll().then((listResults) => {
                listResults.items.map(item => {
                    item.delete()
                })
            })
            setTimeout(() => {
                setSubmitDisable("")
                setSpinerEnable("upload-spiner-disable")
                window.location.reload()
            }, 5500)
        }          
    }

    return (
        <div className="del-imgs-from-server-wrapper">
            <span>Učitaj galeriju:</span>
            <div className="select-image-category">
                <div className={"view-checkbox"}>
                    {
                        sliderView.map( (view, index) => {
                            return (
                                <div key={index} >
                                    <input type="checkbox" id={view.name} name={view.name} onChange={ListViewSlide}/>
                                    <label>{view.name}</label>
                                </div>
                            )
                        })
                    }
                </div>
                <SectionComponent name={"image-category"} options={arrayOfCategory} selectCategory={SelectCategory}/>                
                <div className="upload-button-wrapper">
                    <button className={`submit-upload-button`} type="submit" value="Submit" onClick={ListImages}> Submit </button>
                    <img className={`${spinerEnable}`} src={Spiner} alt=""/>
                    <button className={`submit-upload-button delete-button ${submitDisable}`} onClick={DeleteCategory}> Delete </button>                     
                </div>
            </div>
        </div>
    )
}