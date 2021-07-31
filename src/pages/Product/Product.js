import React from 'react';
import styled from 'styled-components';
import qs from 'qs';

import Storage from 'utils/Storage';

const DATA_JSON_API = 'data/data.json';
const PLACEHOLDER_POST_API = 'https://jsonplaceholder.typicode.com/posts/';
const NO_INTEREST_STORAGE_KEY = 'noInterest';
const RECENT_LIST_STORAGE_KEY = 'recentList';

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      dummyDescription: '',
      imageUrlQueryNumber: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
    };

    this.handleClickNoInterest = this.handleClickNoInterest.bind(this);
    this.directToRandomProduct = this.directToRandomProduct.bind(this);
  }

  async componentDidMount() {
    // console.log('componentDidMount');
    const { index } = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });

    // product 데이터 받아와서 저장
    const responseData = await fetch(DATA_JSON_API);
    const jsonData = await responseData.json();
    this.setState({ products: jsonData });

    // 상품 설명용 placeholder 데이터 받아와서 저장
    const responsePlaceholderPost = await fetch(`${PLACEHOLDER_POST_API}${Number(index) + 1}`);
    const jsonPlaceholderPost = await responsePlaceholderPost.json();
    this.setState({ dummyDescription: jsonPlaceholderPost?.body });

    const recentList = Storage.get(RECENT_LIST_STORAGE_KEY) ? Storage.get(RECENT_LIST_STORAGE_KEY) : [];

    // 이미 본 상품 또 클릭했을 경우
    if (recentList.indexOf(Number(index)) > -1) {
      const alreadyExistingIndex = recentList.indexOf(Number(index));
      const clickedProduct = recentList[alreadyExistingIndex];
      recentList.splice(alreadyExistingIndex, 1);

      recentList.unshift(clickedProduct);
    } else recentList.unshift(Number(index));

    Storage.set(RECENT_LIST_STORAGE_KEY, recentList);
  }

  async componentDidUpdate(prevProps) {
    // console.log('componentDidUpdate');
    const { index: prevIndex } = qs.parse(prevProps.location.search, {
      ignoreQueryPrefix: true,
    });
    const { index } = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });

    if (prevIndex !== index) {
      // 상품 설명용 placeholder 데이터 업데이트
      const responsePlaceholderPost = await fetch(`${PLACEHOLDER_POST_API}${Number(index) + 1}`);
      const jsonPlaceholderPost = await responsePlaceholderPost.json();

      this.setState({ dummyDescription: jsonPlaceholderPost?.body });
    }
    // console.log(`prev index : ${index}`);
  }

  // 관심 없음 클릭용
  handleClickNoInterest(index) {
    const { history } = this.props;
    const noInterestList = Storage.get(NO_INTEREST_STORAGE_KEY) ? Storage.get(NO_INTEREST_STORAGE_KEY) : [];

    /**
     * 관심 없음 리스트에 추가되어 있지 않은 경우에만 추가하도록 처리
     * 물론 메인 페이지에서 관심 없음 리스트에 있으면 애초에 라우팅 되지 않도록 처리하여
     * 사실상 꼭 필요한 로직은 아니지만 안정성을 위해 추가함
     */
    if (noInterestList.indexOf(Number(index) === -1)) {
      noInterestList.unshift(Number(index));
    }

    Storage.set(NO_INTEREST_STORAGE_KEY, noInterestList);

    this.directToRandomProduct(index);
  }

  // 랜덤 상품 조회용
  directToRandomProduct(index) {
    const { history } = this.props;
    const noInterestList = Storage.get(NO_INTEREST_STORAGE_KEY) ? Storage.get(NO_INTEREST_STORAGE_KEY) : [];

    // 다시 현재 상품으로 라우팅되지 않게 하기 위해 현 상품 index도 추가
    noInterestList.unshift(Number(index));

    // 관심 없는 상품 제외하고 랜덤 라우팅
    const productsExceptNoInterest = [...Array(100).keys()].filter((elem) => noInterestList.indexOf(elem) === -1);
    const randomIndex = productsExceptNoInterest[Math.floor(Math.random() * productsExceptNoInterest.length)];

    // 다른 상품 페이지로 라우팅되면 이미지를 바꾸어주기 위함
    this.setState({ imageUrlQueryNumber: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) });

    history.replace(`/product?index=${productsExceptNoInterest[randomIndex]}`);
  }

  render() {
    const { index } = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });

    const { products, dummyDescription, imageUrlQueryNumber } = this.state;

    // console.log(this.props.location);
    return (
      <ProductPageWrapper>
        <DetailsWrapper>
          <BigImg>
            <img src={`https://picsum.photos/360/480?dummy=${imageUrlQueryNumber}`} alt="product_random_image" />
          </BigImg>

          <DetailsContents>
            <ContentTop>
              <div>
                <h2>{products[Number(index)]?.title}</h2>
                <span>{`${products[Number(index)]?.price}원`}</span>
              </div>
              <p>{dummyDescription}</p>
            </ContentTop>

            <ContentBottom>
              <Button onClick={() => this.handleClickNoInterest(index)}>관심 없음</Button>
              <Button onClick={() => this.directToRandomProduct()}>랜덤 상품 조회</Button>
            </ContentBottom>
          </DetailsContents>
        </DetailsWrapper>
      </ProductPageWrapper>
    );
  }
}

const ProductPageWrapper = styled.div`
  /* max-width: 1200px; */
  width: 1024px;
  margin: 100px auto;
  box-shadow: 0 0 5px #ccc;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const DetailsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 30px 0;
`;

const BigImg = styled.div`
  max-width: 500px;
  min-width: 290px;
  overflow: hidden;
  margin: 25px;

  @media (max-width: 768px) {
    margin: 0;
  }

  & > img {
    width: 100%;
    height: 100%;
    max-height: 400px;
    display: block;
    object-fit: cover;
  }
`;

const DetailsContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 500px;
  min-width: 290px;
  margin: 1.5rem;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ContentTop = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-between; */
  margin-bottom: 15px;

  & > div {
    width: 100%;
    margin-bottom: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
      font-size: 2rem;
    }

    span {
      font-size: 1.5rem;
      margin-left: 2rem;
    }
  }

  & > p {
    font-size: 1.25rem;
  }
`;

const ContentBottom = styled.div`
  display: flex;
  justify-content: space-between;
  /* margin-bottom: 15px; */
`;

const Button = styled.button`
  background: #333;
  color: white;
  outline: none;
  border: none;
  cursor: pointer;
  padding: 10px 25px;
  margin-top: 15px;
`;

export default Product;
