import { AppLoader } from "@zesty-io/react-app-loader";
import Analytics from "./components";

function App() {

	return (
		<AppLoader
			token={process.env.REACT_APP_TOKEN}
			instance={{
				ZUID: '8-45a294a-btwkv9',
				settings: {
					seo: {}
				},
				ID: 7352788,
				ecoID: 1,
				ecoZUID: '35-8848462-731392',
				randomHashID: 'parsleydev',
				domain: 'parsley.zesty.io',
				name: '! DEV Parsley',
				planID: 10,
				cancelledReason: null,
				createdByUserZUID: null,
				prefs: null,
				useTLS: false,
				blueprintID: 1,
				blueprintZUID: '14-64329e0-555644',
				requiresTwoFactor: 1,
				legacy: false,
				screenshotURL:
					'https://storage.googleapis.com/zesty-prod-instance-screenshots/parsley.zesty.io_1920_1080._400_200.png',
				createdAt: '2018-05-01T00:42:14Z',
				updatedAt: '2021-09-29T07:08:00Z',
				domains: [
					{
						ZUID: '22-b080dfbebf-pndbs25',
						instanceZUID: '8-45a294a-btwkv9',
						domain: 'parsley.test.zesty.io',
						branch: 'dev',
						createdByUserZUID: '5-1121e8-b6dlch',
						updatedByUserZUID: '5-1121e8-b6dlch',
						createdAt: '2019-01-25T19:02:01Z',
						updatedAt: '2019-01-25T19:02:01Z'
					},
					{
						ZUID: '22-b080dfbebf-pndbs5',
						instanceZUID: '8-45a294a-btwkv9',
						domain: 'parsley.zesty.io',
						branch: 'live',
						createdByUserZUID: '5-1121e8-b6dlch',
						updatedByUserZUID: '5-1121e8-b6dlch',
						createdAt: '2019-01-25T19:02:01Z',
						updatedAt: '2019-01-25T19:02:01Z'
					},
					{
						ZUID: '22-92e1e68692-phbxzz',
						instanceZUID: '8-45a294a-btwkv9',
						domain: 'parsley.zesty.dev',
						branch: 'live',
						createdByUserZUID: '5-b6d4a498f7-54qc5f',
						updatedByUserZUID: '5-b6d4a498f7-54qc5f',
						createdAt: '2021-05-27T11:28:21Z',
						updatedAt: '2021-05-27T11:28:21Z'
					}
				]
			}}
			
		>
			<Analytics />
		</AppLoader>
	);
}

export default App;

