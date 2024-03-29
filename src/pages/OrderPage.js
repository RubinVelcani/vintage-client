import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { detailsOrder } from '../actions/orderActions';
import { PayPalButton } from 'react-paypal-button-v2';

export default function OrderPage(props) {

  const orderId = props.match.params.id;

  //const [sdkReady, setSdkReady] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);

  const { order, loading, error } = orderDetails;

  const dispatch = useDispatch();

  useEffect(() => {
    // const addPayPalScript = async () => {
    //   const { data } = await axios.get('/api/config/paypal');
    //   const script = document.createElement('script');
    //   script.type = "text/javascript";
    //   script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
    //   script.async = true;
    //   script.onload = () => {
    //     setSdkReady(true);
    //   };
    //   document.body.appendChild(script);
    // }

    // if (order._id) {

    // } else {
    //   if (!order.isPaid) {
    //     if (!window.paypal) {
    //       addPayPalScript();
    //     } else {
    //       setSdkReady(true);
    //     }
    //   }
    // }
    dispatch(detailsOrder(orderId));
  }, [dispatch, orderId]);

  const successPaymentHandler = () => {
    // TODO: dispatch payment order
  }

  return loading
    ? (<LoadingBox />)
    : error
      ? (<MessageBox variant="danger">{error}</MessageBox>)
      : (
        <div>
          <h1>Order {order._id} </h1>
          <div className="row top">
            <div className="col-2">
              <ul>
                <li>
                  <div className="card card-body">
                    <h2>Shipping</h2>
                    <p>
                      <strong>Name: </strong> {order.shippingAddress.fullName}<br />
                      <strong>Address: </strong>
                      {order.shippingAddress.address},
                      {' ' + order.shippingAddress.city},
                      {' ' + order.shippingAddress.postalCode},
                      {' ' + order.shippingAddress.country}
                    </p>
                    {order.isDelivered
                      ? <MessageBox variant="success">
                        Delivered at {order.deliveredAt}
                      </MessageBox>
                      : <MessageBox variant="danger">
                        Not Delivered
                      </MessageBox>
                    }
                  </div>
                </li>
                <li>
                  <div className="card card-body">
                    <h2>Payment</h2>
                    <p>
                      <strong>Method: </strong> {order.paymentMethod}
                    </p>
                    {order.isPaid
                      ? <MessageBox variant="success">
                        Paid at {order.paidAt}
                      </MessageBox>
                      : <MessageBox variant="danger">
                        Not Paid
                      </MessageBox>
                    }
                  </div>
                </li>
                <li>
                  <div className="card card-body">
                    <h2>Order Items</h2>
                    <ul>
                      {
                        order.orderItems.map((item) => (
                          <li key={item.product}>
                            <div className="row">
                              <div>
                                <img src={item.image}
                                  alt={item.name}
                                  className="small"
                                />
                              </div>
                              <div className="min-30">
                                <Link to={`/products/${item.product}`}>
                                  {item.name}
                                </Link>
                              </div>
                              <div>
                                {item.qty} x ${item.price} = ${item.qty * item.price}
                              </div>
                            </div>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    <h2>Order Summary</h2>
                  </li>
                  <li>
                    <div className="row">
                      <div>Items</div>
                      <div>${order.itemsPrice.toFixed(2)}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Shipping Costs</div>
                      <div>${order.shippingPrice.toFixed(2)}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Tax</div>
                      <div>${order.taxPrice.toFixed(2)}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>
                        <strong>Order Total</strong>
                      </div>
                      <div>${order.totalPrice.toFixed(2)}</div>
                    </div>
                  </li>
                  <li>
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}>

                    </PayPalButton>
                  </li>
                  {/* {
                    !order.isPaid && (
                      <li>
                        {!sdkReady
                          ? (<LoadingBox />)
                          : (<PayPalButton
                            amount={order.totalPrice}
                            onSuccess={successPaymentHandler}>

                          </PayPalButton>)
                        }
                      </li>
                    )
                  } */}
                  {loading && <LoadingBox />}
                  {error && <MessageBox variant="danger">{error}</MessageBox>}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
}
