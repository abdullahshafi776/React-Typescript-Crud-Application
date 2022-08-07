import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import { getUser, updateUser } from "../features/crud/crudSlice";

const Edit = () => {
    let navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();

    type dataValue = {
        name: string;
        age: string;
    }

    const [data, setData] = useState<dataValue>({
        name: "",
        age: "",
    });
    const { name, age } = data;
    const onvaluechange = (e: any) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const { user, success } = useSelector((state: RootState) => state.crud);

    const handlesubmit = (e: any) => {
        e.preventDefault();
        dispatch(updateUser(data));
    };

    useEffect(() => {
        if (success) {
            navigate("/");
        } else {
            if (user.length === 0) {
                dispatch(getUser(id));
            } else {
                setData(user[0]);
            }
        }
    }, [id, dispatch, user, success, navigate]);
    return (
        <Container className="py-3">
            <Row>
                <Col xs={12}>
                    <div className="text-left">
                        <Button
                            className="btn btn-dark back_btn"
                            onClick={() => navigate("/")}
                        >
                            Back
                        </Button>
                    </div>
                </Col>
                <Col lg={{ span: 4, offset: 4 }} md={{ span: 6, offset: 3 }} className="pt-4">
                    <Form
                        className="bg-dark shadow-sm p-4 text-white rounded"
                        onSubmit={handlesubmit}
                    >
                        <div className="text-center">
                            <p className="display-6">Update Data</p>
                        </div>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={name}
                                onChange={(e) => onvaluechange(e)}
                                required
                            />
                        </Form.Group>
                        <div className="mb-3">
                            <Form.Label>Age</Form.Label>
                            <Form.Control
                                type="text"
                                name="age"
                                value={age}
                                onChange={(e) => onvaluechange(e)}
                                required
                            />
                        </div>
                        <div className="d-grid">
                            <Button type="submit" variant="primary" className="mt-2">
                                Update
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Edit