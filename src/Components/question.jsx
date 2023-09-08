import React from 'react'
import styles from '@/styles/question.module.scss'

export default function question({question}) {
  return (
    <p className={styles.main}>
        {question}
    </p>
  )
}
