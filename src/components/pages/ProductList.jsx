import React from 'react';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate } from 'react-router-dom';

function ProductList({ products }) {
  const navigate = useNavigate();

  return (
    <Row>
      {products.map((product) => (
        <Col key={product.id} md={4} className="mb-4">
          <div className="product-card">
            <div className="img-container" style={{
              width: '100%',
              height: '200px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
              marginBottom: '10px'
            }}>
              <img 
                src={`https://codingapple1.github.io/shop/shoes${product.id + 1}.jpg`} 
                alt={product.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  cursor: 'pointer'
                }}
                onClick={() => navigate(`/detail/${product.id}`)}
              />
            </div>
            <h4 className="mt-2">{product.title}</h4>
            <p>{product.content}</p>
            <p>{product.price.toLocaleString()}원</p>
          </div>
        </Col>
      ))}
    </Row>
  );
}

export default ProductList; 