import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Form from './Form'
import Posts from './Posts'

function Dashboard() {
  const [state, setState] = useState({ posts: [] })

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/posts')
      .then(res => setState({ posts: res.data }))
      .catch(err => console.log(err))
  }, [])

  const addPost = post => {
    axios
      .post('http://localhost:3001/api/posts', post)
      .then(res => setState({ posts: [...state.posts, res.data] }))
      .catch(err => console.log(err))
  }

  const removePost = id => {
    axios
      .delete(`http://localhost:3001/api/posts/${id}`)
      .then(res => {
        const posts = state.posts.filter(post => post.id !== id)
        setState({ posts })
      })
      .catch(err => console.log(err))
  }

  const countPosts = filter => {
    const { posts } = state
    return posts.filter(post => filter ? post[filter] : post).length
  }

  const Count = ({ total }) => <h6 style={{ marginTop: '5px' }}>
    {total}{' '}total posts
</h6>

  return <>
    <h6 style={{ marginBottom: '20px' }}>
      Enter text or straight HTML into the fields below.
    </h6>
    <Form onNewPost={addPost} />
    <div className="row" style={divStyle}>
      <div className="col s3">Title</div>
      <div className="col s8">Content</div>
      <div className="col s1"></div>
    </div>
    {state.posts.map(
      post => <Posts post={post} key={post.title} onRemovePost={removePost} />
    )}
    <Count total={countPosts()} />
  </>
}

const divStyle = {
  margin: '15px auto',
  fontSize: '22px',
  borderBottom: '1px solid silver',
}

export default Dashboard
