import hunterLogo from 'assets/hunterLogo.svg'
import type { ReactNode } from 'react'

interface MenuButtonProperties {
	children: ReactNode
}

function MenuButton(properties: MenuButtonProperties): JSX.Element {
	const { children } = properties

	return (
		<div className='duration-y flex h-[90px] w-[490px] transform items-center justify-between gap-10 bg-menu-border bg-contain bg-no-repeat p-8 transition hover:scale-125'>
			<img src={hunterLogo} alt='hunterLogo' className='h-16 w-14 opacity-75' />
			<div
				className='text-outline text-3xl'
				style={{
					// unfortunately have to do this bc tailwind doesn't support text-shadow yet
					textShadow:
						'-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
				}}
			>
				{children}
			</div>
			<img src={hunterLogo} alt='hunterLogo' className='h-16 w-14 opacity-75' />
		</div>
	)
}

export default MenuButton
