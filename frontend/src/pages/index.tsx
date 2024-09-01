import MenuButton from 'components/ui/MenuButton'

function Index(): JSX.Element {
	return (
		<div className='bg-quest-counter relative flex h-svh w-svw flex-1 flex-row items-center justify-center bg-cover'>
			<div className='absolute bottom-0 left-0 right-0 top-0 z-10 bg-black bg-opacity-25' />
			<div className='z-20 flex h-1/2 flex-col justify-evenly'>
				<a href='/classic'>
					<MenuButton>Classic</MenuButton>
				</a>
				<a href='/silhouette'>
					<MenuButton>Silhouette</MenuButton>
				</a>
				<a href='/description'>
					<MenuButton>Description</MenuButton>
				</a>
			</div>
		</div>
	)
}

export default Index
