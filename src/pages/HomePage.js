import { Outlet } from 'react-router-dom';

import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar';

export default function HomePage() {
  return (
    <>
      <Header />
      <Sidebar />
      <section className="sm:ml-64 mt-2">
        <Outlet />
      </section>
    </>
  );
}
