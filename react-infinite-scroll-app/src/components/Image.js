import styled from '@emotion/styled';

const StyledImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled.img`
  display: block;
  max-width: 100%;
  width: 100%;
`;

const Image = ({ src, alt }) => {
  return (
    <StyledImageContainer>
      <StyledImage src={src} alt={alt} />
    </StyledImageContainer>
  );
};

export { Image };
