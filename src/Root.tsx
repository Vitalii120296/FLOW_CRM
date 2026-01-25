import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { App } from './app/App.tsx';
import { DashBoard } from './pages/DashBoard/DashBoard.tsx';
import { Kanban } from './pages/Kanban/Kanban.tsx';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Kanban />} />
          <Route path="dashboard" element={<DashBoard />} />
        </Route>
      </Routes>
    </Router>
  );
}