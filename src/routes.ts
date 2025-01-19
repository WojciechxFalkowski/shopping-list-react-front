const ROUTES = {
	WITHOUT_PARAMS: {
		HOME: {
			path: '/',
			label: 'Listy zakupów',
		},
		// GENERATE_LIST_BY_URL: {
		// 	path: '/generate-list-by-url',
		// 	label: 'Wygeneruj liste z linku',
		// },
		GENERATE_LIST_BY_TEXT: {
			path: '/generate-list-by-text',
			label: 'Wygeneruj listę',
		},
		GET_RECEIPTS: {
			path: '/get-receipts',
			label: 'Paragony',
		},
		ADD_RECEIPTS: {
			path: '/add-receipts',
			label: '',
		},
	},
	WITH_PARAMS: {
		SHOPPING_LIST_DETAILS: (listId: string = ':listId') => ({
			path: `/list/${listId}`,
			label: 'Shopping List Details',
		}),
		SHOPPING_LIST_MANAGE_USER: (listId: string = ':listId') => ({
			path: `/list/${listId}/manage-user`,
			label: 'Shopping List Manage User',
		}),
	},
};

export default ROUTES;
