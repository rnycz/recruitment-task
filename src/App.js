import React, { useEffect } from "react";
import "./styles/style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import UsersPage from "./pages/UsersPage";
import PostsPage from "./pages/PostsPage";
import TodosPage from "./pages/TodosPage";
import Navbar from "./components/Navbar";
import AddUser from "./components/AddUser";
import AddPost from "./components/AddPost";
import { useStateContext } from "./contexts/ContextProvider";

function App() {
  // use states to manage data
  const {
    setFetchUsers,
    setLoadingUsers,
    setErrorUsers,

    setFetchPosts,
    setLoadingPosts,
    setErrorPosts,

    setFetchComments,
    setLoadingComments,
    setErrorComments,

    setFetchTodos,
    setLoadingTodos,
    setErrorTodos,
  } = useStateContext();

  // fetch users from API and save them to states
  useEffect(() => {
    fetch("https://gorest.co.in/public/v1/users")
      .then((response) => {
        // error handling
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setFetchUsers(data);
        setErrorUsers(null);
      })
      .catch((error) => {
        setErrorUsers(error.message);
        setFetchUsers(null);
      })
      .finally(() => {
        setLoadingUsers(false);
      });
  }, []);

  // fetch posts from API and save them to states
  useEffect(() => {
    fetch("https://gorest.co.in/public/v1/posts")
      .then((response) => {
        // error handling
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setFetchPosts(data);
        setErrorPosts(null);
      })
      .catch((error) => {
        setErrorPosts(error.message);
        setFetchPosts(null);
      })
      .finally(() => {
        setLoadingPosts(false);
      });
  }, []);

  // fetch comments from API and save them to states
  useEffect(() => {
    fetch("https://gorest.co.in/public/v1/comments")
      .then((response) => {
        // error handling
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setFetchComments(data);
        setErrorComments(null);
      })
      .catch((error) => {
        setErrorComments(error.message);
        setFetchComments(null);
      })
      .finally(() => {
        setLoadingComments(false);
      });
  }, []);

  // fetch todos from API and save them to states
  useEffect(() => {
    fetch("https://gorest.co.in/public/v1/todos")
      .then((response) => {
        // error handling
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setFetchTodos(data);
        setErrorTodos(null);
      })
      .catch((error) => {
        setErrorTodos(error.message);
        setFetchTodos(null);
      })
      .finally(() => {
        setLoadingTodos(false);
      });
  }, []);
  return (
    <BrowserRouter>
      <div className="App">
        {/* navigation bar */}
        <Navbar />
        {/* user modal window */}
        <AddUser />
        {/* post modal window */}
        <AddPost />
        {/* declaration of subpage paths */}
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/home" element={<WelcomePage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/todos" element={<TodosPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
