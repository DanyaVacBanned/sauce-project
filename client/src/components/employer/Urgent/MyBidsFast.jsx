import React from 'react';
import MyBidFast from './MyBidFast';

const MyBidsFast = function({bids}) {
    const bidsX = bids.payload


    return(
        <div className='myAdvertisement'>
            <div className="grid-my-rabotodatel">
            {
                bidsX
                ? bidsX.map((e) => <MyBidFast bid={e} key={e.id} />).reverse()
                : <h1 style={{textAlign: 'center', margin: '50px 400px', width: '500px'}}>Нет созданных вакансий</h1>
            }
            </div>


        </div>
  )
}

export default MyBidsFast;