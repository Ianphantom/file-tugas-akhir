const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Blockchain = require("./blockchain");
const uuid = require("uuid/v1");
const port = process.argv[2];
const rp = require("request-promise");
const jwt = require("jsonwebtoken");
const { encryptionRSA } = require("./utils");

const nodeAddress = uuid().split("-").join("");

const satusehatRME = new Blockchain();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// get entire blockchain
app.get("/blockchain", function (req, res) {
  res.send(satusehatRME);
});

app.post("/transaction", function (req, res) {
  const newTransaction = req.body;
  // const ipAddress = req.ip;
  const blockIndex =
    satusehatRME.addTransactionToPendingTransactions(newTransaction);
  res.json({
    note: `The transaction is set to be appended to block ${blockIndex}.`,
  });
});

app.post("/transaction/broadcast", function (req, res) {
  const theNewTransaction = satusehatRME.createNewTransaction(
    req.body.jenisTransaksi,
    req.body.data
  );
  const authHeader = req.headers.authorization;

  if (authHeader === undefined) {
    return res.status(403).send({
      message: "Token needed to do this action!",
    });
  }
  const token = authHeader.split("Bearer ")[1];

  try {
    let decodedToken = jwt.verify(token, "SatuSehatBlockchainTech");
    if (decodedToken.name !== "satusehatserver") {
      return res.status(403).send({
        message: "Unauthorized Token!",
      });
    }
  } catch {
    return res.status(403).send({
      message: "You Don't Have Permission to do this",
    });
  }

  if (req.body.jenisTransaksi == "2") {
    let { permissionLevel } = satusehatRME.checkPermission(
      req.body.data.doctorId,
      req.body.data.pasienId
    );

    if (permissionLevel != "2") {
      return res.status(403).send({
        message: "You Don't Have Permission to do this",
      });
    }
  }

  satusehatRME.addTransactionToPendingTransactions(theNewTransaction);

  const requestPromises = [];
  satusehatRME.networkNodes.forEach((networkNodeUrl) => {
    const requestOptions = {
      json: true,
      uri: networkNodeUrl + "/transaction",
      method: "POST",
      body: theNewTransaction,
    };

    requestPromises.push(rp(requestOptions));
  });

  Promise.all(requestPromises).then((data) => {
    res.send({
      note: "The transaction was successfully created and distributed to all nodes.",
      theNewTransaction: theNewTransaction,
    });
  });
});

app.post("/register-node", function (req, res) {
  const newNodeUrl = req.body.newNodeUrl;
  const notCurrentNode = satusehatRME.currentNodeUrl !== newNodeUrl;
  const nodeNotAlreadyPresent =
    satusehatRME.networkNodes.indexOf(newNodeUrl) == -1;
  if (notCurrentNode && nodeNotAlreadyPresent)
    satusehatRME.networkNodes.push(newNodeUrl);
  res.json({ note: "The registration of the new node was successful." });
});

// register a node and broadcast it the network
app.post("/register-and-broadcast-node", function (req, res) {
  const newNodeUrl = req.body.newNodeUrl;
  if (satusehatRME.networkNodes.indexOf(newNodeUrl) == -1)
    satusehatRME.networkNodes.push(newNodeUrl);

  const regNodesProcess = [];
  satusehatRME.networkNodes.forEach((networkNodeUrl) => {
    const requestOptions = {
      json: true,
      method: "POST",
      body: { newNodeUrl: newNodeUrl },
      uri: networkNodeUrl + "/register-node",
    };

    regNodesProcess.push(rp(requestOptions));
  });

  Promise.all(regNodesProcess)
    .then((data) => {
      const bulkRegisterOptions = {
        json: true,
        method: "POST",
        body: {
          allNetworkNodes: [
            ...satusehatRME.networkNodes,
            satusehatRME.currentNodeUrl,
          ],
        },
        uri: newNodeUrl + "/register-nodes-bulk",
      };

      return rp(bulkRegisterOptions);
    })
    .then((data) => {
      res.json({ note: "The registration of the new node was successful." });
    });
});

app.post("/register-nodes-bulk", function (req, res) {
  const allNetworkNodesRegistered = req.body.allNetworkNodes;
  allNetworkNodesRegistered.forEach((networkNodeUrl) => {
    const isNotCurrentNode = networkNodeUrl !== satusehatRME.currentNodeUrl;
    const isNodeNotAlreadyPresent =
      satusehatRME.networkNodes.indexOf(networkNodeUrl) == -1;
    if (isNotCurrentNode && isNodeNotAlreadyPresent)
      satusehatRME.networkNodes.push(networkNodeUrl);
  });

  res.json({ note: "Bulk registration successful." });
});

app.get("/mine", function (req, res) {
  console.time("Mining Time");
  const lastBlock = satusehatRME.getLastBlock();
  const previousBlockHash = lastBlock["hash"];
  const currentBlockData = {
    transactions: satusehatRME.pendingTransactions,
    index: lastBlock["index"] + 1,
  };
  const nonceNumber = satusehatRME.proofOfWork(
    previousBlockHash,
    currentBlockData
  );
  const theBlockHash = satusehatRME.hashBlock(
    previousBlockHash,
    currentBlockData,
    nonceNumber
  );
  const newBlock = satusehatRME.createNewBlock(
    nonceNumber,
    previousBlockHash,
    theBlockHash
  );

  const requestPromises = [];
  satusehatRME.networkNodes.forEach((networkNodeUrl) => {
    const requestOptions = {
      method: "POST",
      json: true,
      body: { newBlock: newBlock },
      uri: networkNodeUrl + "/receive-new-block",
    };

    requestPromises.push(rp(requestOptions));
  });

  Promise.all(requestPromises).then((data) => {
    console.timeEnd("Mining Time");
    res.json({
      note: "New block mined & broadcast successfully",
      block: newBlock,
    });
  });
});

app.post("/receive-new-block", function (req, res) {
  const theNewBlock = req.body.newBlock;
  const lastBlock = satusehatRME.getLastBlock();
  const correctHash = lastBlock.hash === theNewBlock.previousBlockHash;
  const correctIndex = lastBlock["index"] + 1 === theNewBlock["index"];

  if (correctIndex && correctHash) {
    satusehatRME.chain.push(theNewBlock);
    satusehatRME.pendingTransactions = [];
    res.json({
      note: "New block received and accepted.",
      newBlock: theNewBlock,
    });
  } else {
    res.json({
      note: "New block rejected.",
      newBlock: theNewBlock,
    });
  }
});

app.get("/consensus", function (req, res) {
  const requestPromises = [];
  satusehatRME.networkNodes.forEach((networkNodeUrl) => {
    const requestOptions = {
      json: true,
      method: "GET",
      uri: networkNodeUrl + "/blockchain",
    };

    requestPromises.push(rp(requestOptions));
  });

  Promise.all(requestPromises).then((blockchains) => {
    const currentChainLength = satusehatRME.chain.length;
    let maxChainLength = currentChainLength;
    let newLongestChain = null;
    let newPendingTransactions = null;

    blockchains.forEach((blockchain) => {
      if (blockchain.chain.length > maxChainLength) {
        maxChainLength = blockchain.chain.length;
        newLongestChain = blockchain.chain;
        newPendingTransactions = blockchain.pendingTransactions;
      }
    });

    if (
      !newLongestChain ||
      (newLongestChain && !satusehatRME.chainIsValid(newLongestChain))
    ) {
      res.json({
        note: "The existing chain has not been substituted.",
        chain: satusehatRME.chain,
      });
    } else {
      satusehatRME.chain = newLongestChain;
      satusehatRME.pendingTransactions = newPendingTransactions;
      res.json({
        note: "The existing chain has been replaced.",
        chain: satusehatRME.chain,
      });
    }
  });
});

app.get("/permission/:doctorId/:pasienId", function (req, res) {
  const doctorId = req.params.doctorId;
  const pasienId = req.params.pasienId;
  dataPerizinan = satusehatRME.checkPermission(doctorId, pasienId);
  res.send(dataPerizinan);
});

app.get("/medicalrecord/:doctorId/:pasienId", function (req, res) {
  const doctorId = req.params.doctorId;
  const pasienId = req.params.pasienId;
  const { permissionLevel, doctorPublicKey, signatureUserKey } =
    satusehatRME.checkPermission(doctorId, pasienId);

  if (permissionLevel < 1) {
    return res.status(403).send({
      message: "You Don't Have Permission to do this",
    });
  }

  const dataMedicalRecord = satusehatRME.getPatientData(pasienId);

  const encryptedData = {
    signatureUserKey: signatureUserKey,
    AllMedicalRecord: [],
  };

  dataMedicalRecord.patientTransactions.forEach((item) => {
    // let encrypted = encryptionRSA(doctorPublicKey, item.data.rme);
    const newItem = {
      ...item,
      data: {
        ...item.data,
        rme: item.data.rme,
      },
    };

    encryptedData.AllMedicalRecord.push(newItem);
  });
  res.send(encryptedData);
});

app.get("/medicalrecord-specific/:id", function (req, res) {
  const authHeader = req.headers.authorization;

  if (authHeader === undefined) {
    return res.status(403).send({
      message: "Token needed to do this action!",
    });
  }
  const token = authHeader.split("Bearer ")[1];

  try {
    let decodedToken = jwt.verify(token, "SatuSehatBlockchainTech");
    if (decodedToken.name !== "satusehatserver") {
      return res.status(403).send({
        message: "Unauthorized Token!",
      });
    }
  } catch {
    return res.status(403).send({
      message: "You Don't Have Permission to do this",
    });
  }

  const blockIndex = satusehatRME.getSpecificData(req.params.id);
  console.log(blockIndex);

  // let encrypted = encryptionRSA(req.body.publicKey, item.data.rme);

  let returnValue = {
    ...blockIndex,
    data: {
      ...blockIndex.data,
      rme: blockIndex.data.rme,
    },
  };

  res.json({
    returnValue,
  });
});

// app.get("/checkip", function (req, res) {
//   // Get the IP address
//   const ipAddress = req.ip;
//   res.send(`Your IP address is: ${ipAddress}`);
// });

app.listen(port, function () {
  console.log(`Listening on port ${port}...`);
});
