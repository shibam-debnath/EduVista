import React from 'react'
import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <div>
      <div className={styles.footer_text}>
            © 2023 
            <a className={styles.footerLink} href="#"> EduVista™ </a>
            All rights reserved
      </div>
    </div>
  )
}

export default Footer