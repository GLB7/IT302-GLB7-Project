// Giovani Bergamasco
// 11/17/2024
// IT 302 451
// Phase 4 Read Node.js Data using React.js
// glb7@njit.edu
import React, { useState, useEffect } from "react";
import RobohashDataService from "../services/robohashesDataService";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

const RobohashesList = () => {
  const [robohashes, setRobohashes] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchSet, setSearchSet] = useState("");
  const [sets, setSets] = useState(["All Sets"]);

  useEffect(() => {
    retrieveRobohashes();
  }, []);

  const retrieveRobohashes = () => {
    RobohashDataService.getAll()
      .then((response) => {
        console.log(response.data);
        setRobohashes(response.data.robohashes);
        const allSets = ["All Sets", ...new Set(response.data.robohashes.map((r) => r.set))];
        setSets(allSets);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const onChangeSearchSet = (e) => {
    const searchSet = e.target.value;
    setSearchSet(searchSet);
  };

  const find = (query, by) => {
    RobohashDataService.find(query, by)
      .then((response) => {
        console.log(response.data);
        setRobohashes(response.data.robohashes);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByName = () => {
    setSearchSet("");
    find(searchName, "name");
  };

  const findBySet = () => {
    setSearchName("");
    if (searchSet === "All Sets") {
      retrieveRobohashes();
    } else {
      find(searchSet, "set");
    }
  };

  return (
    <div className="App">
      <Container>
        <Form>
          <Row>
            <Col>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Search by name"
                  value={searchName}
                  onChange={onChangeSearchName}
                />
              </Form.Group>
              <Button variant="primary" type="button" onClick={findByName}>
                Search
              </Button>
            </Col>
            <Col>
              <Form.Group>
                <Form.Control as="select" onChange={onChangeSearchSet}>
                  {sets.map((set) => {
                    return (
                      <option key={set} value={set} selected={set === searchSet}>
                        {set}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="button" onClick={findBySet}>
                Search by Set
              </Button>
            </Col>
          </Row>
        </Form>
        <Row>
          {robohashes.map((robohash) => {
            return (
              <Col key={robohash._id}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img src={robohash.image} />
                  <Card.Body>
                    <Card.Title>{robohash.name}</Card.Title>
                    <Card.Text>
                      Set: {robohash.set}
                      <br />
                      Color: {robohash.color}
                      <br />
                    </Card.Text>
                    <Card.Text>{robohash.plot}</Card.Text>
                    <Link to={"/robohashes/" + robohash._id}>View Comments</Link>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default RobohashesList;