import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NotificationCard from './NotificationCard';
import Layout from "../../components/Layout";
import { Tab } from '@headlessui/react';
// Import Font Awesome icons
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const NotificationsPage = () => {
  const [unseenNotifications, setUnseenNotifications] = useState([]);
  const [seenNotifications, setSeenNotifications] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);

  const USER_API_END_POINT = "http://localhost:8888/api/v1/user";

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem('token');
      try {
        const unseenResponse = await axios.get(`${USER_API_END_POINT}/notifications/unseen`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        });
        const seenResponse = await axios.get(`${USER_API_END_POINT}/notifications/seen`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        });
        setUnseenNotifications(unseenResponse.data.notifications || []);
        setSeenNotifications(seenResponse.data.notifications || []);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const markAllAsSeen = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(`${USER_API_END_POINT}/notifications/mark-all-seen`, {}, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
      });
      setSeenNotifications(prev => [...prev, ...unseenNotifications]);
      setUnseenNotifications([]);
    } catch (error) {
      console.error("Error marking all notifications as seen:", error);
    }
  };

  const deleteAllNotifications = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${USER_API_END_POINT}/notifications/delete-all`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
      });
      setUnseenNotifications([]);
      setSeenNotifications([]);
    } catch (error) {
      console.error("Error deleting all notifications:", error);
    }
  };

  const renderNotifications = (notifications) => {
    return notifications.length > 0 ? (
      notifications.map(notification => (
        <NotificationCard
          key={notification._id}
          notification={notification}
          setUnseenNotifications={setUnseenNotifications}
          setSeenNotifications={setSeenNotifications}
          unseenNotifications={unseenNotifications}
          seenNotifications={seenNotifications}
        />
      ))
    ) : (
      <p className="text-center text-gray-500">No notifications to display.</p>
    );
  };

  return (
    <Layout>
      <div className="h-[89vh] px-2 py-9">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">Notifications</h1>
            <div className="flex space-x-4">
              <button
                onClick={markAllAsSeen}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transform hover:scale-105 transition duration-150"
              >
                Mark All as Seen
              </button>
              <button
                onClick={deleteAllNotifications}
                className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transform hover:scale-105 transition duration-150"
              >
                Delete All
              </button>
            </div>
          </div>

          <Tab.Group onChange={index => setCurrentTab(index)}>
            <Tab.List className="flex space-x-14 bg-gray-200 p-3 px-7 rounded-lg">
              <Tab className={({ selected }) =>
                selected
                  ? "w-full py-2.5 text-sm leading-5 font-medium text-blue-700 bg-white rounded-lg shadow"
                  : "w-full py-2.5 text-sm leading-5 font-medium text-blue-700 bg-gray-100 rounded-lg"
              }>
                Unseen
              </Tab>
              <Tab className={({ selected }) =>
                selected
                  ? "w-full py-2.5 text-sm leading-5 font-medium text-blue-700 bg-white rounded-lg shadow"
                  : "w-full py-2.5 text-sm leading-5 font-medium text-blue-700 bg-gray-100 rounded-lg"
              }>
                Seen
              </Tab>
            </Tab.List>

            <Tab.Panels className="mt-8">
              <Tab.Panel>
                {renderNotifications(unseenNotifications)}
              </Tab.Panel>
              <Tab.Panel>
                {renderNotifications(seenNotifications)}
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </Layout>
  );
};

export default NotificationsPage;
