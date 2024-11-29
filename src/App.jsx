import React, { useEffect, useState } from 'react'
import News from './Components/News'
import Blogs from './Components/Blogs'

const App = () => {
  const [showNews, setShowNews] = useState(true)
  const [showBlogs, setShowBlogs] = useState(false)
  const [blogs, setblogs] = useState([])
  const [selectedPost, setselectedPost] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const savedBlogs = JSON.parse(localStorage.getItem('Blogs')) || []
    setblogs(savedBlogs)
  }, [])

  const handleCreateBlog = (newBlog, isEdit) => {
    setblogs((prevBlogs) => {
      const updatedBlogs = isEdit ? prevBlogs.map((blog) => (blog === selectedPost ? newBlog : blog)) : [...prevBlogs, newBlog]
      localStorage.setItem('Blogs', JSON.stringify(updatedBlogs))
      return updatedBlogs
    })
    setIsEditing(false)
    setselectedPost(null)
  }

  const handleEditBlog = (blog) => {
    setselectedPost(blog)
    setIsEditing(true)
    setShowNews(false)
    setShowBlogs(true)
  }

  const handleDeleteBlog = (blogToDelete) => {
    setblogs((prevBlogs) => {
      const updatedBlogs = prevBlogs.filter((blog) => blog !== blogToDelete)
      localStorage.setItem('Blogs', JSON.stringify(updatedBlogs))
      return updatedBlogs
    })
  }

  const handleShowBlogs = () => {
    setShowNews(false)
    setShowBlogs(true)
  }

  const handleShowNews = () => {
    setShowNews(true)
    setShowBlogs(false)
    setIsEditing(false)
    setselectedPost(null)
  }

  return (
    <div className='container'>
      <div className="news-blogs-app">
        {showNews && <News onShowBlogs={handleShowBlogs} blogs={blogs} onEditBlog={handleEditBlog} onDeleteBlog={handleDeleteBlog} />}
        {showBlogs && <Blogs onShowNews={handleShowNews} onCreateblog={handleCreateBlog} editPost={selectedPost} isEditing={isEditing} />}
      </div>
    </div>
  )
}

export default App