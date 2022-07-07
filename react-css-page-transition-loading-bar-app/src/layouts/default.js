import {motion} from 'framer-motion';
import {Nav} from '../components/Nav';

const variants = {
  hidden: {opacity: 0, x: 0, y: 20},
  enter: {opacity: 1, x: 0, y: 0},
  exit: {opacity: 0, x: 0, y: 20},
};

const Layout = ({children, setIsLoading}) => {
  return (
    <>
      <Nav />
      <motion.div
        initial="hidden"
        animate="enter"
        exit="exit"
        onAnimationStart={(e) => {
          console.log('start');
          setIsLoading(true);
        }}
        onAnimationComplete={(e) => {
          console.log('end');
          setIsLoading(false);
        }}
        variants={variants}
        transition={{duration: 0.4, type: 'easeInOut'}}
        style={{position: 'relative'}}
      >
        {children}
      </motion.div>
    </>
  );
};

export {Layout};
