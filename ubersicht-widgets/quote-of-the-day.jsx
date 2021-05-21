export const command = () => {
	/*********************************************************************
	 * Choose one of the category below
	 * Index start at 0
	 *********************************************************************/

	const categories = ["death", "love", "life", "funny", "inspire", "art"];
	/*********************************************************************
	 * Set category here using Index number
	 *********************************************************************/

	let current_category = categories[Math.floor(Math.random() * 6)];

	/*****************************************************************
	 * This part insures that the category does not change when 
	 * the widget(s) is refresh before the refreshFrequency time.
	 * to disable this behavior comment the code below up to the next comment "Do not edit"
	 *****************************************************************/

	// Get time at which the widget is started
	const now = new Date().getTime();
	// Next time the category should be updated
	let nextCategoryOrQuoteUpdateTime = localStorage.getItem(
		'nextCategoryOrQuoteUpdateTime'
	) ?? null;
	// The refreshFrequency to update the category
	const frequency = localStorage.getItem('refreshFrequency');
	if (nextCategoryOrQuoteUpdateTime !== null) {
		if (now < nextCategoryOrQuoteUpdateTime) {
			current_category = localStorage.getItem('currentCategory');
		} else {
			localStorage.setItem('nextCategoryOrQuoteUpdateTime',
				parseInt(nextCategoryOrQuoteUpdateTime) + parseInt(frequency)
			);
			localStorage.setItem('currentCategory', current_category);
		}
	} else {
		localStorage.setItem('nextCategoryOrQuoteUpdateTime',
			parseInt(now) + parseInt(frequency)
		);
		localStorage.setItem('currentCategory', current_category);
	}

	/*
	 * DO not edit
	 */

	const url = `https://quotes.rest/qod?category=${current_category}&language=en`;

	/**
	 * Fetch the quote
	 */
	fetch(url).then(response => response.json()).then((data) => {
		let qodInfos = data.contents.quotes[0];
		// Store quote as json string
		localStorage.setItem('quote_of_the_day', JSON.stringify({
			quote: qodInfos.quote,
			author: qodInfos.author,
			background: qodInfos.background,
		}));
	}).catch(error => {
		// There was an error, probably a network error
		// Fall back is to use the locally stored data if offline
		// in case of first time running, open an issue on github or send error log
		console.log('Quote of the Day Error: ', error);
	});
}

/*********************************************************************
 * the refresh frequency in milliseconds
 * 21600000 = every 6h
 * 43200000 = every 12h
 * 86400000 = every 24h / day
 *********************************************************************/
export const refreshFrequency = 21600000;
// This is use to set the category only when the widget is automatically refresh
localStorage.setItem('refreshFrequency', refreshFrequency);
/*********************************************************************
 * Extract quote from local storage
 *********************************************************************/
export const quote_of_the_day = JSON.parse(localStorage.getItem('quote_of_the_day'));

/**********************************************************************
 * Style here
 **********************************************************************/
export const className =
	`
	bottom: 80px;
	left: 0;
	width: 100%;
	font-weight: 500;
	font-family: -apple-system, Verdana;
	color: #fff;
	line-height: 1.5rem;
	
	.quote-of-the-day-container {
		margin: 0 auto 0 0;
		max-width: 960px;
	}
	
	quoteblock, h5, cite {
		text-shadow: 0px 0px 2px rgba(0,0,0,0.30);
	}

	.quote-of-the-day {
		padding: 1rem;
		border-radius: .4rem;
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: left;
	}
	.quote-of-the-day::before {
		background: rgba(9, 10, 13, 0.10);
		height: 100%;
		width: 100%;
		top: 0;
		left: 0;
		content: "";
		z-index: -1;
		position: absolute;
		border-radius: .8rem;
	}
	.quote {
		font-size: 1rem;
		text-align: left;
		margin-bottom: 0.1rem;
		margin-right: 4.5rem;
		margin-top: 0;
                margin-left: 0;
		max-width: 85%
	}
	.quote::before {
		content: '"';
		font-size: 0.9rem;
	}
	.quote::after {
		content: '"';
		font-size: 0.9rem;
	}
	.author {
		font-size: .860rem;
		color: #ddd; 
		text-align: left;
		display: block;
		align-self: left;
	}
	/*@media(prefers-color-scheme: light) {
		color: #444444;
		
		.title {
			color: #888888;
		}
		.author {
			color: #666666;
		}
    }*/
`;

export const render = () => {
	return (
		<div className="quote-of-the-day-container">
			<div className="quote-of-the-day">
				<blockquote className="quote" cite="https://quotes.rest/qod">
					{quote_of_the_day.quote}
				</blockquote>
				<cite className="author">—{quote_of_the_day.author}</cite>
			</div>
		</div>
	);
};
