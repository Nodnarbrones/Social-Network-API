const { Thought, User } = require('../models');

const thoughtController = {
    
    getAllThoughts(req, res) {
        Thought.find({})
        .then((dbThoughtData) => {
          res.json(dbThoughtData);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });  
    },

    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
      .then((dbThoughtData) => {
        if (!dbthoughtData) {
          return res.status(404).json({ message: 'No Thought has that id' });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
    },

    createThought(req, res) {
        Thought.create(req.body)
      .then((dbThoughtData) => {
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true })
        .then((dbThoughtData) => {
          if (!dbThoughtData) {
            return res.status(404).json({ message: 'No thought has this id' });
          }
          res.json(dbThoughtData);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },

    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought has that id' });
        }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
    },

    createReaction(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $addToSet: { reactions: req.body }}, { runValidators: true, new: true })
            .then((dbThoughtData) => {
              if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought has that id' });
              }
              res.json(dbThoughtData);
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json(err);
            });
    },

    deleteReaction(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId },{ $pull: { reactions: { reactionId: req.params.reactionId}}},{ runValidators: true, new: true })
            .then((dbThoughtData) => {
              if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought has that id!' });
              }
              res.json(dbThoughtData);
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json(err);
            });
    },
};

module.exports = thoughtController;