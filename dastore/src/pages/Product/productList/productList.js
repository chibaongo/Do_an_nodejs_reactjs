import React, { useState, useEffect } from "react";
import styles from "./productList.css";
import axiosClient from "../../../apis/axiosClient";
import { useParams, useRouteMatch } from "react-router-dom";
import eventApi from "../../../apis/eventApi";
import productApi from "../../../apis/productApi";
import { useHistory } from 'react-router-dom';
import { Col, Row, Tag, Spin, Card } from "antd";
import { DateTime } from "../../../utils/dateTime";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Typography, Button, Badge, Breadcrumb, Popconfirm, Progress, notification, Form, Input, Select, Rate, Slider, List } from 'antd';
import { HistoryOutlined, AuditOutlined, AppstoreAddOutlined, CloseOutlined, UserOutlined, MehOutlined, TeamOutlined, HomeOutlined, SearchOutlined } from '@ant-design/icons';
import Paragraph from "antd/lib/typography/Paragraph";
import { numberWithCommas } from "../../../utils/common";
import triangleTopRight from "../../../assets/icon/Triangle-Top-Right.svg"

const { Meta } = Card;
const { Option } = Select;

const { Title } = Typography;
const DATE_TIME_FORMAT = "DD/MM/YYYY HH:mm";
const { TextArea } = Input;

const ProductList = () => {

    const [productDetail, setProductDetail] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cartLength, setCartLength] = useState();
    const [visible, setVisible] = useState(false);
    const [dataForm, setDataForm] = useState([]);
    const [lengthForm, setLengthForm] = useState();
    const [form] = Form.useForm();
    const [template_feedback, setTemplateFeedback] = useState();
    const [categories, setCategories] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100000000);

    let { id } = useParams();
    const history = useHistory();
    const match = useRouteMatch();

    const hideModal = () => {
        setVisible(false);
    };

    const handleJointEvent = async (id) => {
        try {
            await eventApi.joinEvent(id).then(response => {
                if (response === undefined) {
                    notification["error"]({
                        message: `Notification`,
                        description:
                            'Joint Event Failed',

                    });
                }
                else {
                    notification["success"]({
                        message: `Thông báo`,
                        description:
                            'Successfully Joint Event',
                    });
                    listEvent();
                }
            }
            );

        } catch (error) {
            console.log('Failed to fetch event list:' + error);
        }
    }

    const handleCancelJointEvent = async (id) => {
        try {
            await eventApi.cancelJoinEvent(id).then(response => {
                if (response === undefined) {
                    notification["error"]({
                        message: `Notification`,
                        description:
                            'Cancel Join Event Failed',

                    });
                }
                else {
                    notification["success"]({
                        message: `Thông báo`,
                        description:
                            'Successfully Cancel Joint Event',
                    });
                    listEvent();
                }
            }
            );

        } catch (error) {
            console.log('Failed to fetch event list:' + error);
        }
    }

    const listEvent = () => {
        setLoading(true);
        (async () => {
            try {
                const response = await eventApi.getDetailEvent(id);
                console.log(response);
                setProductDetail(response);
                setLoading(false);

            } catch (error) {
                console.log('Failed to fetch event detail:' + error);
            }
        })();
        window.scrollTo(0, 0);
    }

    const handleDetailEvent = (id) => {
        history.replace("/event-detail/" + id);
        window.location.reload();
        window.scrollTo(0, 0);
    }

    const getDataForm = async (uid) => {
        try {
            await axiosClient.get("/event/" + id + "/template_feedback/" + uid + "/question")
                .then(response => {
                    console.log(response);
                    setDataForm(response);
                    let tabs = [];
                    for (let i = 0; i < response.length; i++) {
                        tabs.push({
                            content: response[i]?.content,
                            uid: response[i]?.uid,
                            is_rating: response[i]?.is_rating
                        })
                    }
                    form.setFieldsValue({
                        users: tabs
                    })
                    setLengthForm(tabs.length)
                }
                );

        } catch (error) {
            throw error;
        }
    }

    const handleDirector = () => {
        history.push("/evaluation/" + id)
    }

    const addCart = (product) => {
        console.log(product);
        const existingItems = JSON.parse(localStorage.getItem('cart')) || [];
        let updatedItems;
        const existingItemIndex = existingItems.findIndex((item) => item._id === product._id);
        if (existingItemIndex !== -1) {
            // If product already exists in the cart, increase its quantity
            updatedItems = existingItems.map((item, index) => {
                if (index === existingItemIndex) {
                    return {
                        ...item,
                        quantity: item.quantity + 1,
                    };
                }
                return item;
            });
        } else {
            // If product does not exist in the cart, add it to the cart
            updatedItems = [...existingItems, { ...product, quantity: 1 }];
        }
        console.log(updatedItems.length);
        setCartLength(updatedItems.length);
        localStorage.setItem('cart', JSON.stringify(updatedItems));
        localStorage.setItem('cartLength', updatedItems.length);
        window.location.reload(true)
    };

    const paymentCard = (product) => {
        console.log(product);
        const existingItems = JSON.parse(localStorage.getItem('cart')) || [];
        let updatedItems;
        const existingItemIndex = existingItems.findIndex((item) => item._id === product._id);
        if (existingItemIndex !== -1) {
            // If product already exists in the cart, increase its quantity
            updatedItems = existingItems.map((item, index) => {
                if (index === existingItemIndex) {
                    return {
                        ...item,
                        quantity: item.quantity + 1,
                    };
                }
                return item;
            });
        } else {
            // If product does not exist in the cart, add it to the cart
            updatedItems = [...existingItems, { ...product, quantity: 1 }];
        }
        console.log(updatedItems.length);
        setCartLength(updatedItems.length);
        localStorage.setItem('cart', JSON.stringify(updatedItems));
        localStorage.setItem('cartLength', updatedItems.length);
        history.push("/cart");
    }

    const onFinish = async (values) => {
        console.log(values.users);
        let tabs = [];
        for (let i = 0; i < values.users.length; i++) {
            tabs.push({
                scope: values.users[i]?.scope == undefined ? null : values.users[i]?.scope,
                comment: values.users[i]?.comment == undefined ? null : values.users[i]?.comment,
                question_uid: values.users[i]?.uid,

            })
        }
        console.log(tabs);
        setLoading(true);
        try {
            const dataForm = {
                "answers": tabs
            }
            await axiosClient.post("/event/" + id + "/answer", dataForm)
                .then(response => {
                    if (response === undefined) {
                        notification["error"]({
                            message: `Notification`,
                            description:
                                'Answer event question failed',

                        });
                        setLoading(false);
                    }
                    else {
                        notification["success"]({
                            message: `Notification`,
                            description:
                                'Successfully answer event question',

                        });
                        setLoading(false);
                        form.resetFields();
                    }
                }
                );

        } catch (error) {
            throw error;
        }
    };

    const handleReadMore = (id) => {
        console.log(id);
        history.push("/product-detail/" + id);
        window.location.reload();
    }

    const handleCategoryDetails = (id) => {
        const newPath = match.url.replace(/\/[^/]+$/, `/${id}`);
        history.push(newPath);
        window.location.reload();
    }

    const handleSearchPrice = async (minPrice, maxPrice) => {
        try {
            const dataForm = {
                "page": 1,
                "limit": 50,
                "minPrice": minPrice,
                "maxPrice": maxPrice
            }
            await axiosClient.post("/product/searchByPrice", dataForm)
                .then(response => {
                    if (response === undefined) {
                        setLoading(false);
                    }
                    else {
                        setProductDetail(response.data.docs);
                        setLoading(false);
                    }
                }
                );

        } catch (error) {
            throw error;
        }
    }

    const handleSliderChange = (values) => {
        setMinPrice(values[0]);
        setMaxPrice(values[1]);
    };

    const handleSearchClick = () => {
        // Gọi hàm tìm kiếm theo giá
        handleSearchPrice(minPrice, maxPrice);
    };

    useEffect(() => {
        (async () => {
            try {
                await productApi.getProductCategory(id).then((item) => {
                    setProductDetail(item.data.docs);
                });
                const response = await productApi.getCategory({ limit: 50, page: 1 });
                setCategories(response.data.docs);

                setLoading(false);

            } catch (error) {
                console.log('Failed to fetch event detail:' + error);
            }
        })();
        window.scrollTo(0, 0);
    }, [cartLength])

    return (
        <div>
            <Spin spinning={false}>
                <div className="container box">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            onClick={() => handleCategoryDetails(category._id)}
                            className="menu-item"
                        >
                            <div className="menu-category">
                                {category.name}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="container">
                    <Slider
                        range
                        min={0}
                        max={100000000}
                        value={[minPrice, maxPrice]}
                        onChange={handleSliderChange}
                    />
                    <Button type="primary" icon={<SearchOutlined />} onClick={() => handleSearchClick()}>
                        Search
                    </Button>
                </div>
                <div className="list-products container" key="1" style={{ marginTop: 50, marginBottom: 50 }}>
                    <Row>
                        <Col>
                            <div className="title-category">
                                <a href="" class="title">
                                    <h3>DANH SÁCH SẢN PHẨM</h3>
                                </a>
                            </div>
                        </Col>
                    </Row>
                    <Row
                        gutter={{ xs: 8, sm: 16, md: 24, lg: 48 }}
                        className="row-product"
                    >
                        <List
                            grid={{ gutter: 16, column: 4 }} // Số cột trong mỗi hàng (ở đây là 4 cột)
                            size="large"
                            pagination={{
                                onChange: page => {
                                    window.scrollTo(0, 0);
                                },
                                pageSize: 12,
                            }}
                            dataSource={productDetail}
                            renderItem={item => (

                                <List.Item>

                                    <div className="show-product" onClick={() => handleReadMore(item._id)}>
                                        {item.image ? (
                                            <img
                                                className='image-product'
                                                src={item.image}
                                            />
                                        ) : (
                                            <img
                                                className='image-product'
                                                src={require('../../../assets/image/NoImageAvailable.jpg')}
                                            />
                                        )}
                                        <div className='wrapper-products'>
                                            <Paragraph
                                                className='title-product'
                                                ellipsis={{ rows: 2 }}
                                            >
                                                {item.name}
                                            </Paragraph>
                                            <div className="price-amount">
                                                <Paragraph className='price-product'>
                                                    {numberWithCommas(item.price - item.promotion)} đ
                                                </Paragraph>
                                                {item.promotion !== 0 &&
                                                    <Paragraph className='price-cross'>
                                                        {numberWithCommas(item.price)} đ
                                                    </Paragraph>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <Paragraph className='badge' style={{ position: 'absolute', top: 10, left: 9 }}>
                                        <span>Giảm giá</span>
                                        <img src={triangleTopRight} />
                                    </Paragraph>
                                </List.Item>
                            )}>

                        </List>

                    </Row>
                </div>
            </Spin>
        </div >
    );
};

export default ProductList;
