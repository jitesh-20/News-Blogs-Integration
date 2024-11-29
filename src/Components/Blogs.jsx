import React, { useEffect, useState } from 'react'
import coderImg from '../assets/images/Coder.webp'
import noImg from '../assets/images/no-img.png'
import './Blogs.css'

const Blogs = ({ onShowNews, onCreateblog, editPost, isEditing }) => {
  const [showForm, setShowForm] = useState(false)
  const [image, setimage] = useState(null)
  const [title, settitle] = useState('')
  const [content, setcontent] = useState('')
  const [submitted, setsubmitted] = useState(false)
  const [validTitle, setvalidTitle] = useState(true)
  const [validContent, setvalidContent] = useState(true)

  useEffect(() => {
    if (editPost && isEditing) {
      setimage(editPost.image)
      settitle(editPost.title)
      setcontent(editPost.content)
      setShowForm(true)
    } else {
      setimage(null)
      settitle('')
      setcontent('')
      setShowForm(false)
    }
  }, [isEditing, editPost])

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const maxSize = 1 * 1024 * 1024
      if (file.size > maxSize) {
        alert('File size exceed 1MB')
        return
      }
      const reader = new FileReader()
      reader.onload = () => {
        setimage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleTitleChange = (e) => {
    settitle(e.target.value)
    setvalidTitle(true)
    // if (e.target.value.length <= 60) {
    //   settitle(e.target.value)
    // }
  }

  const handleContentChange = (e) => {
    setcontent(e.target.value)
    setvalidContent(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title || !content) {
      if (!title) setvalidTitle(false)
      if (!content) setvalidContent(false)
      return
    }

    const newBlog = {
      image: image || noImg,
      title,
      content
    }
    onCreateblog(newBlog, isEditing)
    setimage(null)
    settitle('')
    setcontent('')
    setShowForm(false)
    setsubmitted(true)
    setTimeout(() => {
      setsubmitted(false)
      onShowNews()
    }, 2000)
  }

  return (
    <div className='blogs'>
      <div className="blogs-left">
        <img src={coderImg} alt='User Image' />
      </div>
      <div className="blogs-right">
        {!showForm && !submitted && (
          <button className='post-btn' onClick={() => setShowForm(true)}>Create New Post</button>
        )}
        {submitted && <p className='submission-msg'>Post Submitted!</p>}
        <div className={`blogs-right-form ${showForm ? 'visible' : 'hidden'}`}>
          <h1>{isEditing ? 'Edit Post' : 'New Post'}</h1>
          <form onSubmit={handleSubmit}>
            <div className="img-upload">
              <label htmlFor='file-upload' className='file-upload'>
                <i className="bx bx-upload"></i>Upload Image
              </label>
              <input type='file' id='file-upload' onChange={handleImageChange} />
            </div>

            <input type='text' placeholder='Add Title(Max 60 Characters)' className={`title-input ${!validTitle ? 'invalid' : ''}`} value={title} onChange={handleTitleChange} maxLength={60} />
            <textarea className={`text-input ${!validContent ? 'invalid' : ''}`} placeholder='Add Text' value={content} onChange={handleContentChange}></textarea>
            <button type='submit' className='submit-btn'>{isEditing ? 'Update Post' : 'Submit Post'}</button>
          </form>
        </div>
        {/* <button className='post-btn' onClick={() => setShowForm(true)}>Create New Post</button> */}
        <button className='blogs-close-btn' onClick={onShowNews}>Back<i className='bx bx-chevron-right'></i></button>
      </div>
    </div>
  )
}

export default Blogs