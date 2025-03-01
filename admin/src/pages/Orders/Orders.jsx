import React from 'react'
import './Orders.css'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import axios from 'axios'
import { assets } from '../../assets/assets'
const Orders = ({ url }) => {

  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    const response = await axios.get(`${url}/api/order/list`)
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data)
    } else {
      toast.error("Lỗi")
    }
  }

  const statusHandler = async (event, orderId) => {
    // event.preventDefault()
    // const status = event.target.value
    const response = await axios.post(`${url}/api/order/status`, { orderId, status: event.target.value })
    if (response.data.success) {
      toast.success("Cập nhật trạng thái thành công!")
      fetchAllOrders()
    } else {
      toast.error("Lỗi")
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [])
  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => {
          return (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="" />
              <div >
                <p className="order-item-food">
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " x " + item.quantity
                    } else {
                      return item.name + " x " + item.quantity + ", "
                    }
                  })}
                </p>
                <p className="order-item-name">{order.address.firstName + " " + order.address.lastName}</p>
                <div className="order-item-address">
                  <p>{order.address.street}</p>
                  <p>{order.address.state + ", " + order.address.city + ", "+ order.address.country + ", " + order.address.zipcode}</p>
                </div>
                <p className="order-item-phone">{order.address.phone}</p>
              </div>
              <p>Số món: {order.items.length}</p>
              <p>${order.amount}</p>
              <select onChange={()=> statusHandler(event, order._id)} value={order.status} name="" id="">
                <option value="Món ăn đã được đặt">Món ăn đã được đặt</option>
                <option value="Đang vận chuyển">Đang vận chuyển</option>
                <option value="Giao hàng thành công">Giao hàng thành công</option>
              </select>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Orders