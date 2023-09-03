import React from 'react';
import Myads_rab from './Myads_rab';

const MyBids = function({ads}) {
    const adsX = ads.payload


    return(
        <div className='row rabotniki'>
            <div className="grid-my-rabotodatel">
                {
                    adsX 
                    ? adsX.map((e) => <Myads_rab myads={e} key={e.id} />).reverse()
                    : <h1 style={{textAlign: 'center', margin: '50px 400px', width: '500px'}}>Нет созданных вакансий</h1>
                }
            </div>
        </div>
  )
}

export default MyBids;