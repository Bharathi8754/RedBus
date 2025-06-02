import NavBar from './components/admin/NavBar'
import ShowBus from './components/admin/ShowBus'
import { QueryClientProvider,QueryClient } from '@tanstack/react-query'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Test from './components/admin/Test'
import CreateBus from './components/admin/CreateBus'
import EditBus from './components/admin/EditBus'
import Index from './components/home/Index'
import AdminNavLayout from './components/layout/AdminNavLayout'
import HomeNabLayout from './components/layout/HomeNabLayout'
import Booking from './components/home/Booking'
import BookingSuccess from './components/home/BookingSuccess'
function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
       <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<AdminNavLayout />}>
            <Route path="businfo" element={<ShowBus />} />
            <Route path="createbus" element={<CreateBus />} />
            <Route path="editbus/:bus_id" element={<EditBus />} />
          </Route>

          <Route path="/" element={<HomeNabLayout />}>
            <Route path="" element={<Index />} />
            <Route path="booking/:booking_bus_id" element={<Booking />} />
          </Route>
          <Route path="/success/:user_id" element={<BookingSuccess />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
