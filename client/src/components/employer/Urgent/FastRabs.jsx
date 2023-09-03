import React from 'react';
import FastRab from './FastRab';

const FastRabs = function({fastrabotniki, isActive}) {
    const fastrabotnikiX = fastrabotniki
    return(
        <div className={isActive ? 'none' : 'row rabotniki'}>
            <div className="grid">
            {
                fastrabotnikiX
                ? fastrabotnikiX.map((e) => <FastRab fastrabotnik={e} key={e.id} />).reverse()
                : <h1 style={{textAlign: 'center', marginBottom: '100px', margin: '0 400px', width: '500px'}}>Нет объявлений</h1>
            }
            </div>
        </div>
  )
}

export default FastRabs;