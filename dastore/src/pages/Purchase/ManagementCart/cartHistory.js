import React, { useState, useEffect } from "react";
import axiosClient from "../../../apis/axiosClient";
import { useParams } from "react-router-dom";
import productApi from "../../../apis/productApi";
import { Tag, Spin, Card } from "antd";
import { Button, notification, Table } from 'antd';
import moment from 'moment';
import { Modal } from 'antd';
import orderApi from "../../../apis/orderApi"

const CartHistory = () => {

    const [orderList, setOrderList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cancelModalVisible, setCancelModalVisible] = useState(false);
    const [total, setTotalList] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [order, setOrder] = useState([]);
    let { id } = useParams();

    const showCancelModal = () => {
        setCancelModalVisible(true);
    };
    const handleCategoryList = async () => {
        try {
            await orderApi.getListOrder({ page: 1, limit: 10000 }).then((res) => {
                setTotalList(res.totalDocs)
                setOrder(res.data.docs);
                setLoading(false);
            });
            ;
        } catch (error) {
            console.log('Failed to fetch event list:' + error);
        };
    }

    const handleDeleteCategory = async (id) => {
        setLoading(true);
        try {
            await orderApi.deleteOrder(id).then(response => {
                if (response === undefined) {
                    notification["error"]({
                        message: `Thông báo`,
                        description:
                            'Xóa danh mục thất bại',

                    });
                    setLoading(false);
                }
                else {
                    notification["success"]({
                        message: `Thông báo`,
                        description:
                            'Xóa danh mục thành công',

                    });
                    setCurrentPage(1);
                    handleCategoryList();
                    setLoading(false);
                    window.location.reload();
                }
            }
            );

        } catch (error) {
            console.log('Failed to fetch event list:' + error);
        }
    }
    const columns = [
        // {
        //     title: 'Mã đơn hàng',
        //     dataIndex: '_id',
        //     key: '_id',
        // },
        {
            title: 'Sản phẩm',
            dataIndex: 'products',
            key: 'products',
            render: (products) => (
                <div>
                    {products.map((item, index) => (
                        <div key={index}>
                            {item.product.name}
                        </div>
                    ))}
                </div>
            ),
        },
        {
            title: 'Giá',
            dataIndex: 'products',
            key: 'products',
            render: (products) => (
                <div>
                    {products.map((item, index) => (
                        <div key={index}>
                            {item.product.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                        </div>
                    ))}
                </div>
            ),
        },
        {
            title: 'Số lượng',
            dataIndex: 'products',
            key: 'products',
            render: (products) => (
                <div>
                    {products.map((item, index) => (
                        <div key={index}>
                            {item.quantity}
                        </div>
                    ))}
                </div>
            ),
        },
        {
            title: 'Tổng đơn hàng',
            dataIndex: 'orderTotal',
            key: 'orderTotal',
            render: (products) => (
                <div>{products.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</div>
            ),
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Hình thức thanh toán',
            dataIndex: 'billing',
            key: 'billing',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (slugs) => (
                <span >
                    {slugs === "rejected" ? <Tag style={{ width: 90, textAlign: "center" }} color="red">Đã hủy</Tag> : slugs === "approved" ? <Tag style={{ width: 90, textAlign: "center" }} color="geekblue" key={slugs}>
                        Vận chuyển
                    </Tag> : slugs === "final" ? <Tag color="green" style={{ width: 90, textAlign: "center" }}>Đã giao</Tag> : <Tag color="blue" style={{ width: 90, textAlign: "center" }}>Đợi xác nhận</Tag>}
                </span>
            ),
        },
        {
            title: 'Ngày đặt',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (createdAt) => (
                <span>{moment(createdAt).format('DD/MM/YYYY HH:mm')}</span>
            ),
        },

        {
            title: 'Hành động',
            key: 'action',
            render: (text, record) => (
                <Button type="danger" onClick={() => handleDeleteCategory(record._id)}>
                    Xóa
                </Button>


            ),
        },

    ];

    useEffect(() => {
        (async () => {
            try {
                await productApi.getOrderByUser().then((item) => {
                    console.log(item);
                    setOrderList(item);
                });
                setLoading(false);

            } catch (error) {
                console.log('Failed to fetch event detail:' + error);
            }
        })();
        window.scrollTo(0, 0);
    }, [])

    return (
        <div>
            <Spin spinning={false}>
                <div className="container" style={{ marginBottom: 30 }}>
                    <h1 style={{ fontSize: 25, marginTop: 25, paddingBottom: 25 }}>Quản lý đơn hàng</h1>
                    <Card >
                        <Table columns={columns} dataSource={orderList.data} rowKey='_id' pagination={{ position: ['bottomCenter'] }} />
                    </Card>
                </div>
            </Spin>
        </div >
    );
};

export default CartHistory;
