import React from 'react'
import './gallerytumb.styles.css'

export default function GalleryTumb({tumbBckImg, tumbName, klikFunkcija, dataID}) {

    return (
        <div className="tumbHolder" id={dataID} onClick={klikFunkcija} style={{backgroundImage: `url("${tumbBckImg}")`}}>
            <span id={dataID} className="tumbName">{tumbName}</span>
        </div>
    )
}