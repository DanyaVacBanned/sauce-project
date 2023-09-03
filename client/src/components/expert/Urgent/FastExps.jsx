import React from 'react';
import FastExp from './FastExp';

const FastExps = function({fastrabotniki, isActive}) {
    const fastrabotnikiX = fastrabotniki
    return(
        <div className={isActive ? 'none' : 'row rabotniki'}>
            <div className="grid">
            {
                fastrabotnikiX 
                ? fastrabotnikiX.map((e) => <FastExp fastrabotnik={e} key={e.id} />).reverse()
                : <h1 style={{textAlign: 'center', marginBottom: '100px', margin: '0 400px', width: '500px'}}>Ожидайте, объявления вскоре появяться</h1>
            }
            </div>
        </div>
  )
}

export default FastExps;