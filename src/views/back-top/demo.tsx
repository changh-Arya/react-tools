

import React, { useRef, useState } from 'react';
import BackTop from '../../components/back-top/BackTop';
import styles from './index.module.scss';

const BackTopDemo = () => {
	const divRef = useRef(null)
	const arr = []
	for (let i = 0; i < 100; i++) {
		arr.push(i)
	}

	return (
		<div className={styles.backTopDemo} ref={divRef}>
			{arr.map(item => {
				return <div className={styles.items}>{item}</div>
			})}
			<BackTop target={() => divRef.current} visibilityHeight={500} />
		</div>
	);
};

export default BackTopDemo;

