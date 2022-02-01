import '../styles/globals.css';
import Layout from '../Components/Layout';
import React, { useState } from 'react';
export const Modal = React.createContext();

function MyApp({ Component, pageProps }) {
	return (
		<Modal.Provider value={123}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Modal.Provider>
	);
}

export default MyApp;
