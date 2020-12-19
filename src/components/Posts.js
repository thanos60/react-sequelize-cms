import React from 'react'
import { Link } from 'react-router-dom'
import Truncate from 'react-truncate-html'

const Posts = ({ post, onRemovePost = f => f }) => {

  function changeContent() {
    document.getElementById('title').value = post.title
    document.getElementById('content').value = post.content
  }

  return <div style={divStyle} className="row" key={post.title}>
    <div className="col s3">
      <div dangerouslySetInnerHTML={{ __html: `${post.title}` }} />
    </div>
    <div className="col s8">
      <Truncate
        dangerouslySetInnerHTML={{ __html: `${post.content}` }}
        lines={8}
      />
    </div>
    <div className="col s1" style={{ textAlign: 'center' }}>
      <button
        className="btn btn-dark"
        onClick={(title, content) => changeContent(
          post.title, post.content
        )}
        style={{ marginBottom: '7px' }}
      >
        Edit
    </button><br />
      <button
        style={{ marginBottom: '7px' }}
        className="btn btn-danger"
        data-bs-toggle="modal"
        data-bs-target="#deleteModal"
      >
        Delete
      </button>
      {/* Modal */}
      <div
        className="modal fade"
        id="deleteModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this post?
      </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                No, go back
              </button>
              <button
                type="button"
                onClick={() => onRemovePost(post.id)}
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Yes, Delete
                </button>
            </div>
          </div>
        </div>
      </div>
      {/* end Modal */}
      <br />
      <Link to="/"
        style={{ cursor: 'pointer' }}
        className="btn btn-secondary"
      >
        View
      </Link>
    </div>
  </div >
}

const divStyle = {
  borderBottom: '1px solid silver',
  color: 'grey',
  lineHeight: '18px',
  paddingBottom: '15px',
  margin: '10px 0 0 0',
  verticalAlign: 'middle'
}

export default Posts
