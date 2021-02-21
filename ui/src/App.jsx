import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import ServiceRequestAdd from './ServiceRequestAdd';
import Header from './components/Header';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
    return (
        <Router>
            <Header />
            <Container>
                <Row>
                    <Col sm={12}><br /></Col>
                </Row>
                <Row>
                    <Col sm={2} />
                    <Col sm={8}>
                        <Switch>
                            <Route path="/service-requests/add">
                                <ServiceRequestAdd />
                            </Route>
                        </Switch>
                    </Col>
                    <Col sm={2} />
                </Row>
            </Container>
        </Router>
    );
}

export default App;