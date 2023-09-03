import React from 'react';
import Fast_Bookmark from './Fast_bookmark';

const Fast_bookmarks = function({bookmarks}) {
    const bookmarksX = bookmarks
    return(
        <div className='row rabotniki'>
            <div className="grid">
                {
                    bookmarksX 
                    ? bookmarksX.map((e) => <Fast_Bookmark rabotnik={e} key={e.id} />).reverse()
                    : <h1 style={{textAlign: 'center', marginBottom: '100px', margin: '0 400px', width: '500px'}}>Нет закладок</h1>
                }
            </div>
        </div>
  )
}

export default Fast_bookmarks;