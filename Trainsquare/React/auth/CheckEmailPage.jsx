import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './checkEmail.css';

import mailSent from '../../assets/images/mail_sent.svg';

const Confirm = () => {
    return (
        <body>
            <div className="container formContainer center">
                <Card className="mx-5">
                    <Card.Header className="header">
                        <h2 className="header-font text-center">Trainsquare</h2>
                    </Card.Header>
                    <Card.Body>
                        {' '}
                        <div className="text-center m-auto">
                            <img src={mailSent} alt="mail sent" height="64" className="my-1" />
                            <h4 className="text-dark-50 text-center mt-4 fw-bold">Please check your email</h4>
                            <p className="text-muted mb-4">
                                A email has been send to your email. Please check for an email from company and click on
                                the included link to reset your password.
                            </p>
                            <p className="text-center">
                                <Link className="btn btn-primary" to="/login">
                                    Back to Login
                                </Link>
                            </p>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </body>
    );
};

export default Confirm;
