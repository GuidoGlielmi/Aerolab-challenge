import '../styles/globals.css';
import Layout from '../Components/Layout';
import React, { useState } from 'react';
export const Modal = React.createContext();

function MyApp({ Component, pageProps }) {
	const [modal, setModal] = useState({ show: false, title: '', content: '', onClick: () => '' });
	return (
		<Modal.Provider value={{ setModal: (params) => setModal(params) }}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
			{!modal ? (
				<div className='modal'>
					<div className='modalHeader'>
						<h3 className='title'>{modal.title}</h3>
					</div>
					<div className='modalContent'>
						<p className='message'>{modal.content}</p>
						<div className='btnContainer'>
							<button className='btn' onClick={modal.onClick}>
								Ok
							</button>
						</div>
					</div>
				</div>
			) : (
				<></>
			)}
		</Modal.Provider>
	);
}

export default MyApp;
