const express = require('express');
const app = express();

const uuidAPIKey = require('uuid-apikey');
const { ethers } = require("ethers");
const { abi } = require('../contract/ABI.json');


const key = {
  apiKey: 'TXNEC51-A5GMM3N-K9Q6S18-8Q4JM81',
  uuid: 'd76ae614-5161-4a0e-9a6e-6c8545c92a20'
}

const contractAddress = "0x7CF5aaDe663E7539AA40a1Bb42DB3044F249f798";


/* GET home page. */
app.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});



app.get('/api/get/nodejs-api', function (req, res) {
  res.status(200).json({
    "message": "hello get api nodejs-api"
  });
});

app.get('/api/users/:apikey/:type', async (req, res) => {
  let { apikey, type } = req.params;

  if(!uuidAPIKey.isAPIKey(apikey) || !uuidAPIKey.check(apikey, key.uuid)) {
    res.send('apikey is not valid.');
  } else {

    if (type = 'seoul') {
      let data = [
        { name: "홍길동", city: "seoul" },
        { name: "김철수", city: "seoul" },
      ];
      res.send(data);
  
    } else if (type == 'jeju') {
      let data = [
        { name: "박지성", city: "jeju" },
        { name: "손흥민", city: "jeju" },
      ];
      res.send(data);
  
    } else {
      res.send('Type is not correct.');
    }
  }

  
  res.send('ok');
});

app.get('/api/window', function(req, res){
  location.reload();
  res.send(window);
});


app.post('/api/contract/deploy', function (req, res){
  
  
  try {
    location.reload();
    const { ethereum } = window;

    if (ethereum) {
      let provider = new ethers.providers.Web3Provider(ethereum);
      let signer = provider.getSigner();
      let nftContract = new ethers.Contract(contractAddress, abi, signer);

      console.log("Initialize payment");
        let nftTxn = nftContract.mintNFTs(1, { value: ethers.utils.parseEther("0.01")});
  
        console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
        res.send(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);

      } else {
        console.log("Ethereum object does not exist");
        res.send("Ethereum object does not exist");
        
      }
    } catch (err) {
      console.log(err);
      res.send(`${err}`);
    }

} );


module.exports = app;
