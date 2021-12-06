import React, { useEffect } from 'react';
import loadingGif from '../msft-office.gif';

const Home = () => {
    return (
        <div
            style={{ backgroundColor: '#00BCF2', width: '100%', height: '100%', lineHeight: '100%' }}>
            <img src={loadingGif} alt="unauthorized" width='50%' />
        </div>

    )
}

export default Home;