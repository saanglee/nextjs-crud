import React from 'react';
import { useRouter } from 'next/router';
import Button from './Button';
import classes from './Message.module.scss';

interface MessageProps {
  messageTitle: string;
  buttonText?: string;
  linkTo?: '/' | '/login' | '/search';
}

const Message = ({ messageTitle, buttonText, linkTo }: MessageProps) => {
  const router = useRouter();
  return (
    <div className={classes.message}>
      <div>
        <h1 className={classes.message__title}>{messageTitle}</h1>
        {buttonText && <Button text={buttonText} size="lg" onClick={() => router.replace(`${linkTo}`)} />}
      </div>
    </div>
  );
};

export default Message;
