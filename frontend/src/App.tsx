import type { ReactElement } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export default function App(): ReactElement {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={undefined} />
			</Routes>
		</BrowserRouter>
	)
}
