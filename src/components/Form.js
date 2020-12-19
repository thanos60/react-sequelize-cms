import React from 'react'

const Form = ({ onNewPost = f => f }) => {

  let title, content

  const submit = e => {
    e.preventDefault()
    onNewPost({
      title: title.value,
      content: content.value,
    })
    title.value = ''
    content.value = ''
  }

  return <form onSubmit={submit}>
    <div className="mb-3">
      <input
        className="form-control"
        ref={input => title = input}
        placeholder="Title"
        id="title"
      />
    </div>
    <div className="mb-3">
      <textarea
        ref={input => content = input}
        id="content"
        className="form-control"
        placeholder="Content"
        required="required"
        rows="8"
      />
    </div>
    <button className="btn btn-dark" type="submit">
      Add Post
    </button>
  </form>
}

export default Form
