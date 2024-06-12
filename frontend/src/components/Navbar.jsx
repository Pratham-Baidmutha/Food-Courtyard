import React ,{ useState }from 'react';
import { Link , useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import { useCart } from './contextReducer';
import Model from '../Model';
import Cart from '../screens/Cart';

export default function Navbar() {
  let data = useCart(); 

  const [cartView, setCartView] = useState(false)

  const navigate = useNavigate()

  function handleLogout(){
    localStorage.removeItem("authToken")
    navigate("/")
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success bg-gradient">
        <div className="container-fluid">
          <Link className="navbar-brand fs-3" to="/">FOODIE</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">

            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>

              {(localStorage.getItem("authToken")) ?
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/myorder">My Orders</Link>
                </li>
                : ""}
            </ul>


            {(!localStorage.getItem("authToken")) ?
              <div className='d-flex gap-2'>
                <Link className="btn bg-white text-success" to="/login">Login</Link>
                <Link className="btn bg-white text-success" to="/createuser">Signup</Link>
              </div>
              : <div className='d-flex gap-2'>
                <div className="btn bg-white text-success" onClick={() => setCartView(true)} >My Cart{" "}
                
                <Badge pill bg='danger'>{data.length}</Badge> 

                </div>

                {cartView ? <Model onClose={() => setCartView(false)}><Cart></Cart></Model> : ""}

                <div className="btn bg-white text-success" onClick={handleLogout}>Logout</div>
              </div>
            }

          </div>
        </div>

      </nav>
    </div>
  )
}
