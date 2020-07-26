import React from 'react';
import CN from 'classnames';
import './Debugger.scss';
// import axios from 'axios';
// import html2canvas from 'html2canvas';
interface Props {
  handleMarker: any;
  statusOfMarker: boolean;
}

export const Debugger = ({ handleMarker, statusOfMarker }: Props) => {
  // const [markerX, setMarkerX] = useState(0);
  // const [markerY, setMarkerY] = useState(0);
  // const [commentX, setCommentX] = useState(markerX);
  // const [commentY, setCommentY] = useState(markerY);
  // const [statusOfMarker, setStatusOfMarker] = useState(false);
  // const [statusOfComment, setStatusOfComment] = useState(false);
  // const [activeButton, setActiveButton] = useState(false);
  // const [commentText, setCommentText] = useState('');
  //
  // const handleMarker = () => {
  //   setStatusOfMarker(!statusOfMarker);
  //   setStatusOfComment(false);
  // };
  //
  // const handleFollowMarker = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  //   if (!statusOfMarker) {
  //     return;
  //   }
  //
  //   setMarkerX(event.pageX - 5);
  //   setMarkerY(event.pageY - 5);
  // };
  //
  // const enterComment = (value: string) => {
  //   if (value.trim()) {
  //     setActiveButton(true);
  //   }
  //
  //   setCommentText(value);
  // };
  //
  // const sendToServer = (title: string, screen: string) => {
  //   axios({
  //     method: 'post',
  //     url: 'https://app.fakejson.com/q',
  //     data: {
  //       token: 'q_AVF-IbeBSlpdJ_UMVG1g',
  //       data: {
  //         title,
  //         screenCapture: screen,
  //       },
  //     },
  //   });
  // };
  //
  // const [statusSend, setStatusSend] = useState(false);
  // const [linkPhoto, setLinkPhoto] = useState('');
  //
  // const sendDataToServer = () => {
  //   if (!commentText.trim()) {
  //     return;
  //   }
  //
  //   const body = document.querySelector('body');
  //
  //   setStatusSend(true);
  //   setStatusOfMarker(false);
  //   if (body) {
  //     html2canvas(body).then(canvas => {
  //       const croppedCanvas = document.createElement('canvas');
  //       const croppedCanvasContext = croppedCanvas.getContext('2d');
  //       const pictureWidth = document.documentElement.clientWidth;
  //       const pictureHeight = document.documentElement.clientHeight;
  //       const scrollHeight = window.pageYOffset;
  //
  //       croppedCanvas.width = pictureWidth;
  //       croppedCanvas.height = pictureHeight;
  //       if (croppedCanvasContext) {
  //         croppedCanvasContext.drawImage(
  //           canvas,
  //           0,
  //           scrollHeight,
  //           pictureWidth,
  //           pictureHeight,
  //           0,
  //           0,
  //           pictureWidth,
  //           pictureHeight,
  //         );
  //       }
  //
  //       setLinkPhoto(croppedCanvas.toDataURL());
  //       sendToServer(commentText, croppedCanvas.toDataURL());
  //     });
  //   }
  // };
  //
  // const renderComment = () => {
  //   if (!statusSend) {
  //     return (
  //       <form onSubmit={sendDataToServer} style={{ top: commentY - 100, left: commentX }} className="formComment">
  //         {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
  //         <input autoFocus value={commentText} onChange={(event) => enterComment(event.target.value)} className="formComment__input" type="textarea" placeholder="Ваш комментарий..." />
  //         {activeButton && <button className="formComment__button" type="button" onClick={sendDataToServer}>Отправить</button>}
  //       </form>
  //     );
  //   }
  //
  //   return (
  //     <div style={{ top: commentY - 100, left: commentX }} className="formComment formComment--send">
  //       <span>Комментарий отправлен!</span>
  //       <a href={linkPhoto}>link</a>
  //     </div>
  //   );
  // };
  //
  // const handleCommentBug = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  //   if (!statusOfMarker || statusOfComment) {
  //     return;
  //   }
  //
  //   setCommentX(event.pageX);
  //   setCommentY(event.pageY);
  //   setStatusOfMarker(false);
  //   setStatusOfComment(true);
  // };
  //
  const handleDebugger = () => {
    handleMarker();
  };

  const renderDebuggerInfo = () => (
    <p className="debugger__info">
      Кликните мышкой на место ошибки и оставьте комментарий.
    </p>
  );

  return (
    <div className="debugger">
      <button type="button" className={CN('debugger__button', { 'debugger__button--on': statusOfMarker })} onClick={handleDebugger}>
        <img className="debugger__img" src="./img/beetle.svg" alt="bug" />
      </button>
      {statusOfMarker && renderDebuggerInfo()}
    </div>
  );
};
