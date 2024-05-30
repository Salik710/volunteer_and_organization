import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/home';
import Organization from './pages//organization/Organization';
import Volunteer from './pages/volunteer/Volunteer';
import Eventspage from './pages/Eventspage';
import Event from './pages/event/Event';
import Navbar from './components/Navbar';
import RegisterLogin from './pages/registerLogin';
import ProtectedRoute from './ProtectedRoute';
import CreateEvent from './pages/CreateEvent';

const RouterConfig = () => {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/events" element={<Eventspage />} />
                    <Route path="/registerLogin/:userType" element={<RegisterLogin />} />
                    {/* Protected routes */}
                    <Route path="/organization/:email" element={<ProtectedRoute userTypeAuth="organization" element={<Organization />} />} />
                    <Route path="/volunteer/:email" element={<ProtectedRoute userTypeAuth="volunteer" element={<Volunteer />} />} />
                    <Route path="/Event/:id" element={<ProtectedRoute userTypeAuth="organization" element={<Event />} />} />
                    <Route path="/organization/createEvent" element={<ProtectedRoute userTypeAuth="organization" element={<CreateEvent />} />} />
                </Routes>
            </div>
        </Router>
    );
};

export default RouterConfig;
