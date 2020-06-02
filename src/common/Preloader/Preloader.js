import React from 'react';
import preloader from "../../assets/images/preloader1.gif";

let Preloader = (props) => {
    return <div  style={ { backgroundColor: 'white' } }>
        <img src={preloader} style={ { width: '8w', height: '8vh' } }/>
    </div>
}

export default Preloader;