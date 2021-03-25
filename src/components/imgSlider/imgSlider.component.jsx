import React from 'react';

import {firestore} from '../../firebase/firebase.utils'

import Loader from '../../assets/three-dots.svg'

import {hello} from '../../js/hello-function'

import './imgSlider.styles.css'

export class ImgSlider extends React.Component {
    constructor() {
        super();

        this.state = {
            imgsInArray: 0,
            imgsLoadedNumber: 0,
            imgsArray: [],
            backgroundImage: ``
        }
    };

    componentDidMount() {
        this.timeout = []
        this.loadedImagesArray = []

        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            // console.log('mobilni')
            this.desktopOrMobileView = 'imgSlideMob'
        } else {
            // console.log('desktop')
            this.desktopOrMobileView = 'imgSlide'
        }

        firestore.collection(`${this.desktopOrMobileView}`)
        .orderBy('datum', 'desc')
        .get()
        .then(snapshot => {
            if(!snapshot.empty) {
                let dbImages = snapshot.docs
                dbImages.forEach((imgs, y) => {
                    this.tmpimg = new Image()
                    let links = imgs.data()      
                    this.tmpimg.src = `${links.downLink}`
                    this.tmpimg.onload = () => {
                        console.log('ucitana')
                        this.counter++
                        this.setState({imgsLoadedNumber: this.state.imgsLoadedNumber + 1})
                    }
                    this.loadedImagesArray.push(this.tmpimg)
                })
                this.setState({imgsInArray: this.loadedImagesArray.length})     
            }
        })
        .then(() => {
            this.repeated = new Array(10).fill(this.loadedImagesArray).flat();
            this.setState({imgsArray: this.repeated})
        })
    }

    componentDidUpdate() {
        // console.log(this.state.imgsLoadedNumber)
        // console.log(this.loadedImagesArray.length)
        if(this.state.imgsLoadedNumber === this.state.imgsInArray && this.state.imgsLoadedNumber !== 0) {
            this.setState({imgsLoadedNumber: this.state.imgsLoadedNumber + 1})
            for(let i=0; i<this.state.imgsArray.length; i++) {
                this.timeout[i] = setTimeout(() => {      
                    this.setState({backgroundImage: this.state.imgsArray[i].src})
                },4300 * i)
            } 
        }
        // hello()
    }

    componentWillUnmount() {
        // console.log(this.timeout)
        this.timeout.forEach( x => {
            clearTimeout(x)
        })
    }

    render() {

        return(
            <div>
                {( () => {
                    if(this.state.imgsLoadedNumber > this.state.imgsInArray) {
                        return <div className={`div-slider fade-in`} style={{backgroundImage: `url("${this.state.backgroundImage}")`}} />
                    } else {
                        return  <div className='loaderHolder'><img className='loader' src={Loader} alt="Loader" /></div>
                    }
                } ) ()}
            </div>
        )
    }
}