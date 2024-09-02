# KoinX Server

A small Ethereum query server implementation that uses the Etherscan API for transaction retrieval and the CoinGecko API for Ethereum price retrieval.

## Features:

- **Transaction Storage**: User transactions are fetched from the Etherscan API and stored in MongoDB Atlas in a key-value document format.
- **Price Storage**: Ethereum prices are retrieved from the CoinGecko API and stored in MongoDB for efficient querying and analytical purposes. The price data is updated every 10 minutes.
- **User Expense Retrieval**: Pagination is implemented for retrieving transaction data based on `page_size` and `page_number` provided in query parameters. The total and individual transaction expenses are calculated using `gasUsed` and `gasPrice`.

## References:

Images for MongoDB document schemas and expense retrieval examples are provided in the `public` section.
