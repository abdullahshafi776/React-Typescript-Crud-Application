import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser, deleteUser } from "../features/crud/crudSlice";
import { Container, Row, Col, Button, Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RootState } from "../app/store";
import { resetUser } from "../features/crud/crudSlice";

const Home = () => {

    type dataValue = {
        name: string;
        age: string;
    }

    const [data, setData] = useState<dataValue>({
        name: "",
        age: ""
    });
    const { name, age } = data;
    const onvaluechange = (e: any) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const dispatch = useDispatch();
    const { users } = useSelector((state: RootState) => state.crud);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        dispatch(addUser({ id: Date.now().toString(), name, age }));
        setData({
            name: "",
            age: ""
        })
    };


    useEffect(() => {
        dispatch(resetUser());
    }, [dispatch]);

    return (
        <Container className="py-5">
            <Row>
                <Col lg={4} md={5} className="col-md-5 pb-md-0 pb-5">
                    <Form
                        className="bg-dark shadow p-4 text-white"
                        onSubmit={handleSubmit}
                    >
                        <div className="text-center">
                            <p className="display-6">Add Data</p>
                        </div>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="exampleInputfname">Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={name}
                                onChange={(e) => onvaluechange(e)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="exampleInputlname">Age</Form.Label>
                            <Form.Control
                                type="text"
                                name="age"
                                value={age}
                                onChange={(e) => onvaluechange(e)}
                                required
                            />
                        </Form.Group>
                        <div className="d-grid">
                            <Button type="submit" variant="primary" className="mt-2">
                                Submit
                            </Button>
                        </div>
                    </Form>
                </Col>
                <Col lg={8} md={7}>
                    <Table className="border shadow-sm text-center" responsive>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Age</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((e, index) => {
                                return (
                                    <tr key={e.id}>
                                        <th>{index + 1}</th>
                                        <td>{e.name}</td>
                                        <td>{e.age}</td>
                                        <td className="d-flex justify-content-center">
                                            <Link
                                                type="button"
                                                to={`/edit/${e.id}`}
                                                className="btn btn-sm btn-warning me-2"
                                            >
                                                Edit
                                            </Link>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => dispatch(deleteUser(e.id))}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default Home