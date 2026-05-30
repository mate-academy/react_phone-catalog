import style from './Title.module.scss'

export const Title = () => {
	return (

		<h1 className={`${style.title} ${style['title--margin']}`}>
			Welcome to Nice
			<br />
			{' '}Gadgets store!
		</h1>
	);
}
