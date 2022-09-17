const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const cors = require('cors')
const contractjson = require('./CatToken.json');
const ethers = require('ethers');
const Web3 = require('web3');
const { utils } = require('web3');
const Tx = require('ethereumjs-tx').Transaction;


const abi = contractjson.abi;

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true}));
app.use(express.json());

app.post('/api/users/', async (req, res) => {

        const hobby = {
            Fashion: req.body.Fashion,
            Food: req.body.Food,
            Travel: req.body.Travel,
            Medical: req.body.Medical,
            Education: req.body.Education,
            Exercise: req.body.Exercise
        }
    console.log(hobby);

    const web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/80778a7b7bea4c9ca2e6341fdda65efa'));

    const pk = 'b633d3b63b7f6788d279f25d831f12892376a8f0d056b010d78ad5d71e8df737';
    const pk2 = 'c95c169c4252e5bd73ae486b705f1b96e5d1cf4d95b7caa2cf5767c59c472f98';

    const addressFrom = '0x416c47329a44872555312fe0ccB9c362911F5060';
    const addressTo = '0x0158E210A2421D67E61c2E9268e95c996C253568';

    const contractAddress = '0x066209B7399312796969bFe74AD08eAB18AD6187';

    const contract = new web3.eth.Contract(abi, contractAddress)

    const functionAbi = contract.methods.mintFT(addressFrom).encodeABI();

    const txData = {
            gasLimit: web3.utils.toHex(700000),
            gasPrice: web3.utils.toHex(10e9),
            from: addressFrom,
            to: contractAddress,
            data: functionAbi
    };



    const sendRawTransaction = txData =>
        web3.eth.getTransactionCount(addressFrom).then(txCount => {
            console.log(txCount);
            const newNonce = web3.utils.toHex(txCount)
            const transaction = new Tx({ ...txData, nonce: newNonce}, { chain: 'rinkeby' })
            transaction.sign(Buffer.from(pk, 'hex'))  // 수정영역
            const serializedTx = transaction.serialize().toString('hex')
            return web3.eth.sendSignedTransaction('0x' + serializedTx)
        })

    sendRawTransaction(txData).then(result => {
        console.log(result.transactionHash)
        const AdForm = {
        name: "songAD",
        AdLink: "this is a link",
        description: "hi this is a testAd!!",
        transactionAddress: result.transactionHash,
        }
        if (hobby.Fashion > 1 && hobby.Medical > 1 && hobby.Education > 1) {
            res.send(AdForm);
        } else {
            res.send("invalid!!!");
        }
    })

        // ** use groth16 **


    //}
    });


app.listen(port, () => console.log(`Listen ${port}`));
