import React from 'react';
import { Card } from 'react-bootstrap';
import { Player } from '@lottiefiles/react-lottie-player';
import ErrorImage from '../assets/animations/error.json';
import BannerImage from '../assets/animations/banner-animation.json';
import LoadingImage from '../assets/animations/loading.json';
import ImportErrorImage from '../assets/animations/imported-files-error.json';
import SelectOption from '../assets/animations/selection-list-clients.json';
import Tower from '../assets/animations/animation_lmirkhac.json';
import EmptyDataImage from '../assets/animations/animation_NoData.json';

const Animation = ({
  type,
  titleName,
  text,
  subtext,
  modal = true,
  retry = false,
  isCard = true,
  isCenter = false,
  noText = false,
}) => {
  let textData = '';
  let subTextData = '';
  let lottie = '';

  //const titleName = 'Please Select Your Module';

  switch (type) {
    case 'error':
      textData =
        text !== null && text !== undefined && text !== ''
          ? text
          : 'Something Went Wrong';
      subTextData =
        subtext !== null && subtext !== undefined && subtext !== ''
          ? subtext
          : 'Please try again ';

      lottie = ErrorImage;

      break;

    case 'loading':
      textData = text !== null && text !== undefined && text !== '' ? text : '';
      subTextData =
        subtext !== null && subtext !== undefined && subtext !== ''
          ? subtext
          : 'Please wait...';

      lottie = LoadingImage;
      break;
    case 'import-error':
      textData =
        text !== null && text !== undefined && text !== ''
          ? text
          : 'This Cannot be editable';
      subTextData =
        subtext !== null && subtext !== undefined && subtext !== ''
          ? subtext
          : 'Imported Transfers Cannot be edited';

      lottie = ImportErrorImage;
      break;
    case 'banner':
      lottie = BannerImage;
      break;

    case 'idle':
      textData = text !== null && text !== undefined && text !== '' ? text : '';
      subTextData =
        subtext !== null && subtext !== undefined && subtext !== ''
          ? subtext
          : titleName;

      lottie = SelectOption;
      break;
    case 'EmptyData':
      textData = text !== null && text !== undefined && text !== '' ? text : '';
      subTextData =
        subtext !== null && subtext !== undefined && subtext !== ''
          ? subtext
          : '';

      lottie = EmptyDataImage;
      break;

    case 'Tower':
      textData = text !== null && text !== undefined && text !== '' ? text : '';
      subTextData =
        subtext !== null && subtext !== undefined && subtext !== ''
          ? subtext
          : titleName;

      lottie = Tower;
    default:
      break;
  }

  const style = {
    height: '300px',
  };
  const centerStyle = {
    height: '300px',
    marginTop: '50px',
  };
  let cardHeightStyle = isCenter ? centerStyle : style;

  return (
    <>
      {isCard ? (
        <Card.Body>
          <div className='row'>
            <div
              className={`col-sm-8 offset-md-2 text-center ${
                noText && 'd-flex align-items-center justify-content-center '
              }`}>
              <Player
                autoplay
                loop
                src={lottie}
                style={cardHeightStyle}></Player>
              {!noText && (
                <>
                  <h3>{textData}</h3>
                  <p>{subTextData}</p>
                </>
              )}

              {retry && (
                <button className='btn btn-dark btn-xs' onClick={() => retry()}>
                  Retry
                </button>
              )}
            </div>
          </div>
        </Card.Body>
      ) : (
        <Player autoplay loop src={lottie}></Player>
      )}
    </>
  );
};

export default Animation;
