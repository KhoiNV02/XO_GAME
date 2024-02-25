import style from './ChatText.module.scss';
import avatar from '../../../../assets/img/profile-img (2).jpg';
import clsx from 'clsx';
import { memo } from 'react';
function ChatText({ check, message }) {
  return (
    <>
      <div className={style.friendChat}>
        {check && (
          <>
            <div className={style.avatar}>
              <img src={avatar}></img>
            </div>
          </>
        )}
        <div
          className={clsx(style.Content, {
            [style.right]: !check,
          })}
        >
          <p>{message || 'xin chào các bạn nhé'}</p>
        </div>
      </div>
    </>
  );
}

export default memo(ChatText);
