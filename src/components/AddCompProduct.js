import React from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

// Prosucts
@inject('store')
@observer
class AddCompProduct extends React.Component {
  addProdComp(prodId, e) {
    this.props.store.compProduct.push(prodId);
    e.preventDefault();
  }
	render() {
    const { featuresList, prodList, compProduct } = this.props.store;
    if(compProduct.length === 4) {
      return null;
    }
    const list = compProduct.map(e => e);
    return(
      <div className="col">
        <div style={{height:'370px'}}>Add a Product</div>
        <select onChange={e=> this.addProdComp(e.target.value, e)}>
          <option>Select</option>
          {prodList.filter(e => list.indexOf(e) === -1).map(e =><option key={e}>{e}</option>)}
        </select>
        {featuresList.map((e, i) => {
          return(
            <div key={i}>
              <h3 className='pb-3 pt-2'>&nbsp;</h3>
              {e.features.map((e1, i1) => {
                return(
                  <p key={i1} className="bb-1">
                    &nbsp;
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


export default withRouter(AddCompProduct);