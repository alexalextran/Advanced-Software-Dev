import React from 'react'
import styles from '@/styles/question.module.scss'
import { useSpring, animated } from '@react-spring/web'




const Question = ({question, index}) => {
  
 

  const trans = useSpring({
    from: { y: -50, opacity: 0},
    to: { y: 0, opacity: 1},
    delay: index*150
  })

  return (
    <animated.div style={trans}>
    <p className={styles.main}>
        {question}
    </p>
    </animated.div>
  );
}

export default Question;





