import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="max-w-2xl mx-auto">

	<footer className="p-4 md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
		<span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <Link to = '/' className="hover:underline" target="_blank">Splinter™</Link>. All Rights Reserved.
    </span>
		<ul className="flex flex-wrap items-center mt-3 sm:mt-0">
			<li>
				<Link to = '/' className="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400">About</Link>
			</li>
			<li>
				<Link to = '/' className="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400">Privacy
					Policy</Link>
			</li>
			<li>
				<Link to ='/' className="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400">Help</Link>
			</li>
			<li>
				<Link to = '/' className="text-sm text-gray-500 hover:underline dark:text-gray-400">Blog</Link>
			</li>
		</ul>
	</footer>

</div>
  )
}

export default Footer