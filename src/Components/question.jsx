import React from 'react'
import styles from '@/styles/question.module.scss'
import { useSpring, animated } from '@react-spring/web'
import { useAuth } from "../../context/AuthContext";



const Question = ({Question, index, setquestionInfo}) => {
  const { setinterviewQuestion} = useAuth();
 const updateState = () => {

 }

  const trans = useSpring({
    from: { y: -50, opacity: 0},
    to: { y: 0, opacity: 1},
    delay: index*150
  })

  return (
    <animated.div style={trans} onClick={() => {
    setquestionInfo(Question)
    setinterviewQuestion(Question)
    }
    }>
    <p className={styles.main}>
        {Question}
    </p>
    </animated.div>
  );
}

export default Question;





