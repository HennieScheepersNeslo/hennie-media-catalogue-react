import { render } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const renderComponentWithBrowserRouter = (component) => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={component} />
      </Routes>
    </BrowserRouter>
  );
};

export default renderComponentWithBrowserRouter;
