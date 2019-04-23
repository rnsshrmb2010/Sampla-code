import React from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { AddCompProduct } from './../components'

@inject('store')
@observer
class ProductList extends React.Component {
  render() {
  	const { compProduct } = this.props.store;
    return (
      <div className="row">
      	<FeatureProduct />
        {compProduct.map(e => <Product prodId={e}  key={e} />)}
        <AddCompProduct />}
      </div>
    );
  }
}

// Prosucts
@inject('store')
@observer
class Product extends React.Component {
	remoteProdCmp(prodId, e) {
		this.props.store.remoteProdCmp(prodId);
	}

	render() {
		const { compareSummary, featuresList } = this.props.store;
		const { prodId } = this.props;
		return(
			<div className="col">
				<div style={{height:'395px'}}>
					<p><img src={compareSummary.images[prodId]} alt={compareSummary.titles[prodId].title} width="250px" height="250px"/></p>
					<p><button onClick={e => this.remoteProdCmp(prodId, e)}>Remove Product</button></p>
					{<p>{compareSummary.titles[prodId].title ? compareSummary.titles[prodId].title : null}</p>}
					Rs. {compareSummary.productPricingSummary[prodId].finalPrice} <span style={{textDecoration: 'line-through'}}>Rs. {compareSummary.productPricingSummary[prodId].price} </span>{compareSummary.productPricingSummary[prodId].totalDiscount} off
				</div>
				{featuresList.map((e, i) => {
					return(
						<div key={i}>
							<h3 className='pb-3 pt-2'>&nbsp;</h3>
							{e.features.map((e1, i1) => {
								return(
									<p key={i1} className="bb-1">
										{e1.values[prodId]}
									</p>
								)
							})}
						</div>
					)
				})}
      </div>
		)
	}
}

// Prosucts
@inject('store')
@observer
class FeatureProduct extends React.Component {
  render() {
    const { featuresList } = this.props.store;
    return(
      <div className="col">
        <div style={{height:'395px'}}>Show Differences</div>
        {featuresList.map((e, i) => {
          return(
            <div key={i}>
              <h3 className='pb-3 pt-2'>{e.title}</h3>
              {e.features.map((e1, i1) => {
                return(
                  <p key={i1} className="bb-1">
                    {e1.featureName}
                  </p>
                )
              })}
            </div>
          )
        })}
      </div>
    )
  }
}


export default withRouter(ProductList);