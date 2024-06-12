import { Outlet } from 'react-router-dom';

import Header from '../components/Layout/Header';

export default function RootPage() {
  return (
    <>
      <Header />
      <section className="sm:ml-64 mt-2">
        <Outlet />
      </section>
    </>
  );
}
