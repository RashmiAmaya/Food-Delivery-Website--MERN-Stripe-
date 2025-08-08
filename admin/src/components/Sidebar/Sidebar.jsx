import "./sidebar.css"
import { NavLink } from 'react-router-dom'
import { 
  HomeIcon,
  UsersIcon,
  PlusCircleIcon,
  Square3Stack3DIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline'

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/" className="sidebar-option" end>
          <HomeIcon className="nav-icon" />
          <p>Dashboard</p>
        </NavLink>
        <NavLink to="/users" className="sidebar-option">
          <UsersIcon className="nav-icon" />
          <p>Users</p>
        </NavLink>
        <NavLink to="/add" className="sidebar-option">
          <PlusCircleIcon className="nav-icon" />
          <p>Add Food</p>
        </NavLink>
        <NavLink to="/list" className="sidebar-option">
          <Square3Stack3DIcon className="nav-icon" />
          <p>List Foods</p>
        </NavLink>
        <NavLink to="/orders" className="sidebar-option">
          <ShoppingBagIcon className="nav-icon" />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar