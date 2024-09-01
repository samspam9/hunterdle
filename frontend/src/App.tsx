import Index from 'pages'
import ClassicPage from 'pages/classic'
import DescriptionPage from 'pages/description'
import SilhouettePage from 'pages/silhouette'
import type { ReactElement } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export default function App(): ReactElement {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Index />} />
				<Route path='/classic' element={<ClassicPage />} />
				<Route path='/silhouette' element={<SilhouettePage />} />
				<Route path='/description' element={<DescriptionPage />} />
			</Routes>
		</BrowserRouter>
	)
}
