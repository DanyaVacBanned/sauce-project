import React from 'react';
import Rabotnik_ads from './Rabotnik_ads';

const Rabotniki_ads = function({Ads_rab}) {
    const Ads_rabX = Ads_rab.postSpec
    return(
        <div className={'row rabotniki'}>
            <div className="grid">
                {
                    Ads_rabX 
                    ? Ads_rabX.map((e) => <Rabotnik_ads ads={e} key={e.id} />).reverse()
                    : <h1 style={{textAlign: 'center', marginBottom: '100px', margin: '0 400px', width: '500px', color: 'red'}}>Ожидайте, объявления вскоре появяться</h1>
                }
            </div>
        </div>
  )
}

export default Rabotniki_ads;