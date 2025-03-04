import { useState, useEffect } from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import data from "./data.jsx";
import ProductList from "./components/pages/ProductList.jsx";
import ProductDetail from "./components/pages/ProductDetail.jsx";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  Outlet,
} from "react-router-dom";
import axios from "axios";
import Cart from "./components/pages/Cart.jsx";

function App() {
  const [products, setProducts] = useState(data);
  const [dataIndex, setDataIndex] = useState(2); // 다음에 불러올 데이터 번호
  const [recentProducts, setRecentProducts] = useState([]); // 최근 본 상품 상태 추가
  const navigate = useNavigate();

  // 컴포넌트 마운트 시 localStorage에서 최근 본 상품 불러오기
  useEffect(() => {
    const savedProducts = localStorage.getItem('recentProducts');
    if (savedProducts) {
      setRecentProducts(JSON.parse(savedProducts));
    }
  }, []);

  const fetchMoreProducts = () => {
    if (dataIndex > 3) {  // data3.json까지만 있다고 가정
      alert("더 이상 불러올 상품이 없습니다.");
      return;
    }

    axios
      .get(`https://codingapple1.github.io/shop/data${dataIndex}.json`)
      .then((res) => {
        setProducts([...products, ...res.data]);
        setDataIndex(dataIndex + 1);  // 다음 데이터를 위해 인덱스 증가
      })
      .catch((error) => {
        console.error("상품을 불러오는데 실패했습니다:", error);
      });
  };

  // 이미지 URL을 수정하는 함수 추가
  const getImageUrl = (id) => {
    return `https://codingapple1.github.io/shop/shoes${id + 1}.jpg`;
  };

  return (
    <div className="App">
      {/* 메인 컨텐츠 영역 */}
      <div className="main-content">
        <Navbar bg="light" variant="light" className="mb-0">
          <Container style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <Navbar.Brand as={Link} to="/" style={{ color: 'black', marginLeft: '70px' }}>ShoeShop</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link onClick={() => navigate("/")} className="nav-item">
                Home
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/cart")} className="nav-item">
                Cart
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        <Routes>
          <Route
            path="/"
            element={
              <div>
                {/* 메인 배경 이미지 */}
                <div className="main-bg"></div>
                {/* 상품 리스트 컴포넌트 */}
                <Container>
                  <ProductList products={products} />
                  {/* 버튼 추가 */}
                  <div className="text-center mt-4">
                    <button
                      className="px-4 py-2 bg-blue-500 text-black rounded-lg hover:bg-blue-600"
                      onClick={fetchMoreProducts}
                    >
                      {dataIndex > 3 ? "상품 없음" : "더 보기"}
                    </button>
                  </div>
                </Container>
              </div>
            }
          />
          {/* 상품 상세 페이지 */}
          <Route
            path="/detail/:id"
            element={
              <ProductDetail 
                products={products} 
                setRecentProducts={setRecentProducts}  // props로 전달
              />
            }
          />
          {/* 장바구니 페이지 */}
          <Route path="/cart" element={ <Cart/> } /> 
          {/* 404 페이지 */}
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </div>

      {/* 최근 본 상품 플로팅 창 */}
      {recentProducts.length > 0 && (
        <div className="recent-products-floating">
          <div className="floating-header">
            <h6 className="mb-0">최근 본 상품</h6>
          </div>
          <div className="floating-content">
            {recentProducts.slice(-3).reverse().map((product) => (
              <div
                key={product.id}
                className="recent-product-item mb-2"
                onClick={() => navigate(`/detail/${product.id}`)}
              >
                <img
                  src={getImageUrl(product.id)}
                  alt={product.title}
                  className="rounded"
                />
                <p className="small mb-1 mt-1">{product.title}</p>
                <p className="small text-muted mb-0">{product.price.toLocaleString()}원</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
