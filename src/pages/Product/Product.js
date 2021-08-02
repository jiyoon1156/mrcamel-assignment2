import React, { Component } from 'react';
import styled from 'styled-components';
import qs from 'qs';

import Storage from 'utils/Storage';
import Spinner from 'components/Spinner';
import Constants from 'constants/Constants';
class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      dummyDescription: '',
      isLoading: false,
      imageUrlQueryNumber: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
    };

    this.handleClickNoInterest = this.handleClickNoInterest.bind(this);
    this.directToRandomProduct = this.directToRandomProduct.bind(this);
    this.saveTimeOfStorage = this.saveTimeOfStorage.bind(this);
    this.saveForRecentList = this.saveForRecentList.bind(this);
  }

  async componentDidMount() {
    const { index } = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });

    // product 데이터 받아와서 저장
    const responseData = await fetch(Constants.DATA_API);
    const jsonData = await responseData.json();
    this.setState({ products: jsonData });

    // 상품 설명용 placeholder 데이터 받아와서 저장
    const responsePlaceholderPost = await fetch(`${Constants.PLACEHOLDER_POST_API}${Number(index) + 1}`);
    const jsonPlaceholderPost = await responsePlaceholderPost.json();
    this.setState({ dummyDescription: jsonPlaceholderPost?.body ? jsonPlaceholderPost.body : '' });

    this.saveForRecentList(index);
    this.saveTimeOfStorage();
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
      const responsePlaceholderPost = await fetch(`${Constants.PLACEHOLDER_POST_API}${Number(index) + 1}`);
      const jsonPlaceholderPost = await responsePlaceholderPost.json();

      this.setState({ dummyDescription: jsonPlaceholderPost?.body ? jsonPlaceholderPost.body : '' });

      // 상품 상세페이지 내에서 랜덤으로 상품 로드 시에도 로컬스토리지에 데이터 저장
      this.saveForRecentList(index);
      this.saveTimeOfStorage();
    }
  }

  saveTimeOfStorage() {
    const today = new Date();
    const savingTimeData = {
      year: today.getFullYear(),
      month: today.getMonth(),
      day: today.getDate(),
    };

    Storage.set(Constants.LAST_SAVE_DATE_STORAGE_KEY, savingTimeData);
  }

  saveForRecentList(index) {
    const recentList = Storage.get(Constants.RECENT_LIST_STORAGE_KEY)
      ? Storage.get(Constants.RECENT_LIST_STORAGE_KEY)
      : [];

    // 이미 본 상품 또 클릭했을 경우
    if (recentList.indexOf(Number(index)) > -1) {
      const alreadyExistingIndex = recentList.indexOf(Number(index));
      const clickedProduct = recentList[alreadyExistingIndex];
      recentList.splice(alreadyExistingIndex, 1);

      recentList.unshift(clickedProduct);
    } else recentList.unshift(Number(index));

    Storage.set(Constants.RECENT_LIST_STORAGE_KEY, recentList);
  }

  // 관심 없음 클릭용
  handleClickNoInterest(index) {
    const { history } = this.props;
    const noInterestList = Storage.get(Constants.NO_INTEREST_STORAGE_KEY)
      ? Storage.get(Constants.NO_INTEREST_STORAGE_KEY)
      : [];

    /**
     * 관심 없음 리스트에 추가되어 있지 않은 경우에만 추가하도록 처리
     * 물론 메인 페이지에서 관심 없음 리스트에 있으면 애초에 라우팅 되지 않도록 처리하여
     * 사실상 꼭 필요한 로직은 아니지만 안정성을 위해 추가함
     */
    if (noInterestList.indexOf(Number(index) === -1)) {
      noInterestList.unshift(Number(index));
    }

    Storage.set(Constants.NO_INTEREST_STORAGE_KEY, noInterestList);
    this.saveTimeOfStorage();
    this.directToRandomProduct(index);
  }

  // 랜덤 상품 조회용
  directToRandomProduct(index) {
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 1000);

    const { history } = this.props;
    const noInterestList = Storage.get(Constants.NO_INTEREST_STORAGE_KEY)
      ? Storage.get(Constants.NO_INTEREST_STORAGE_KEY)
      : [];

    // 다시 현재 상품으로 라우팅되지 않게 하기 위해 현 상품 index도 추가
    noInterestList.unshift(Number(index));

    // 관심 없는 상품 제외하고 랜덤 라우팅
    const productsExceptNoInterest = [...Array(100).keys()].filter((elem) => noInterestList.indexOf(elem) === -1);
    const randomIndex = Math.floor(Math.random() * productsExceptNoInterest.length);

    // 다른 상품 페이지로 라우팅되면 이미지를 바꾸어주기 위함
    if (productsExceptNoInterest.length > 0) {
      this.setState({ imageUrlQueryNumber: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) });

      history.replace(`/product?index=${productsExceptNoInterest[randomIndex]}`);
    } else {
      alert('더 이상 볼 수 있는 상품이 없습니다!!!');
      history.replace('/');
    }
  }

  render() {
    const { index } = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });

    const { products, dummyDescription, imageUrlQueryNumber, isLoading } = this.state;

    return isLoading ? (
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
    ) : (
      <ProductPageWrapper>
        <DetailsWrapper>
          <BigImg>
            <img src={`https://picsum.photos/360/480?dummy=${imageUrlQueryNumber}`} alt="product_random_image" />
          </BigImg>

          <DetailsContents>
            <ContentTop>
              <div>
                <h2>{products[Number(index)]?.title ? `${products[Number(index)]?.title}` : ''}</h2>
                <span>{products[Number(index)]?.price ? `${products[Number(index)]?.price}원` : ''}</span>
              </div>
              <p>{dummyDescription}</p>
            </ContentTop>

            <ContentBottom>
              <Button onClick={() => this.handleClickNoInterest(index)}>관심 없음</Button>
              <Button onClick={() => this.directToRandomProduct(index)}>랜덤 상품 조회</Button>
            </ContentBottom>
          </DetailsContents>
        </DetailsWrapper>
      </ProductPageWrapper>
    );
  }
}

const SpinnerWrapper = styled.div`
  width: 1024px;
  min-height: 312px;
  margin: 100px auto;
  box-shadow: 0 0 5px #ccc;

  @media (max-width: 768px) {
    width: 90%;
  }
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProductPageWrapper = styled.div`
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
