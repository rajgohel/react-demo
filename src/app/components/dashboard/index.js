import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, deleteProduct, sortProductByName, sortProductByPrice } from '../../../features/product/productSlice';
import { InputText } from '../../shared/input';

const inputs = [{
    "type": "text",
    "title": "Product Name",
    "name": "productName",
    "class": "text",
    "placeholder": ""
}, {
    "type": "text",
    "title": "Price",
    "name": "price",
    "class": "text",
    "placeholder": ""
}];

const DashBoard = () => {
    const productData = useSelector((store) => store.product.productData);
    const [filteredProductList, setFilteredProductList] = useState([]);
    const [sortToggleName, setSortToggleName] = useState(false);
    const [sortTogglePrice, setSortTogglePrice] = useState(false);

    const [show, setShow] = useState(false);

    const [product, setProduct] = useState(inputs.reduce((acc, input) => {
        return { ...acc, [input.name]: '' };
    }, {}));

    const dispatch = useDispatch();

    const handleShow = () => setShow(true);

    const handleClose = () => {
        setShow(false);
        dispatch(addProduct(product));
        setProduct({});
    }

    const handleModelClose = () => setShow(false);

    const onChange = (name, value) => {
        setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
    }

    const handleDelete = (index) => {
        dispatch(deleteProduct(index));
    }

    const handleOnchange = (keyword) => {
        if (!keyword.trim().length) {
            setFilteredProductList(productData);
        }
        else {
            let products = productData.filter((ele) => ele.productName.indexOf(keyword) !== -1);
            setFilteredProductList(products);
        }
    }

    useEffect(() => {
        setFilteredProductList(productData);
    }, [productData]);

    const handleNameSort = () => {
        setSortToggleName((prevState => !prevState));
        dispatch(sortProductByName(sortToggleName));
    }

    const handlePriceSort = () => {
        setSortTogglePrice((prevState => !prevState));
        dispatch(sortProductByPrice(sortTogglePrice));
    }

    const list = inputs.map(input => {
        return (
            <InputText
                value={product[input.name]}
                key={input.name}
                type={input.type}
                name={input.name}
                title={input.title}
                className={input.class}
                placeholder={input.placeholder}
                onChange={onChange}
            />
        );
    });

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "4rem" }}>
            <div style={{ width: "60%" }}>
                <div style={{ marginBottom: "1rem", display: "flex", flexDirection: "row", justifyContent: "space-between", height: "2.5rem" }}>
                    <Button variant="primary" type="button" onClick={handleShow}>
                        <i className="fa fa-plus"></i>
                    </Button>
                    <InputGroup style={{ width: "50%" }}>
                        <InputGroup.Text id="basic-addon1"><i className="fa fa-search"></i></InputGroup.Text>
                        <Form.Control
                            placeholder="Search"
                            aria-label="search"
                            aria-describedby="basic-addon1"
                            onChange={(e) => { handleOnchange(e.target.value) }}
                        />
                    </InputGroup>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name <i class={sortToggleName ? "fa fa-arrow-up" : "fa fa-arrow-down"} style={{cursor: "pointer"}} aria-hidden="true" onClick={() => { handleNameSort() }}></i></th>
                            <th>Price <i class={sortTogglePrice ? "fa fa-arrow-up" : "fa fa-arrow-down"} style={{cursor: "pointer"}} aria-hidden="true" onClick={() => { handlePriceSort() }}></i></th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProductList && filteredProductList.map((ele, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{ele.productName}</td>
                                <td>{ele.price}</td>
                                <td><Button variant="danger" size='sm' onClick={() => { handleDelete(index) }}><i className="fa fa-trash"></i></Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Modal show={show} onHide={handleModelClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form >
                            {list}
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleModelClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}

export default DashBoard;