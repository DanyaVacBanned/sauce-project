import React from 'react';
import Expert_ads from './Expert_ads';

const Experts_ads = function({Ads_exp}) {
    const Ads_expX = Ads_exp

    return(
        <div className={'row rabotniki'}>
            <div className="grid">
                {
                    Ads_expX
                    ? Ads_expX.map((e) => <Expert_ads ads={e} key={e.id} />).reverse()
                    : <h1 style={{textAlign: 'center', marginBottom: '100px', margin: '0 400px', width: '500px', color: 'red'}}>Нет объявлений</h1>
                }
            </div>
        </div>
  )
}

export default Experts_ads;