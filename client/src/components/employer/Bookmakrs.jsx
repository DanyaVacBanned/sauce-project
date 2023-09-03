import React from 'react';
import Bookmark from './Bookmark';

const Bookmarks = function({bookmarks}) {
    const bookmarksX = bookmarks.bookmarks.payload
    return(
        <div className='row rabotniki'>
            <div className="grid">
                {
                    bookmarksX
                    ? bookmarksX.map((e) => <Bookmark rabotnik={e} key={e.id} />).reverse()
                    : <h1 style={{textAlign: 'center', marginBottom: '100px', margin: '0 400px', width: '500px'}}>Нет закладок</h1>
                }
            </div>
        </div>
  )
}

export default Bookmarks;