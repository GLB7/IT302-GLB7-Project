// Giovani Bergamasco
// 12/8/2024
// IT 302 451
// Phase 5 CUD Node.js Data using React.js
// glb7@njit.edu
import React, { useState } from 'react'
import RobohashDataService from "../services/robohashesDataService"
import { Link, useParams, useLocation } from "react-router-dom"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const AddComment = (props) => {
  let editing = false
  let initialCommentState = ""
  const location = useLocation();
  if (location.state && location.state.currentComment) {
    editing = true
    initialCommentState = location.state.currentComment.comment
  }

  const [comment, setComment] = useState(initialCommentState)
  // keeps track if comment is submitted
  const [submitted, setSubmitted] = useState(false)

  let { id } = useParams();

  const onChangeComment = e => {
    const comment = e.target.value
    setComment(comment);
  }

  const saveComment = () => {
    var data = {
      comment: comment,
      name: props.user.name,
      user_id: props.user.id,
      robohash_id: id 
    }
    if (editing) {
      data.comment_id = location.state.currentComment._id
      RobohashDataService.updateComment(data)
        .then(response => {
          setSubmitted(true);
          console.log(response.data)
        })
        .catch(e => {
          console.log(e);
        })
    } else {
      RobohashDataService.createComment(data)
        .then(response => {
          setSubmitted(true)
        }).catch(e => {
          console.log(e);
        })
    }
  }

  return (
    <div>
      {submitted ? (
        <div>
          <h5>Comment submitted successfully</h5>
          <Link to={"/robohashes/" + id}>
            Back to Robohash
          </Link>
        </div>
      ) : (
        <Form>
          <Form.Group>
            <Form.Label>{editing ? "Edit" : "Create"} Comment</Form.Label>
            <Form.Control
              type="text"
              required
              value={comment}
              onChange={onChangeComment}
            />
          </Form.Group>
          <Button variant="primary" onClick={saveComment}>
            Submit
          </Button>
        </Form>
      )}
    </div>
  )
}

export default AddComment;