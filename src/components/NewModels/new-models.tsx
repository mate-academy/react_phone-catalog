import './new-models.scss'

export const NewModels = () => {

	return (
		<div className='newmodels'>
			<h2 className='newmodels__title'>Brand new models</h2>
			<div className='newmodels__button newmodels__button--position '>
				<div className='newmodels__button--left'></div>
			</div>
			<div className='newmodels__button'>
				<div className='newmodels__button--right'></div>
			</div>
		
				<div className='newmodels__products'>
				<article className='newmodels__product'>
					<img src="" alt="" />
					<p>Apple iPhone 14 Pro 128GB Silver (MQ023)</p>
					<h4>$999</h4>
					<div>
						<p>Screen</p>
						<p>6.1" OLED</p>
					</div>
					<div>
						<p>Capacity</p>
						<p>128 GB</p>
					</div>
					<div>
						<p>RAM</p>
						<p>6 GB</p>
					</div>
					<button>Add to cart</button>
					<button></button>
				</article>
				
			</div>
		</div>
	);
}