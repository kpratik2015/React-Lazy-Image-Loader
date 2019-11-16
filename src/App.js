import React from 'react';
import './App.css';
import { hot } from 'react-hot-loader/root';
import ImageLoader from './ImageLoader';

const App = () => {
  return (
    <div className="App">
      <ImageLoader
        sdImgSrc="http://hdwpro.com/wp-content/uploads/2016/12/Awesome-HD-Pic-380x250.jpg"
        hdImgSrc="http://hdwpro.com/wp-content/uploads/2016/12/Awesome-HD-Pic.jpg"
      />
      <ImageLoader
        sdImgSrc="https://cdn.wonderfulengineering.com/wp-content/uploads/2014/10/wallpaper-photos-3-150x84.jpg"
        hdImgSrc="https://wonderfulengineering.com/wp-content/uploads/2014/10/wallpaper-photos-3.jpg"
      />
      <ImageLoader
        sdImgSrc="https://cdn.wonderfulengineering.com/wp-content/uploads/2014/10/wallpaper-photos-5-150x84.jpg"
        hdImgSrc="https://cdn.wonderfulengineering.com/wp-content/uploads/2014/10/wallpaper-photos-5.jpg"
      />
    </div>
  );
};

export default hot(App);
