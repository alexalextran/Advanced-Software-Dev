import React from 'react'
import styles from '@/styles/question.module.scss'
import { useSpring, animated } from '@react-spring/web'




const Question = ({Question, index, setquestionInfo}) => {
  
 const updateState = () => {

 }

  const trans = useSpring({
    from: { y: -50, opacity: 0},
    to: { y: 0, opacity: 1},
    delay: index*150
  })

  return (
    <animated.div style={trans} onClick={() => setquestionInfo(Question)}>
    <p className={styles.main}>
        {Question.question}
    </p>
    </animated.div>
  );
}

export default Question;





