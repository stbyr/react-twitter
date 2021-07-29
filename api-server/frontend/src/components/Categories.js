import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../styles/Categories.css'
import { getAllCategories } from '../actions/shared.js'
import { setCategory } from '../actions/categories.js'
import { Tabs, Tab, AppBar, ThemeProvider } from '@material-ui/core'
import theme from '../theme.js'
import { token } from './App'

function Categories (props) {
	const [ value, setValue ] = React.useState(0)
	const dispatch = useDispatch()

	useEffect(() => {
		let mounted = true 
        if (mounted) {
            dispatch(getAllCategories(token))
        }
        return () => mounted = false;
	}, [dispatch])

	const categories = useSelector((state) => state.categories.categories)
	const activeCategory = useSelector((state) => state.activeCategory)
	
	const obj = categories ? categories.find((obj) => obj.name === activeCategory) : null
	const objIndex = obj ? categories.indexOf(obj) : null

	const handleChange = (e, val) => {
		setValue(val)
		dispatch(setCategory(e.currentTarget.id))
	}

	return (
		<div className="appbar">
			<ThemeProvider theme={theme}>
				<AppBar position="static">
				  	<Tabs className="tabs" value={ objIndex ? objIndex : value } onChange={handleChange} indicatorColor="secondary" textColor="primary">
				  		{categories && categories.map((category, index) => (
				  			<Tab className="tab" label={category.name} key={category.name} id={category.name} value={index} />
				  		))}
				  	</Tabs>
				</AppBar>
			</ThemeProvider>
		</div>
	)
}

export default Categories;