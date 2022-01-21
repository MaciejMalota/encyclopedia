const express = require("express");
const { ConnectionStates } = require("mongoose");
const router = express.Router();
const Game = require("../../model/Game");
const Genre = require("../../model/Genre");
const User = require("../../model/User");
const Platform = require("../../model/Platform");
const GameComment = require("../../model/GameComment");





router.get("/", async (req, res) => {
  try {
    const gameListItems = await Game.find().populate("genres").populate("platforms").populate("game_comments");
    
    if (!gameListItems) throw new Error("No gameListItems");
    const sorted = gameListItems.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    res.status(200).json(sorted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/addcomment", async (req, res) => {
  const newGameComment = new GameComment(req.body);
 
  try {
   // id komentarza console.log(newGameComment._id);
   //console.log(newGameComment)
   const gameCommentArray = await Game.findById(newGameComment.gameId).populate("game_comments")
 // console.log(gameCommentArray.game_comments[0].userId)  tablica gry z id Postów
 let  y=0;
 
  gameCommentArray.game_comments.forEach(item=>
    { //console.log(item.userId)
     
      if(item.userId.toString()==newGameComment.userId.toString())y=1;
    })
    console.log(y)
   // console.log(newGameComment.userId.toString()==gameCommentArray.game_comments[0].userId.toString())
    
    if(y!=1){
      
      gameCommentArray.game_comments.push(newGameComment._id);
      await gameCommentArray.save();
      const commentListItem = await newGameComment.save();
      res.status(200).json(commentListItem);}
      else{
        console.log('Already did comment')
     
      throw new Error("Something went wrong saving the commentListItem");
      }
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/deletecomment/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const removed = await GameComment.findByIdAndDelete(id);
    
    const x = await Game.findById(removed.gameId)
   
    x.game_comments.forEach(function(element, index, object) {
      if(element==id)
      object.splice(index, 1);
    });
    console.log(x._id)
   
    const a =  {
      game_comments: x.game_comments
    }

    await Game.findByIdAndUpdate(x._id, a)
   
    if (!removed) throw Error("Something went wrong");
    res.status(200).json(removed);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/updatecomment", async (req, res) => {
  
  try {
    const response = await GameComment.findByIdAndUpdate(
      req.body.cmnt._id,
      req.body.cmnt
    );

    if (!response) throw Error("Something went wrong");
    const updated = { ...response._doc, ...req.body.usr };
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/rate", async (req, res) => {
  try {
    // const { id } = req.body.gameId;
    // console.log(req.body.gameId)
    // console.log(id)
    const game = await Game.findById(req.body.gameId).populate("users"); //TUTAJ
    console.log(req.body.users)
    let x = 0;

    game.users.forEach(item=>
      { console.log(item._id)
        if(item._id==req.body.users)x=1;
      })

    if(x!=1){
       game.rating +=req.body.rating
       game.users.push(req.body.users);
       await game.save();}
       else{
         console.log('Already voted')
       }
       

      
    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




router.post("/:id", async (req, res) => {
    const { id } = req.params;
  try {
   
    const game = await Game.findById(id)
    .populate("genres")
    .populate("platforms")
    .populate({
      path : 'game_comments',
      populate : {
        path : 'userId'
      }
    })
    .exec();
    // const comment = await GameComment.findById(req.body.gameId).populate("game_comments")
    res.status(200).json(game);
    
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});





router.post("/", async (req, res) => {
  const newGameListItem = new Game(req.body);
  try {
    console.log(req.body);
    const gameListItem = await newGameListItem.save();
    if (!gameListItem)
      throw new Error("Something went wrong saving the gameListItem");
    res.status(200).json(gameListItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// router.put("/:id", async (req, res) => {
//   const { id } = req.params;
//    console.log(req.body)
//   try {
//     const response = await Game.findByIdAndUpdate(id, req.body).populate("users");
//     if (!response) throw Error("Something went wrong ");
//     const updated = { ...response._doc, ...req.body };
//     res.status(200).json(updated);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const removed = await Game.findByIdAndDelete(id);
    if (!removed) throw Error("Something went wrong ");
    res.status(200).json(removed);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//GENRES

router.get("/genres", async (req, res) => {
  try {
    const genreListItems = await Genre.find();
    if (!genreListItems) throw new Error("No genreListItems");
    const sorted = genreListItems.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    res.status(200).json(sorted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//PLATFORMS
router.get("/platforms", async (req, res) => {
  try {
    const platformListItems = await Platform.find();
    if (!platformListItems) throw new Error("No platformListItems");
    const sorted = platformListItems.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    res.status(200).json(sorted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//COMMENTS





// router.post('/', async (req, res) => {
//     try {
//         // console.log(req.body.toLoad)  =15
//         const gameListItems = await Game.find().limit(req.body.toLoad).lookup({ from: 'genres', localField: 'genres', foreignField: '_id', as: 'genre' }).catch(err => {});
// console.log(gameListItems);

//         }
//        console.log(gameListItems);
//         if (!gameListItems) throw new Error('No gameListItems')
//         const sorted = gameListItems.sort((a, b) => {
//             return new Date(a.date).getTime() - new Date(b.date).getTime()
//         })
//         res.status(200).json(sorted)
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// })

//SEARCH



module.exports = router;
