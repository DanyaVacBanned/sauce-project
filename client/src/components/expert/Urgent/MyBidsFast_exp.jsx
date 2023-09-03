import React from 'react';
import MyBidFast_exp from './MyBidFast_exp';

const MyBidsFast_exp = function({bids}) {
    const bidsX = bids.payload

    return(
        <div className='myAdvertisement'>

            <div className="grid-my-rabotodatel">
            {
                bidsX 
                ? bidsX.map((e) => <MyBidFast_exp bid={e} key={e.id} />).reverse()
                : <h1 style={{textAlign: 'center', margin: '50px 400px', width: '500px'}}>Нет созданных вакансий</h1>
            }
            </div>


        </div>
  )
}

export default MyBidsFast_exp;