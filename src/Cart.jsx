import { useSelector } from 'react-redux'

function Cart() {
    const cart = useSelector((state) => state.cart)
    
    return (
        <div>
            {cart.map((item) => (
                <div key={item.id}>
                    <h4>{item.name}</h4>
                    <p>수량: {item.count}</p>
                </div>
            ))}
        </div>
    )
}

export default Cart 