import React from 'react';
import product from '../../../public/api/products.json';
import type { Product } from '../../Types/type'
import './new-models.scss'

export const NewModels = () => {

	return (
		<div className='newmodels'>
			<div className='newmodels__topbar'></div>
			<h2 className='newmodels__topbar__title'>Brand new models</h2>
			<div className="newmodels__topbar__buttons">
				<div className="newmodels__topbar__buttons__left">
					<a href="" className="newmodels__topbar__buttons__left--arrow"></a>
				</div>
				<div className="newmodels__topbar__buttons__right">
					<a href="" className="newmodels__topbar__buttons__right--arrow"></a>
				</div>
			</div>

			<div className='newmodels__products'>

				{product.map((product: Product) => {
					return (
						<article className='newmodels__product' key={product.id}>
							<img
								className='newmodels__product__image'
								src= {`${product.image}`}
								alt={`${product.itemId}`}
							/>
							<p className='newmodels__product__name'>
								{product.name}
							</p>
							<h4 className='newmodels__product__price'>
								{`$${product.price}`}
							</h4>
							<div className='newmodels__product__description'>
								<p className='newmodels__product__description__screen'>
									Screen
								</p>
								<p className='newmodels__product__description__screen--number'>
									{product.screen}
								</p>
							</div>
							<div className='newmodels__product__description'>
								<p className='newmodels__product__description__capacity'>
									Capacity
								</p>
								<p className='newmodels__product__description__capacity--number'>
									{product.capacity}
								</p>
							</div>
							<div className='newmodels__product__description'>
								<p className='newmodels__product__description__ram'>
									RAM
								</p>
								<p className='newmodels__product__description__ram--number'>
									{product.ram}
								</p>
							</div>

							<div className='newmodels__product__buttons'>
								<button className='newmodels__product__buttons__button__add'>
									Add to cart
								</button>
								<button className='newmodels__product__buttons__button__favourites'>
									<a href="#" className='newmodels__product__buttons__button__favourites--heart'></a>
								</button>
							</div>
						</article>
					);
				})};

			</div>
		</div>
	);
}

