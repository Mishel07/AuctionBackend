const router = require('express').Router();
let Auction = require('../models/auction.models');
const {upload} = require('../filehelper/filehelper')

router.route('/all').get((req, res) => {
    Auction.find()
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        res.json(err)
    })
})

router.route('/:id').get((req,res)=> {
    Auction.find({"userId":req.params.id})
    .then(auction=>res.json(auction))
    .catch(err=>res.status(400).json('Error' + err));
});

router.route('/add_auction').post((req, res) => {
    const auction = new Auction(req.body)
    auction.save()
    .then((result) => {
        res.json('Product added')
    })
});

router.route('/getBid/:id').get((req,res)=> {
    Auction.findById(req.params.id)
   .then(auction=>res.json(auction))
   .catch(err=>res.status(400).json('Error' + err));
});

router.route('/updateAuction/:id').put(function(req,res){
    Auction.findByIdAndUpdate(req.params.id,req.body)
    .then(auction=>res.json(auction))
    .catch(err=>res.status(400).json('Error' + err));
})

router.route('/deleteAuction/:id').delete((req,res)=> {
    Auction.findByIdAndRemove(req.params.id)
   .then(auction=>res.json(auction))
   .catch(err=>res.status(400).json('Error' + err));
});


router.route('/add-product').post(upload.array('file'),(req, res) => {
    var productImage=[]
    for(var i=0;i<req.files.length;i++){
        productImage.push(req.files[i].path);
    }
    const auction  = new Auction({"productImage":productImage,"userId":req.body.userId,"productName":req.body.productName,"productDescription":req.body.productDescription,"productPrice":req.body.productPrice,"startDate":req.body.startDate,"endDate":req.body.endDate,"status":"upcoming","highestBid":req.body.productPrice})
    auction.save()
    .then((result) => {
        res.json("Product Added")
    })
});

router.route('/:id').get((req,res)=> {
    Product.findById(req.params.id)
   .then(product=>res.json(product))
   .catch(err=>res.status(400).json('Error' + err));
});

router.route('/updateProduct/:id').put(function(req,res){
    Product.findByIdAndUpdate(req.params.id,req.body)
    .then(product=>res.json(product))
    .catch(err=>res.status(400).json('Error' + err));
})

router.route('/deleteProduct/:id').delete((req,res)=> {
    Product.findByIdAndRemove(req.params.id)
   .then(product=>res.json(product))
   .catch(err=>res.status(400).json('Error' + err));
});

router.route('/start-auction/:id').put((req, res) => {
    Auction.updateOne({_id : req.params.id}, {status : "live"})
    res.send("auction is now live")
})

router.route('/end-auction/:id').put((req, res) => {
    Auction.updateOne({_id : req.params.id}, {status : "end"})
    .then((result) => {
        res.json(result)
    })
    //res.send("auction ended")
})

router.route('/bidProduct/:id').put(function (req,res) {
    const bidderName=req.body.name;
    const bidderId = req.body.bidderId;
    const amt=req.body.amount;
    const bidInfo = {
        Bidder: bidderName,
        bidderId:bidderId,
        Amount: amt
    };
    Auction.findByIdAndUpdate(req.params.id,{"highestBid":amt,$push:{"Bid.bidInfo":bidInfo}},{new:true})
    .then(auction=>res.json(auction))
   .catch(err=>res.status(400).json('Error' + err));
})

module.exports = router;

//ongoing
//upcoming
//ended