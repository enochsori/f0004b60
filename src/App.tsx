import { Outlet } from 'react-router-dom';
import Header from './components/Header';

function App() {
  return (
    <div className='w-[376px] h-[666px] z-[100] bg-white rounded-[3px] shadow-[0_0_5px_0_rgba(0,0,0,0.9)]'>
      <Header />
      <section className='p-5'>
        <Outlet />
      </section>
    </div>
  );
}

export default App;
