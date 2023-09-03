import React from 'react';
import Rabotnik from './Rabotnik';

const Rabotniki = function({rabotniki}) {
    const rabotnikiX = rabotniki.sortdedRabotniki.users
    return(
        <div className='row rabotniki'>
            <div className="grid">
                {
                    rabotnikiX
                    ? rabotnikiX.map((e) => <Rabotnik rabotnik={e} key={e.id} />).reverse()
                    : <h1 style={{textAlign: 'center', marginBottom: '100px', margin: '0 400px', width: '500px', color: 'red'}}>Нет объявлений</h1>
                }
            </div>
        </div>
  )
}

export default Rabotniki;