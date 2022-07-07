import {useEffect, useState} from 'react';
import {Bar} from './Bar';
import {Container} from './Container';
import {useNProgress} from '@tanem/react-nprogress';
const Progress = ({isAnimating}) => {
  const {animationDuration, isFinished, progress} = useNProgress({
    isAnimating,
  });
  const [p, setP] = useState(progress);
  useEffect(() => {
    if (isAnimating && !isFinished) {
      setP(0.3);
    } else if (!isAnimating && isFinished) {
      setP(1);
    } else {
      setP(0);
    }
  }, [isAnimating, isFinished]);
  return (
    <Container animationDuration={animationDuration} isFinished={isFinished}>
      <Bar animationDuration={animationDuration} progress={p} />
      {/*
      This example doesn't use a spinner component so the UI stays
      tidy. You're free to render whatever is appropriate for your
      use-case.
      */}
    </Container>
  );
};

export {Progress};
