import React from 'react';
import styled from 'styled-components';
import ContentLoader from 'react-content-loader';
import PropTypes from 'prop-types';
import Img from 'react-image';
import VizSensor from './VizSensor';

const Container = styled.div`
  position: relative;
  display: flex;
  height: 500px;
  width: 600px;
  justify-content: center;
  align-items: center;
  margin: auto;
  background-color: #ecebeb;
  img {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: auto;
    max-width: 100%;
    margin: auto;
  }
  .fade-in {
    opacity: 1;
    transform: scale(1);
  }
`;

const SDImageContainer = styled.div`
  overflow: hidden;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  margin: auto;
`;

const SDImage = styled(Img)`
  z-index: 2;
  filter: blur(20px);
  min-width: 100%;
  transform: scale(1.1);
`;

const HDImage = styled(Img)`
  z-index: 3;
  opacity: 0;
  transform: scale(1.1);
  transition: transform 1s, opacity 1s ease-in;
`;

const ImageLoader = props => {
  const { sdImgSrc, hdImgSrc } = props;
  const containerRef = React.useRef(null);
  const [imageDimensions, setImageDimensions] = React.useState(null);
  const [isSdImgLoaded, setIsSdImgLoaded] = React.useState(false);
  const [isHdImgLoaded, setIsHdImgLoaded] = React.useState(false);
  const [visibility, setVisibility] = React.useState(false);
  const sdImgCond = visibility && !isHdImgLoaded;
  const hdImgCond = visibility;
  React.useEffect(() => {
    if (visibility) {
      console.log('Visible: ', sdImgSrc);
      const sdImg = new Image();
      const hdImg = new Image();
      sdImg.src = sdImgSrc;
      hdImg.src = hdImgSrc;
      const hdPoll = setInterval(() => {
        if (hdImg.naturalWidth) {
          clearInterval(hdPoll);
          setImageDimensions({ height: hdImg.naturalHeight, width: hdImg.naturalWidth });
        }
      }, 10);
      sdImg.onload = () => {
        setIsSdImgLoaded(true);
      };
      sdImg.onerror = () => {
        setIsSdImgLoaded(true);
      };
      hdImg.onload = () => {
        setIsHdImgLoaded(true);
      };
    }
  }, [visibility, sdImgSrc, hdImgSrc]);
  return (
    <Container ref={containerRef}>
      <>
        {!isSdImgLoaded && (
          <VizSensor visibility={visibility} setVisibility={setVisibility} offset={{ bottom: 200 }}>
            <ContentLoader
              height={containerRef.current ? containerRef.current.offsetHeight : 150}
              width={containerRef.current ? containerRef.current.offsetWidth : 150}
              speed={1}
              primaryColor="#f3f3f3"
              secondaryColor="#ecebeb"
              style={{
                position: 'absolute',
                zIndex: 1,
                top: 0,
                left: 0,
                right: 0
              }}
            />
          </VizSensor>
        )}

        {sdImgCond && (
          <SDImageContainer
            style={
              imageDimensions
                ? { height: `${(imageDimensions.height / imageDimensions.width) * 600}px` }
                : {}
            }
          >
            <SDImage src={sdImgSrc} />
          </SDImageContainer>
        )}

        {hdImgCond && <HDImage src={hdImgSrc} className={isHdImgLoaded ? 'fade-in' : ''} />}
      </>
    </Container>
  );
};

ImageLoader.propTypes = {
  sdImgSrc: PropTypes.string.isRequired,
  hdImgSrc: PropTypes.string.isRequired
};

export default ImageLoader;
