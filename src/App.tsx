import { useEffect, useState } from 'react';
import About from './components/About/About';
import Diagram from './components/Diagram/Diagram';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import How from './components/How/How';
import Primary, { TStat } from './components/Primary/Primary';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { Route, Routes } from 'react-router-dom';
import FeeM from './components/FeeM/FeeM';
import ServerConnect from './servie';

export interface Deployment {
  timestamp: number;
  amount: number;
  type: string;
  amount_usd: number;
  tx_hash: string;
}


function App() {
  const [stats, setStats] = useState<TStat>(window.__STATS__ || {
    gas_burnt_usd: 0,
    gas_burnt: 0,
    deployments_usd: 0,
    deployments: 0,
    holders_count: 0,
    fdv_usd: 0,
    hashrate: 0,
  })

  const [deployments, setDeployments] = useState<Deployment[]>([]);

  useEffect(() => {
    ServerConnect.getStats()
      .then((data) => {
        setStats(data)
      })
      .catch(err => console.log(err))
    setInterval(() => {
      ServerConnect.getStats()
        .then((data) => {
          setStats(data)
        })
        .catch(err => console.log(err))
    }, 20000)
    AOS.init();
  }, [])
  return (
    <div className="app-container">
      <Header />
      <Routes>
        <Route path='/' element={
          <main>
            <Primary stats={stats} />
            <About />
            <How />
            <Diagram />
          </main>
        } />
        <Route path='/feem' element={<FeeM deployments={deployments} setDeployments={setDeployments} stats={stats} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;