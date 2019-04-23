import React from 'react';
import { inject, observer } from 'mobx-react';
import { ProductList } from './../components';

@inject('store')
@observer
class DefaultLayout extends React.Component {
  componentWillMount() {
    let { store } = this.props;
    store.preLoadProducts();
  }
  render () {
    return (
      <div className="product-cmp">
        <h1>Product Compare</h1>
        <ProductList />
      </div>
    )
  }
}

export default DefaultLayout;