import { Link, Outlet } from 'react-router-dom'

const Test = () => {
   return (
      <div>
         <Link to="AddNewTest">Add New Test</Link>
         <p>Test page</p>
         <Outlet />
      </div>
   )
}

export default Test
