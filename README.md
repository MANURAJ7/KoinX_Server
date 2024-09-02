# KoinX Server

A small Ethereum query server implementation that uses the Etherscan API for transaction retrieval and the CoinGecko API for Ethereum price retrieval.

## Features:

- **Transaction Storage**: User transactions are fetched from the Etherscan API and stored in MongoDB Atlas in a key-value document format.
- **Price Storage**: Ethereum prices are retrieved from the CoinGecko API and stored in MongoDB for efficient querying and analytical purposes. The price data is updated every 10 minutes.
- **User Expense Retrieval**: Pagination is implemented for retrieving transaction data based on `page_size` and `page_number` provided in query parameters. The total and individual transaction expenses are calculated using `gasUsed` and `gasPrice`.

## References:

Images for MongoDB document schemas and expense retrieval examples are provided in the `public` section.

### Output :

```
{
    "ethPrice": 211204,
    "totalExpense": 0.0027793512521459996,
    "transactions": [
        {
            "transaction_hash": "0x5e32868d2900d270c7ca18698875d41eaf5b53ad51a4bdd7227a64b7a0f8c768",
            "expense": 0.00050708771967
        },
        {
            "transaction_hash": "0xdaec5b2363ce41abc072db44051914b4557755be498c62c1a77424af2f714450",
            "expense": 0.000464055174009
        },
        {
            "transaction_hash": "0xd20845f9b701096ad3d86bd466559589c058fe70187be00efcb909d80b3572af",
            "expense": 0.000647000371143
        },
        {
            "transaction_hash": "0x1d6fd65ab2eefb36b6b841edd71d470578fe589b0eb31ceb069cb4c3b71745a0",
            "expense": 0.000580603993662
        },
        {
            "transaction_hash": "0x6bcf566f165be2f00beb9ff1417ecfbb0f11139122779899ed43816b933f5d30",
            "expense": 0.000580603993662
        }
    ],
    "currentPage": 2
}
```
