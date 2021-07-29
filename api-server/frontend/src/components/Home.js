import React from 'react'
import Categories from './Categories.js'
import PostsMainSection from './PostsMainSection.js'
import '../styles/Home.css'

function Home () {
	return (
		<div className="home">
			<Categories />
			<PostsMainSection />
		</div>
	)
}

export default Home