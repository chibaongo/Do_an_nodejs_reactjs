import React, { useState, useEffect } from "react";
import "./news.css";
import { DatePicker, Input } from 'antd';
import { Card, Table, Space, Tag, PageHeader, Divider, Form, List, notification } from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined, MailOutlined, AimOutlined, MoneyCollectOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import axiosClient from "../../apis/axiosClient";
import productApi from "../../apis/productApi";
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

const { Search } = Input;

const News = () => {
    const [news, setNews] = useState([]);
    let history = useHistory();

    const onFinish = async (values) => {
        // ...
    }

    useEffect(() => {
        (async () => {
            try {
                await productApi.getNews().then((item) => {
                    setNews(item.data.docs);
                });
            } catch (error) {
                console.log('Failed to fetch event detail:' + error);
            }
        })();
        window.scrollTo(0, 0);
    }, []);

    const handleMouseEnter = (e) => {
        e.currentTarget.classList.add("zoomed");
    };

    const handleMouseLeave = (e) => {
        e.currentTarget.classList.remove("zoomed");
    };

    return (
      
        <div className="pt-5 container" style={{ marginBottom: '300px' }}>
            
            <List 
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 5,
                }}
                dataSource={news}
                renderItem={(item) => (
                    <Link to={`/news/${item._id}`}>
                        <Card className="news-card">
                            <div 
                                className="news-item"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <div className="news-item-content">
                                    <div className="news-item-title">{item.name}</div>
                                    <div className="news-item-image-container">
                                        <img src={item.image} alt="News Image" className="news-item-image" />
                                    </div>
                                </div>

                            </div>
                        </Card>
                    </Link>
                )}
            />
        </div>
    );
}

export default News;
