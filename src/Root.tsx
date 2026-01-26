import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { App } from './app/App.tsx';
import { Kanban } from './pages/Kanban/Kanban.tsx';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Kanban />} />
          <Route path="kanban" element={<Kanban />} />
        </Route>
      </Routes>
    </Router>
  );
}