import React from 'react';
import Bookmark_ads_rab from './Bookmark_ads_rab';

const Bookmarks_ads_rab = function({bookmarks}) {
    const bookmarksX = bookmarks.payload
    return(
        <div className='row rabotniki'>
            <div className="grid">
                {
                    bookmarksX[0]
                    ? bookmarksX.map((e) => <Bookmark_ads_rab rabotnik={e} key={e.id} />).reverse()
                    : <h1 style={{textAlign: 'center', marginBottom: '100px', margin: '0 400px', width: '500px'}}>Нет закладок</h1>
                }
            </div>
        </div>
  )
}

export default Bookmarks_ads_rab;