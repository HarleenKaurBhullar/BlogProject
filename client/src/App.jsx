import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import MakeBlog from './components/WriteBlog';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import BlogComponent from './components/DisplayComponent';
import Blogbox from './components/Blogbox';
import Menu from './components/Menu';
import MyBlogs from './components/MyBlogs';
import EditBlog from './pages/Editblog';
function App() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Homepage/>}></Route>
                <Route path='/login' element={<Login/>}></Route>
                <Route path='/register' element={<Register/>}></Route>
                <Route path='/DisplayBlog' element={<BlogComponent/>}></Route>
                <Route path='/MakeBlog' element={<MakeBlog/>}></Route>
                <Route path='/blog/:id' element={<Blogbox/>}></Route>
                <Route path='/menu' element={<Menu/>}></Route>
                <Route path='/MyBlogs' element={<MyBlogs/>}></Route>
                <Route path='/EditBlog' element={<EditBlog/>}></Route>
            </Routes>
        </BrowserRouter>
  
    );
}

export default App
