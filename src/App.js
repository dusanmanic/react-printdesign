import React, {Fragment, useState} from 'react';

import {Switch, Route} from 'react-router-dom'

import HomePage from './pages/homepage/homepage.component'
import AboutUs from './pages/about-us-page/about-us-page.component'
import Header from './components/header/header.component'
import SignIn from './pages/signin-page/signin.component'
import AdminPanel from './pages/adminpanel/adminpanel.component'
import Gallery from './pages/gallery/gallery.component';
import ImageGallery from './pages/imagegallery/imagegallery.component';
import FullScreenImg from './pages/fullscreenimg/fullscreenimg.component';
import Contact from './pages/contact/contact.component';

import { Context } from './context/context';

import './App.css';

function App() {

  const [galleryName, setGalleryName] = useState('')
  const [imgsUrls, setImgsUrls] = useState([])
  const [clickedImage, setClikedImage] = useState('')
  const [selectedGallery, setSelectedGallery] = useState([])
  const [selectedSlider, setSelectedSlider] = useState([])

  let contextObject = {
    galleryName: [galleryName, setGalleryName],
    fullScreen: [imgsUrls, setImgsUrls],
    clickedImage: [clickedImage, setClikedImage],
    selectedGallery: [selectedGallery, setSelectedGallery],
    selectedSlider: [selectedSlider, setSelectedSlider]
  }
  
  return (
    <div className="App">
      <Context.Provider value={contextObject}>
        <Switch>
          <Route exact path='/adminpanel' component={AdminPanel} />
          <Fragment>
            <Header />
              <Route exact path='/' component={HomePage} />
              <Route exact path='/onama' component={AboutUs} />
              <Route exact path='/signin' component={SignIn} />
              <Route exact path='/galerija' component={Gallery} />
              <Route exact path={`/fullscreen/${galleryName}`} 
              render={() =>
                <FullScreenImg
                imgUrl={imgsUrls}
                clickedImgUrl={clickedImage}/>} />
              <Route exact path={`/slike/${galleryName}`} 
              render={() =>
                <ImageGallery
                collectionName={galleryName}/>} />
              <Route exact path='/kontakt' component={Contact} />
          </Fragment>
        </Switch>
      </Context.Provider>
    </div>
  )
}

export default App;
