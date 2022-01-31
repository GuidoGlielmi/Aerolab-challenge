import '../styles/globals.css';
import Layout from '../Components/Layout';
function MyApp({ Component, pageProps, user }) {
	console.log(user, 'asd');
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}

export default MyApp;
