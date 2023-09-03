import React from 'react';
import Bookmark_spec from './Bookmark_spec';

const Bookmarks_spec = function({bookmarks}) {
    const bookmarksX = bookmarks.payload
    return(
        <div className='row rabotniki'>
            <div className="grid">
                {
                    bookmarksX 
                    ? bookmarksX.map((e) => <Bookmark_spec rabotnik={e} key={e.id} />).reverse()
                    : <h1 style={{textAlign: 'center', marginBottom: '100px', margin: '0 400px', width: '500px'}}>Нет закладок</h1>
                }
            </div>
        </div>
  )
}

export default Bookmarks_spec;