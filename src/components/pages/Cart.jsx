import Table from "react-bootstrap/Table";
import { useDispatch } from 'react-redux';
import { addCount, subtractCount } from '../../store.jsx';
import { Button, Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';

function Cart() {
  const [cart, setCart] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // localStorage에서 cart 데이터 가져오기
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // id 기준으로 중복 처리
    const cartMap = storedCart.reduce((acc, item) => {
      if (acc[item.id]) {
        acc[item.id].count += 1;
      } else {
        acc[item.id] = { ...item, count: 1 };
      }
      return acc;
    }, {});

    // 객체를 배열로 변환
    setCart(Object.values(cartMap));
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="mb-4">장바구니</h2>
      <Table hover>
        <thead className="table-light">
          <tr>
            <th className="text-center">id</th>
            <th>상품명</th>
            <th className="text-center">수량</th>
            <th className="text-center">변경</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td className="text-center align-middle">{item.id}</td>
              <td className="align-middle">{item.title}</td>
              <td className="text-center align-middle">{item.count}</td>
              <td className="text-center">
                <Button 
                  variant="outline-primary" 
                  size="sm" 
                  className="me-2"
                  onClick={() => dispatch(addCount(item.id))}
                >
                  +
                </Button>
                <Button 
                  variant="outline-danger" 
                  size="sm"
                  onClick={() => dispatch(subtractCount(item.id))}
                >
                  -
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Cart;
