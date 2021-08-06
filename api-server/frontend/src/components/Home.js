import React from 'react'
import Categories from './Categories'
import PostsMainSection from './PostsMainSection'
import Redirecter from './Redirect'
import '../styles/Home.css'

function Home () {
	return (
		<div className="home">
			<Redirecter referrer="/" />
			<Categories />
			<PostsMainSection />
		</div>
	)
}

export default Home