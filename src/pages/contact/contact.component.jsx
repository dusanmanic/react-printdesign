import React from 'react'

import './contact.styles.css'

export default function Contact() {

    return (
        <div className="containerKontakt">
            <div className="mapouter">
                <div className="gmap_canvas">
                    <iframe className="iframe-wrapper" src={"https://maps.google.com/maps?q=kraljevica%20marka%2016&t=&z=19&ie=UTF8&iwloc=&output=embed"} frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
                </div>
            </div>
            <span className="span-ce contactText">
                Kontakt: <br/> 064/ 186 185 9; <br/> 063/ 180 314 2; <br/> 018/ 45 11 254; <br/> email: printdesign.nis@gmail.com; <br/> Kraljevića Marka 16, 18000 Niš
            </span>
        </div>
    )
}