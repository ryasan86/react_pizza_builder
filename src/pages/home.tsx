import React from 'react'

import '../styles/home.scss'
import AnimatedPizza from '../components/animated-pizza'
import AnimatedTitle from '../components/animated-title'
import {Link} from 'react-router-dom'
import {join} from '../utils'

const btnClasses = join([
	'bg-transparent',
	'border-4 ',
	'border-solid ',
	'border-white ',
	'duration-200',
	'home-btn',
	'hover:bg-white ',
	'hover:text-red-500',
	'opacity-0',
	'px-4 ',
	'py-2 ',
	'rounded-lg ',
	'text-2xl ',
	'text-white',
	'transition',
])

const HomePage: React.FC = (props) => (
	<div className='home-page justify-evenly flex flex-col items-center w-screen h-screen'>
		<AnimatedTitle />
		<AnimatedPizza />
		<Link to='builder' className={btnClasses}>
			Build Pizza
		</Link>
	</div>
)

export default HomePage
