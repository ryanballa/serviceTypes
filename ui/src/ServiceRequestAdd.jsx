import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

function ServiceRequestAdd() {
    const [serviceTypes, setServiceTypes] = useState([]);
    const [hasError, setHasError] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ status: null, message: '' });


    useEffect(() => {
        fetch('http://localhost:5000/api/service-types', {})
            .then(response => response.json())
            .then(data => {
                if (data.data) {
                    setServiceTypes(data.data);
                } else {
                    setHasError(true);
                }
            }).catch((e) => {
                setHasError(true);
            });
    }, []);
    return (
        <section>
            {serviceTypes.length === 0 && !hasError && <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>}
            {hasError && <Alert variant="danger">
                There was an error loading your form. Please <Link to="/service-requests/add">try again</Link>.
            </Alert>}
            {submitStatus.status && submitStatus.status === 201 && <Alert variant="success">
                <span className="response">{submitStatus.message}</span>
                <Link to="/service-requests/add" onClick={() => { setSubmitStatus({ status: null, message: '' }) }}>Create a new Submission.</Link>
            </Alert>}
            {serviceTypes.length > 0 && submitStatus.status !== 201 &&
                <Formik
                    initialValues={{ firstName: '', lastName: '', email: '', serviceType: 'benefits', serviceDescription: '' }}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            fetch('http://localhost:5000/api/assistance-requests', {
                                method: "POST",
                                body: JSON.stringify({
                                    "assistance_request": {
                                        "contact": {
                                            "first_name": values.firstName,
                                            "last_name": values.lastName,
                                            "email": values.email,
                                        },
                                        "service_type": values.serviceType,
                                        "description": values.serviceDescription
                                    }
                                }),
                                headers: {
                                    "Content-type": "application/json; charset=UTF-8"
                                }
                            })
                                .then(response => response.json())
                                .then(data => {
                                    setSubmitStatus(data);
                                }).catch((e) => {
                                    setSubmitStatus({ status: 500, message: "An error occurred." });
                                });
                            setSubmitting(false);
                        }, 400);
                    }}>
                    {({
                        values,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                    }) => (
                        <Form onSubmit={handleSubmit}>
                            <h2>New Service Request</h2>
                            <small>* Required Field</small>
                            <br />
                            <br />
                            <h3>Contact Info</h3>
                            <Form.Group controlId="formBasicFirstName">
                                <Form.Label>First Name *</Form.Label>
                                <Form.Control type="input" name="firstName" placeholder="Enter First Name" value={values.firstName} onChange={handleChange} onBlur={handleBlur} required />
                            </Form.Group>

                            <Form.Group controlId="formBasicLastName">
                                <Form.Label>Last Name *</Form.Label>
                                <Form.Control type="input" name="lastName" placeholder="Enter Last Name" value={values.lastName} onChange={handleChange} onBlur={handleBlur} required />
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email *</Form.Label>
                                <Form.Control type="email" name="email" placeholder="Enter Email" value={values.email} onChange={handleChange} onBlur={handleBlur} required />
                            </Form.Group>

                            <h3>Details</h3>
                            <Form.Group controlId="formBasicServiceType">
                                <Form.Label>Service Type *</Form.Label>
                                <Form.Control as="select" name="serviceType" custom value={values.serviceType} onChange={handleChange} onBlur={handleBlur}>
                                    {serviceTypes.map(type => (<option key={type.id} value={type.id}>{type.display_name}</option>))}

                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formBasicServiceDescription">
                                <Form.Label>Service Description</Form.Label>
                                <Form.Control as="textarea" rows={3} name="serviceDescription" value={values.serviceDescription} onChange={handleChange} onBlur={handleBlur} />
                                <Form.Text className="text-muted">
                                    Please provide any relevant details.
                                </Form.Text>
                            </Form.Group>

                            {submitStatus.status && submitStatus.status !== 201 && <Alert variant="danger">
                                <span className="response">{submitStatus.message}</span>
                            </Alert>}

                            <Button variant="primary" type="submit" disabled={isSubmitting}>
                                Submit
                            </Button>
                        </Form>)}
                </Formik>}
        </section >
    );
}

export default ServiceRequestAdd;