import React from 'react';
import styled from 'styled-components';
import qs from 'qs';

const DATA_JSON_API = 'data/data.json';
const PLACEHOLDER_POST_API = 'https://jsonplaceholder.typicode.com/posts/';

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: [], dummyDescription: '' };
  }

  async componentDidMount() {
    const { index } = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });

    const responseData = await fetch(DATA_JSON_API);
    const jsonData = await responseData.json();
    this.setState({ products: jsonData });

    const responsePlaceholderPost = await fetch(`${PLACEHOLDER_POST_API}${Number(index) + 1}`);
    const jsonPlaceholderPost = await responsePlaceholderPost.json();
    this.setState({ dummyDescription: jsonPlaceholderPost?.body });
  }

  render() {
    const { index } = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });

    const { products, dummyDescription } = this.state;

    // console.log(this.props.location);
    return (
      <ProductPageWrapper>
        <DetailsWrapper>
          <BigImg>
            <img src="https://picsum.photos/360/480" alt="placeholder_image" />
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
              <Button>관심 없음</Button>
              <Button>랜덤 상품 조회</Button>
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
