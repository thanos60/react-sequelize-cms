import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import axios from 'axios'

function PublicPosts({ auth: { isAuthenticated } }) {
    const [state, setState] = useState({ posts: [] })

    useEffect(() => {
        axios
            .get('http://localhost:3001/api/posts')
            .then(res => setState({ posts: res.data }))
            .catch(err => console.log(err))
    }, [])

    return <>{state.posts.map(post => <div key={post.title}>
        <div dangerouslySetInnerHTML={{ __html: `${post.title}` }} />
        <div dangerouslySetInnerHTML={{ __html: `${post.content}` }} />
        <br />
    </div>)}
        {isAuthenticated
            ? <Link to="/dashboard">
                <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                >
                    Edit page
                </button>
            </Link>
            : null}
    </>
}

const mapStateToProps = state => ({ auth: state.auth })

export default connect(mapStateToProps, null)(withRouter(PublicPosts))
