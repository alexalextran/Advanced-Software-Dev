import React from 'react'
import styles from '@/styles/Dashboard.module.scss'

export default function IndustryCard({industry}) {
  return (
    <div className={styles.industry_card}>{industry}  <div className={styles.industry_image}>photo</div> </div>
  )
}
