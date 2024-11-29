import React, { useEffect, useState } from 'react'
import Weather from './Weather'
import Calendar from './Calendar'
import './News.css'
import coderImg from '../assets/images/Coder.webp'
import noImg from '../assets/images/no-img.png'
import axios from 'axios'
import NewsModal from './NewsModal'
import BookMarks from './BookMarks'
import BlogsModal from './BlogsModal'

const categories = [
    'general',
    'world',
    'business',
    'technology',
    'entertainment',
    'sports',
    'science',
    'health',
    'nation'
]

const News = ({ onShowBlogs, blogs, onEditBlog, onDeleteBlog }) => {
    const [headline, setheadline] = useState(null);
    const [news, setnews] = useState([]);
    const [category, setcategory] = useState('general');

    //Below start for working with Search Functionality....
    const [searchInput, setsearchInput] = useState('')
    const [searchQuery, setsearchQuery] = useState('')

    const [showModal, setshowModal] = useState(false)                          //It used to show the modal box...
    const [selectedArticle, setselectedArticle] = useState(null)               //used for selected the article and their information...

    const [bookmark, setbookmark] = useState([])
    const [showbookmarkModal, setshowbookmarkModal] = useState(false)

    const [selectedPost, setSelectedPost] = useState(null)
    const [showBlogModal, setshowBlogModal] = useState(false)

    useEffect(() => {
        const fetchNews = async () => {
            let url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&apikey=c92799482956a3168e88f47976b023e5`

            if (searchQuery) {
                url = `https://gnews.io/api/v4/search?q=${searchQuery}&lang=en&apikey=c92799482956a3168e88f47976b023e5`
            }

            const res = await axios.get(url)
            // console.log("Res",res);
            const fetchedNews = res.data.articles
            fetchedNews.forEach((article) => {
                if (!article.image) {
                    article.image = noImg
                }
            })
            setheadline(fetchedNews[0])
            setnews(fetchedNews.slice(1, 7))

            const savedBookmark = JSON.parse(localStorage.getItem('bookmarks')) || []
            setbookmark(savedBookmark)
            // console.log(fetchedNews[0]); 
            // console.log(news);
        }
        fetchNews()
    }, [category, searchQuery])                     //When user search some news, then useEffect() will run again because of this dependancy...

    const handleCategory = (e, selectedcategory) => {
        e.preventDefault()
        setcategory(selectedcategory)
    }

    const handleSearch = (e) => {
        e.preventDefault()
        setsearchQuery(searchInput)
        setsearchInput('')
    }

    const handleArticleClick = (article) => {
        setselectedArticle(article)
        setshowModal(true)
    }

    const handleBookmarkClick = (article) => {
        setbookmark((prevBookmarks) => {
            const updatedBookmarks = prevBookmarks.find((bookmark) => bookmark.title === article.title) ? prevBookmarks.filter((bookmark) => bookmark.title !== article.title) : [...prevBookmarks, article]
            localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks))
            return updatedBookmarks
        })
    }

    const handleBlogClick = (blog) => {
        setSelectedPost(blog)
        setshowBlogModal(true)
    }

    const closeBlogModal = () => {
        setshowBlogModal(false)
        setSelectedPost(null)
    }

    return (
        <div className='news'>
            <header className="news-header">
                <h1 className="logo">News & Blogs</h1>
                <div className="search-bar">
                    <form onSubmit={handleSearch}>
                        <input type='text' placeholder='Search News...' value={searchInput} onChange={(e) => setsearchInput(e.target.value)} />
                        <button type='submit'>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </form>
                </div>
            </header>

            <div className="news-content">
                <div className="navbar">
                    <div className="user" onClick={onShowBlogs}>
                        <img src={coderImg} alt="User Image" />
                        <p>Jitesh Kumar</p>
                    </div>

                    <nav className="categories">
                        <h1 className="nav-heading">Categories</h1>
                        <div className="nav-links">
                            {categories.map((item) => (
                                <a href='#' key={item} className='nav-link' onClick={(e) => handleCategory(e, item)}>{item}</a>
                            ))}
                            <a href='#' className='nav-link' onClick={() => setshowbookmarkModal(true)}>
                                BookMarks <i className='fa-solid fa-bookmark'></i>
                            </a>
                        </div>
                    </nav>
                </div>

                <div className="news-section">
                    {headline && (
                        <div className="headline" onClick={() => handleArticleClick(headline)}>
                            <img src={headline.image || noImg} alt={headline.title} />
                            <h2 className="headline-title">
                                {headline.title}
                                <i className={`${bookmark.some((bookmark) => bookmark.title === headline.title) ? "fa-solid" : "fa-regular"} 
                                fa-bookmark bookmark`} onClick={(e) => {
                                        e.stopPropagation()
                                        handleBookmarkClick(headline)
                                    }}></i>
                            </h2>
                        </div>
                    )}

                    <div className="news-grid">
                        {news.map((article, index) => (
                            <div key={index} className="news-grid-item" onClick={() => handleArticleClick(article)}>
                                <img src={article.image || noImg} alt={article.title} />
                                {/* <p>{article.title}<i className='fa-regular fa-bookmark bookmark'></i></p> */}
                                <h6>
                                    {article.title}
                                    <i className={`${bookmark.some((bookmark) => bookmark.title === article.title) ? "fa-solid" : "fa-regular"} 
                                    fa-bookmark bookmark`} onClick={(e) => {
                                            e.stopPropagation()
                                            handleBookmarkClick(article)
                                        }}></i>
                                </h6>
                            </div>
                        ))}
                    </div>
                </div>

                <NewsModal show={showModal} article={selectedArticle} onClose={() => setshowModal(false)} />
                <BookMarks show={showbookmarkModal} bookmarks={bookmark} onClose={() => setshowbookmarkModal(false)}
                    onselectArticle={handleArticleClick}
                    onDeleteBookmark={handleBookmarkClick} />

                <div className="my-blogs">
                    <div className="my-blogs-heading">My Blogs</div>
                    <div className="blog-posts">
                        {blogs.map((blog, index) => (
                            <div key={index} className='blog-post' onClick={() => handleBlogClick(blog)}>
                                <img src={blog.image || noImg} alt={blog.title} />
                                <h3>{blog.title}</h3>
                                <div className="post-buttons">
                                    <button className="edit-post" onClick={() => onEditBlog(blog)}>
                                        <i className="bx bxs-edit"></i>
                                    </button>
                                    <button className="delete-post" onClick={(e) => {
                                        e.stopPropagation()
                                        onDeleteBlog(blog)
                                    }}>
                                        <i className="bx bxs-x-circle"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {selectedPost && showBlogModal && (
                        <BlogsModal show={showBlogModal} blog={selectedPost} onclose={closeBlogModal} />
                    )}
                </div>

                <div className="weather-calendar">
                    <Weather />
                    <Calendar />
                </div>
            </div>

            <footer className="news-footer">
                <p>
                    <span>News & Blogs App</span>
                </p>
                <p>
                    &copy; All Right Reserved. By Jitesh
                </p>
            </footer>
        </div>
    )
}

export default News