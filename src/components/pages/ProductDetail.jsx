import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail({ products, setRecentProducts }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  
  useEffect(() => {
    // id는 문자열로 전달되므로 숫자로 변환
    const productId = parseInt(id);
    const foundProduct = products.find((p) => p.id === productId);
    setProduct(foundProduct);
  }, [id, products]);
  
  useEffect(() => {
    if (product) {
      // 최근 본 상품을 localStorage에서 가져오기
      const savedProducts = JSON.parse(localStorage.getItem('recentProducts') || '[]');
      
      // 현재 상품이 이미 있다면 제거
      const filteredProducts = savedProducts.filter(p => p.id !== product.id);
      
      // 새 상품을 배열 앞에 추가 (최대 6개까지만 저장)
      const newRecentProducts = [product, ...filteredProducts].slice(0, 9);
      
      // localStorage에 저장
      localStorage.setItem('recentProducts', JSON.stringify(newRecentProducts));
      
      // 상태 업데이트
      setRecentProducts(newRecentProducts);
    }
  }, [product]);
  
  const addToCart = () => {
    // Cart에 저장된 상품 가져오기
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // 현재 상품을 Cart에 추가
    const updatedCartItems = [...cartItems, product];
    
    // localStorage에 저장
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    
    // 사용자에게 알림
    alert('상품이 장바구니에 추가되었습니다.');
  };
  
  // 상품을 찾는 동안 로딩 표시
  if (!product) {
    return <div className="container"><h4>로딩 중...</h4></div>;
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <img
              src={product.image || `https://codingapple1.github.io/shop/shoes${product.id + 1}.jpg`}
              width="100%"
              alt="상품 이미지"
            />
          </div>
          <div className="col-md-6">
            <h4 className="pt-5">{product.title || product.name}</h4>
            <p>{product.content || product.description}</p>
            <p>{product.price}원</p>
            <button className="btn btn-danger" onClick={addToCart}>주문하기</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;