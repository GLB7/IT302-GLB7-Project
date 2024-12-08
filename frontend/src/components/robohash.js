// Giovani Bergamasco
// 12/8/2024
// IT 302 451
// Phase 5 CUD Node.js Data using React.js
// glb7@njit.edu
import React, { useState, useEffect } from 'react';
import RobohashDataService from '../services/robohashesDataService';
import { Link, useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const Robohash = (props) => {
  const [robohash, setRobohash] = useState({
    id: null,
    name: "",
    set: "",
    color: "",
    comments: [],
    image: ""
  });

  let { id } = useParams();

  const getRobohash = id => {
    RobohashDataService.get(id)
      .then(response => {
        setRobohash(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getRobohash(id);
  }, [id]);

  const deleteComment = (commentId, index) => {
    RobohashDataService.deleteComment(commentId, props.user.id)
      .then(response => {
        setRobohash((prevState) => {
          const newComments = [...prevState.comments];
          newComments.splice(index, 1);
          return {
            ...prevState,
            comments: newComments
          };
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Image src={robohash.image} fluid />
          </Col>
          <Col>
            <Card>
              <Card.Header as="h5">{robohash.name}</Card.Header>
              <Card.Body>
                <Card.Text>
                  Set: {robohash.set}<br />
                  Color: {robohash.color}
                </Card.Text>
                {props.user &&
                  <Link to={"/robohashes/" + id + "/comment"}>
                    Add Comment
                  </Link>}
              </Card.Body>
            </Card>
            <br />
            <h2>Comments</h2><br />
            {robohash.comments.map((comment, index) => {
              return (
                <Card key={index}>
                  <Card.Body>
                    <h5>{comment.name + " commented on " + new Date(Date.parse(comment.date)).toDateString()}</h5>
                    <p>{comment.comment}</p>
                    {props.user && props.user.id === comment.user_id &&
                      <Row>
                        <Col><Link
                          to={"/robohashes/" + id + "/comment"}
                          state={{ currentComment: comment }}
                        >Edit</Link>
                        </Col>
                        <Col><Button variant="link" onClick={() => deleteComment(comment._id, index)}>Delete</Button></Col>
                      </Row>}
                  </Card.Body>
                </Card>
              );
            })}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Robohash;