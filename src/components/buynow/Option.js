
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fState } from '../../store/slice/CartCounter';

const Option = ({ data,quantity }) => {

    const [quan,setQuan]=useState(quantity)

    const dispatch = useDispatch();

    const deleteProduct = async () => {
        const res = await fetch("/deleteproduct", {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                data
            }),
            credentials: "include"
        });
        const data1 = await res.json();

        if (res.status === 201) {
            let count = 0
            for (let i = 0; i < data1.data.items.length; i++) {
                count = count + data1.data.items[i].quantity
            }
            dispatch(fState(count))
        }
    };

    const updateCart = async (value) => {
        const res = await fetch("/updatecart", {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                data,value
            }),
            credentials: "include"
        });
        const data1 = await res.json();
        if (res.status === 200) {
            for (let i = 0; i < data1.items.length; i++) {
                if(data1.items[i].productId===data){
                    setQuan(data1.items[i].quantity);
                    break;
                }
            }

            let count = 0
            for (let i = 0; i < data1.items.length; i++) {
                count = count + data1.items[i].quantity
            }
            dispatch(fState(count))  
        }
    };

    return (
        <div className='add_remove_select'>
            <select value={quan} onChange={e=>updateCart(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <p style={{ cursor: 'pointer' }} onClick={deleteProduct}>Delete</p><span>|</span>
            <p className='forremovemedia'>Save Or Later</p><span>|</span>
            <p className='forremovemedia'>See More like this</p>
        </div>
    )
}

export default Option