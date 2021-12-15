const express = require("express");
const { ConnectionStates } = require("mongoose");
const router = express.Router();
const Game = require("../../model/Game");
const Genre = require("../../model/Genre");
const User = require("../../model/User");
const Platform = require("../../model/Platform");





router.get("/", async (req, res) => {
  try {
    const gameListItems = await Game.find().populate("genres").populate("platforms");

    if (!gameListItems) throw new Error("No gameListItems");
    const sorted = gameListItems.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    res.status(200).json(sorted);
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
    const game = await Game.findById(id).populate("genres").populate("platforms");
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

module.exports = router;
