import Form from "./pages/Form";
import Posts from "./pages/Posts";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/posts/:id" element={<Posts />} />
          <Route path="*" element={<Form />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
