import React from 'react';
import Myads_exp from './Myads_exp';

const MyBids_exp = function({ads}) {
    const adsX = ads.payload

    return(
        <div className='row rabotniki'>
            <div className="grid-my-rabotodatel">
            {
                adsX
                ? adsX.map((e) => <Myads_exp myads={e} key={e.id} />).reverse()
                : <h1 style={{textAlign: 'center', margin: '50px 400px', width: '500px'}}>Нет объявлений</h1>
            }
            </div>
        </div>
  )
}

export default MyBids_exp;