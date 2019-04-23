import { observable } from 'mobx';
import services from './../services';
// import { observable, action } from 'mobx';

class Store {
  @observable prodList = [
    'TVSF2WYXTKAR7RAF',
    'TVSF2WYUE4PWNJKM',
    'TVSE8FMZ9AQMEGC6',
    'TVSF3J7HUJF5XUBT',
  ];
  @observable compProduct = [];
  @observable featuresList = [];
  products = observable.map({});
  preLoadProducts() {
    console.log('Loading Data');
    services.get('https://flipkart-mock-product.now.sh/').then(data => {
      const{ compareSummary, featuresList } = data.products
      this.compareSummary = compareSummary;
      this.featuresList = featuresList;
      for (let key in compareSummary.images) {
        if(this.compProduct.length < 2) {
          this.compProduct.push(key);
        }
      }
    })
  }

  remoteProdCmp(prodId) {
    this.compProduct = this.compProduct.filter(e => e !== prodId);
  }
}

const store = new Store();
export default store;
