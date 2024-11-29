import React from 'react'
import './Modal.css'
import noImg from '../assets/images/no-img.png'
import './Bookmarks.css'

const BookMarks = ({ show, bookmarks, onClose, onselectArticle, onDeleteBookmark }) => {
    if (!show) return null
    return (
        <div className='modal-overlay'>
            <div className="modal-content">
                <span className="close-button" onClick={onClose}>
                    <i className="fa-solid fa-xmark"></i>
                </span>
                <h2 className="bookmarks-heading">Bookmarked News</h2>
                <div className="bookmarks-list">
                    {bookmarks.map((article, index) => (
                        <div className="bookmark-item" key={index} onClick={() => onselectArticle(article)}>
                            <img src={article.image || noImg} alt={article.title} />
                            <h3>{article.title}</h3>
                            <span className="delete-button" onClick={(e) => {
                                e.stopPropagation()
                                onDeleteBookmark(article)
                            }}>
                                <i className="fa-regular fa-circle-xmark"></i>
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BookMarks