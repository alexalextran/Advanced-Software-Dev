import React from 'react'
import styles from '@/styles/Dashboard.module.scss'
import Image from 'next/image'

export default function IndustryCard({industry}) {
var { image } = industry
 
  return (
    <div className={styles.industry_card}>{industry.IndustryName}  
    
    <div className={styles.industry_image}>
      <Image src={image[industry.IndustryName]}
      layout="fill"
      objectFit="cover"  ></Image>
      </div> 
      
      </div>
  )
}
