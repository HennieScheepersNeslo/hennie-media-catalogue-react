import { render } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export const renderComponentWithBrowserRouter = (component) => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={component} />
      </Routes>
    </BrowserRouter>
  );
};
