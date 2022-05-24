import React from "react";

import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LineShareButton,
  LineIcon,
} from "react-share";

const ShareModal = ({ url, theme }) => {
  return (
    <div className="d-flex justify-content-between px-4 py-2"
    style={{filter : theme ? 'invert(1)' : 'invert(0)'}}>
      <FacebookShareButton url={url}>
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>

      <TwitterShareButton url={url}>
        <TwitterIcon size={32} round={true} />
      </TwitterShareButton>

      <EmailShareButton url={url}>
        <EmailIcon size={32} round={true} />
      </EmailShareButton>

      <TelegramShareButton url={url}>
        <TelegramIcon size={32} round={true} />
      </TelegramShareButton>

      <WhatsappShareButton url={url}>
        <WhatsappIcon size={32} round={true} />
      </WhatsappShareButton>

      <LineShareButton url={url}>
        <LineIcon size={32} round={true} />
      </LineShareButton>
    </div>
  );
};

export default ShareModal;
