import React from 'react';
import { Layout } from 'antd';
import { Col, Row, Divider } from "antd";
import { SocialIcon } from 'react-social-icons';
import "./footer.css";

const { Footer } = Layout;

function _Footer() {
    return (

        <Footer style={{ backgroundColor: "#1e0a3c", padding: 30, paddingTop: 80 }}>
            <Row className="footer-desktop">
                <Col span={3} className="footer">
                    <strong style={{ color: "#FFFFFF", fontSize: 20, cursor: "pointer" }}>Tổng đài hỗ trợ</strong>
                    <p style={{ marginTop: 20, color: "#FFFFFF", fontWeight: 400, fontSize: 14, cursor: "pointer" }}>Gọi mua hàng 1900 0000</p>
                    <p style={{ marginTop: 20, color: "#FFFFFF", fontWeight: 400, fontSize: 14, cursor: "pointer" }}>Gọi khiếu nại 1900 0000</p>
                    <p style={{ marginTop: 20, color: "#FFFFFF", fontWeight: 400, fontSize: 14, cursor: "pointer" }}>Gọi bảo hành 1900 0000</p>
                </Col>
                <Col span={4} className="footer">
                    <strong style={{ color: "#FFFFFF", fontSize: 20, cursor: "pointer" }}>Thông tin và chính sách</strong>
                    <p style={{ marginTop: 20, color: "#FFFFFF", fontWeight: 400, fontSize: 14, cursor: "pointer" }}>Mua hàng và thanh toán Online</p>
                    <p style={{ marginTop: 20, color: "#FFFFFF", fontWeight: 400, fontSize: 14, cursor: "pointer" }}>Mua hàng trả góp Online</p>
                    <p style={{ marginTop: 20, color: "#FFFFFF", fontWeight: 400, fontSize: 14, cursor: "pointer" }}>Tra thông tin bảo hành</p>
                </Col>
                <Col span={4} className="footer">
                    <strong style={{ color: "#FFFFFF", fontSize: 20, cursor: "pointer" }}>Dịch vụ và thông tin khác</strong>
                    <p style={{ marginTop: 20, color: "#FFFFFF", fontWeight: 400, fontSize: 14, cursor: "pointer" }}>Ưu đãi thanh toán</p>
                    <p style={{ marginTop: 20, color: "#FFFFFF", fontWeight: 400, fontSize: 14, cursor: "pointer" }}>Quy chế hoạt động</p>
                    <p style={{ marginTop: 20, color: "#FFFFFF", fontWeight: 400, fontSize: 14, cursor: "pointer" }}>Chính sách Bảo hành</p>
                    <p style={{ marginTop: 20, color: "#FFFFFF", fontWeight: 400, fontSize: 14, cursor: "pointer" }}>Liên hệ hợp tác kinh doanh</p>
                </Col>
                <Col span={5} className="footer">
                    <strong style={{ color: "#FFFFFF", fontSize: 20, cursor: "pointer" }}>Địa chỉ</strong>
                    <p style={{ marginTop: 20, color: "#FFFFFF", fontWeight: 400, fontSize: 14, cursor: "pointer" }}>Chi nhánh 1: 61, Đường 77, phường Tân Quy, Quận 7, TP HMC</p>
                    <p style={{ marginTop: 20, color: "#FFFFFF", fontWeight: 400, fontSize: 14, cursor: "pointer" }}>Chi nhánh 2: 142/36/3, Nguyễn Thị Thập, phường Bình Thuận, Quận 7, TP HCM</p>

                </Col>
                <Col span={4}>
                    <strong style={{ color: "#FFFFFF", fontSize: 20, marginBottom: 40, cursor: "pointer" }}>Kết nối với chúng tôi</strong>
                    <Row style={{ marginTop: 15 }}>
                        <Col span={6}>
                            <SocialIcon url="https://www.youtube.com/channel/UCmtdk_xqvbtd_-sZrMNb9hw" style={{ height: 35, width: 35, cursor: "pointer" }} />
                        </Col>
                        <Col span={6}>
                            <SocialIcon url="https://www.facebook.com/ngo.bao.5496" style={{ height: 35, width: 35, cursor: "pointer" }} />
                        </Col>
                       
                        <Col span={6}>
                            <SocialIcon url="https://www.tiktok.com/@baongo412?lang=vi-VN" style={{ height: 35, width: 35, cursor: "pointer" }} />
                        </Col>
                    </Row>

                </Col>
            </Row>
            <div className="footer-mobile">
                <Row justify="center">
                    <strong style={{ color: "#FFFFFF", fontSize: 20, cursor: "pointer" }}>Home Page</strong>
                </Row>
                <Row justify="center">
                    <p style={{ marginTop: 20, color: "#FFFFFF", fontWeight: 400, fontSize: 14, cursor: "pointer" }}>About Us</p>
                </Row>
                <Row justify="center">
                    <strong style={{ color: "#FFFFFF", fontSize: 20, cursor: "pointer", textAlign: "center" }}>Our Connection</strong>
                </Row>
                <Row justify="center">
                    <p style={{ marginTop: 20, color: "#FFFFFF", fontWeight: 400, fontSize: 14, cursor: "pointer" }}>Da Store</p></Row>
                <Row justify="center">
                    <strong style={{ color: "#FFFFFF", fontSize: 20, marginBottom: 30, cursor: "pointer" }}>Follow Us</strong>
                </Row>

                <Row style={{ marginTop: 5 }} justify="center">
                    <Col >
                        <SocialIcon url="#" style={{ height: 35, width: 35, cursor: "pointer" }} />
                    </Col>
                    <Col style={{ marginLeft: 20 }}>
                        <SocialIcon url="#" style={{ height: 35, width: 35, cursor: "pointer" }} />
                    </Col>
                    <Col style={{ marginLeft: 20 }}>
                        <SocialIcon url="#" style={{ height: 35, width: 35, cursor: "pointer" }} />
                    </Col>
                    <Col style={{ marginLeft: 20 }}>
                        <SocialIcon url="#" style={{ height: 35, width: 35, cursor: "pointer" }} />
                    </Col>
                </Row>
            </div>
            <div style={{ textAlign: 'center' }}>
                <Divider style={{ padding: 0 }} />
                <p style={{ color: "#FFFFFF", fontSize: 13 }}>Copyright@ 2023 Created by team Chí Bảo - Quyết Chiến</p>
                <p style={{ color: "#FFFFFF", fontSize: 13 }}>Điện thoại: (+84) 0826224670 - (+84) 0353056921</p>
            </div>
        </Footer>
    );
}

export default _Footer;